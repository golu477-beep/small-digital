import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { connectToDatabase } from "../../lib/mongodb.js";
import { AdminProject, AdminTestimonial, Contact } from "../../lib/adminModels.js";
import { defaultProjects } from "../../data/portfolio.js";
import { defaultTestimonials } from "../../data/testimonials.js";
import {
  adminCredentialsConfigured,
  clearAdminCookie,
  createAdminToken,
  setAdminCookie,
  verifyAdminRequest,
  verifySameOrigin,
} from "../../lib/adminAuth.js";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many sign-in attempts. Please try again later." },
});

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedCategories = new Set(["Web Development", "UI/UX", "E-commerce"]);
const allowedVisuals = new Set(["mint", "orange", "blue", "violet"]);
const allowedStatuses = new Set(["in-progress", "completed"]);

function isText(value, maxLength, { optional = false, minLength = 1 } = {}) {
  return optional && value === ""
    ? true
    : typeof value === "string" &&
        value.trim().length >= minLength &&
        value.trim().length <= maxLength;
}

function isSafeUrl(value, { optional = false } = {}) {
  if (optional && value === "") return true;
  if (typeof value !== "string" || value.length > 2048) return false;
  try {
    const parsed = new URL(value);
    return ["http:", "https:"].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100);
}

function serialize(document) {
  const data = document.toObject ? document.toObject() : document;
  return { ...data, id: data._id?.toString() ?? data.slug };
}

function mergeDefaults(defaults, documents) {
  const bySlug = new Map(documents.map((document) => [document.slug, document]));
  const merged = defaults.flatMap((item) => {
    const override = bySlug.get(item.slug);
    if (override?.isDeleted) return [];
    bySlug.delete(item.slug);
    return [override ? { ...item, ...serialize(override) } : item];
  });
  return merged.concat(
    [...bySlug.values()]
      .filter((document) => !document.isDeleted)
      .map(serialize),
  );
}

function cleanProjectInput(body) {
  if (
    !isText(body.title, 120, { minLength: 2 }) ||
    !Array.isArray(body.categories) ||
    body.categories.length < 1 ||
    body.categories.length > allowedCategories.size ||
    body.categories.some((category) => !allowedCategories.has(category)) ||
    !isText(body.description, 1000) ||
    !isText(body.requirement, 2000, { optional: true }) ||
    !isText(body.solution, 2000, { optional: true }) ||
    !Array.isArray(body.techStack) ||
    body.techStack.length > 20 ||
    body.techStack.some((technology) => !isText(technology, 50)) ||
    !isSafeUrl(body.imageUrl, { optional: true }) ||
    !isSafeUrl(body.demoUrl, { optional: true }) ||
    !allowedVisuals.has(body.visual) ||
    !allowedStatuses.has(body.status)
  ) return null;

  return {
    title: body.title.trim(),
    categories: [...new Set(body.categories)],
    description: body.description.trim(),
    requirement: body.requirement.trim(),
    solution: body.solution.trim(),
    techStack: [...new Set(body.techStack.map((technology) => technology.trim()))],
    imageUrl: body.imageUrl.trim(),
    demoUrl: body.demoUrl.trim(),
    visual: body.visual,
    status: body.status,
    isDeleted: false,
  };
}

function cleanTestimonialInput(body) {
  if (
    !isText(body.quote, 2000, { minLength: 5 }) ||
    !isText(body.name, 100, { minLength: 2 }) ||
    !isText(body.role, 120) ||
    !isText(body.company, 120) ||
    !Number.isInteger(body.rating) ||
    body.rating < 1 ||
    body.rating > 5 ||
    typeof body.isPublished !== "boolean"
  ) return null;

  return {
    quote: body.quote.trim(),
    name: body.name.trim(),
    role: body.role.trim(),
    company: body.company.trim(),
    rating: body.rating,
    isPublished: body.isPublished,
    isDeleted: false,
  };
}

function getId(request) {
  const path = getAdminPath(request);
  return decodeURIComponent(path.split("/").filter(Boolean).at(-1) ?? "");
}

function getAdminPath(request) {
  const mountedPath = request.baseUrl;
  return mountedPath && request.path.startsWith(mountedPath)
    ? request.path.slice(mountedPath.length) || "/"
    : request.path;
}

async function handleLogin(request, response) {
  if (!verifySameOrigin(request, response)) return;
  if (!adminCredentialsConfigured()) {
    return response.status(503).json({
      success: false,
      message: "Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH, and a 32-character ADMIN_JWT_SECRET on the server.",
    });
  }

  const email = request.body?.email;
  const password = request.body?.password;
  if (
    typeof email !== "string" ||
    email.trim().length > 254 ||
    !emailPattern.test(email.trim()) ||
    typeof password !== "string" ||
    password.length < 1 ||
    password.length > 200
  ) {
    return response.status(400).json({ success: false, message: "Enter a valid email and password." });
  }

  const matchesEmail = email.trim().toLowerCase() === globalThis.process.env.ADMIN_EMAIL.trim().toLowerCase();
  let matchesPassword;
  try {
    matchesPassword = await bcrypt.compare(password, globalThis.process.env.ADMIN_PASSWORD_HASH);
  } catch (error) {
    console.error("Admin password hash is invalid:", error);
    return response.status(503).json({ success: false, message: "Admin authentication is not configured correctly." });
  }

  if (!matchesEmail || !matchesPassword) {
    return response.status(401).json({ success: false, message: "Email or password is incorrect." });
  }

  setAdminCookie(response, createAdminToken(globalThis.process.env.ADMIN_EMAIL.trim().toLowerCase()));
  return response.status(200).json({ success: true, email: globalThis.process.env.ADMIN_EMAIL.trim() });
}

async function handleDashboard(request, response) {
  await connectToDatabase();
  const [totalInquiries, pendingLeads, projectDocuments, recentMessages] = await Promise.all([
    Contact.countDocuments(),
    Contact.countDocuments({ isRead: { $ne: true } }),
    AdminProject.find().lean(),
    Contact.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);
  const completedProjects = mergeDefaults(defaultProjects, projectDocuments)
    .filter((project) => project.status === "completed").length;
  return response.json({
    success: true,
    stats: { totalInquiries, pendingLeads, completedProjects },
    recentMessages: recentMessages.map(serialize),
  });
}

async function handleInquiries(request, response) {
  await connectToDatabase();
  if (request.method === "GET") {
    const inquiries = await Contact.find().sort({ createdAt: -1 }).limit(200).lean();
    return response.json({ success: true, inquiries: inquiries.map(serialize) });
  }

  const id = getId(request);
  if (!mongooseObjectIdIsValid(id)) {
    return response.status(400).json({ success: false, message: "Invalid inquiry identifier." });
  }

  if (request.method === "PATCH") {
    if (typeof request.body?.isRead !== "boolean") {
      return response.status(400).json({ success: false, message: "Read status must be true or false." });
    }
    const inquiry = await Contact.findByIdAndUpdate(
      id,
      { $set: { isRead: request.body.isRead } },
      { new: true, runValidators: true },
    );
    if (!inquiry) return response.status(404).json({ success: false, message: "Inquiry not found." });
    return response.json({ success: true, inquiry: serialize(inquiry) });
  }

  if (request.method === "DELETE") {
    const result = await Contact.findByIdAndDelete(id);
    if (!result) return response.status(404).json({ success: false, message: "Inquiry not found." });
    return response.json({ success: true });
  }

  return methodNotAllowed(response, ["GET", "PATCH", "DELETE"]);
}

function mongooseObjectIdIsValid(id) {
  return /^[a-f\d]{24}$/i.test(id);
}

async function handleProjects(request, response) {
  await connectToDatabase();
  if (request.method === "GET") {
    const documents = await AdminProject.find().lean();
    return response.json({
      success: true,
      projects: mergeDefaults(defaultProjects, documents),
    });
  }

  if (request.method === "POST") {
    const project = cleanProjectInput(request.body ?? {});
    if (!project) {
      return response.status(400).json({ success: false, message: "Check the project fields and try again." });
    }
    const slug = slugify(project.title);
    if (!slug) return response.status(400).json({ success: false, message: "Project title is not valid." });
    try {
      const saved = await AdminProject.create({ ...project, slug });
      return response.status(201).json({ success: true, project: serialize(saved) });
    } catch (error) {
      if (error?.code === 11000) {
        return response.status(409).json({ success: false, message: "A project with this title already exists." });
      }
      throw error;
    }
  }

  const slug = getId(request);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return response.status(400).json({ success: false, message: "Invalid project identifier." });
  }

  if (request.method === "PUT") {
    const project = cleanProjectInput(request.body ?? {});
    if (!project) return response.status(400).json({ success: false, message: "Check the project fields and try again." });
    const titleSlug = slugify(project.title);
    if (!titleSlug || (titleSlug !== slug && await AdminProject.exists({ slug: titleSlug }))) {
      return response.status(409).json({ success: false, message: "A project with this title already exists." });
    }
    const saved = await AdminProject.findOneAndUpdate(
      { slug },
      { $set: { ...project, slug } },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    );
    return response.json({ success: true, project: serialize(saved) });
  }

  if (request.method === "DELETE") {
    if (defaultProjects.some((project) => project.slug === slug)) {
      await AdminProject.findOneAndUpdate(
        { slug },
        { $set: { slug, isDeleted: true } },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      );
    } else {
      const deleted = await AdminProject.findOneAndDelete({ slug });
      if (!deleted) return response.status(404).json({ success: false, message: "Project not found." });
    }
    return response.json({ success: true });
  }

  return methodNotAllowed(response, ["GET", "POST", "PUT", "DELETE"]);
}

async function handleTestimonials(request, response) {
  await connectToDatabase();
  if (request.method === "GET") {
    const documents = await AdminTestimonial.find().lean();
    return response.json({
      success: true,
      testimonials: mergeDefaults(defaultTestimonials, documents),
    });
  }

  if (request.method === "POST") {
    const testimonial = cleanTestimonialInput(request.body ?? {});
    if (!testimonial) return response.status(400).json({ success: false, message: "Check the testimonial fields and try again." });
    const slug = slugify(`${testimonial.name}-${testimonial.company}`);
    try {
      const saved = await AdminTestimonial.create({ ...testimonial, slug });
      return response.status(201).json({ success: true, testimonial: serialize(saved) });
    } catch (error) {
      if (error?.code === 11000) {
        return response.status(409).json({ success: false, message: "A testimonial for this client already exists." });
      }
      throw error;
    }
  }

  const slug = getId(request);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return response.status(400).json({ success: false, message: "Invalid testimonial identifier." });
  }

  if (request.method === "PUT") {
    const testimonial = cleanTestimonialInput(request.body ?? {});
    if (!testimonial) return response.status(400).json({ success: false, message: "Check the testimonial fields and try again." });
    const saved = await AdminTestimonial.findOneAndUpdate(
      { slug },
      { $set: { ...testimonial, slug } },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    );
    return response.json({ success: true, testimonial: serialize(saved) });
  }

  if (request.method === "DELETE") {
    if (defaultTestimonials.some((testimonial) => testimonial.slug === slug)) {
      await AdminTestimonial.findOneAndUpdate(
        { slug },
        { $set: { slug, isDeleted: true } },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      );
    } else {
      const deleted = await AdminTestimonial.findOneAndDelete({ slug });
      if (!deleted) return response.status(404).json({ success: false, message: "Testimonial not found." });
    }
    return response.json({ success: true });
  }

  return methodNotAllowed(response, ["GET", "POST", "PUT", "DELETE"]);
}

function methodNotAllowed(response, allowed) {
  response.setHeader("Allow", allowed.join(", "));
  return response.status(405).json({ success: false, message: "Method not allowed." });
}

const routes = new Map([
  ["/dashboard", handleDashboard],
  ["/inquiries", handleInquiries],
  ["/projects", handleProjects],
  ["/testimonials", handleTestimonials],
]);

export default async function adminHandler(request, response) {
  try {
    const path = getAdminPath(request);
    if (path === "/login" && request.method === "POST") {
      return loginLimiter(request, response, () => {
        handleLogin(request, response).catch((error) => {
          console.error("Admin login failed:", error);
          if (!response.headersSent) response.status(500).json({ success: false, message: "Unable to sign in right now." });
        });
      });
    }

    if (path === "/logout" && request.method === "POST") {
      if (!verifySameOrigin(request, response)) return;
      clearAdminCookie(response);
      return response.json({ success: true });
    }

    if (path === "/me" && request.method === "GET") {
      if (!verifyAdminRequest(request, response)) return;
      return response.json({ success: true, email: request.admin.email });
    }

    const pathSegments = path.split("/").filter(Boolean);
    const routePath = pathSegments.length > 0 ? `/${pathSegments[0]}` : "";
    if (
      pathSegments.length > 2 ||
      (pathSegments.length > 1 && routePath === "/dashboard") ||
      !routes.has(routePath)
    ) {
      return response.status(404).json({ success: false, message: "Admin endpoint not found." });
    }

    if (!verifyAdminRequest(request, response)) return;
    if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method) &&
      !verifySameOrigin(request, response)) return;

    return await routes.get(routePath)(request, response);
  } catch (error) {
    console.error("Admin API request failed:", error);
    if (!response.headersSent) {
      return response.status(500).json({ success: false, message: "Unable to complete this admin request." });
    }
  }
}
