import { connectToDatabase } from "../../lib/mongodb.js";
import { AdminProject, AdminTestimonial } from "../../lib/adminModels.js";
import { defaultProjects } from "../../data/portfolio.js";
import { defaultTestimonials } from "../../data/testimonials.js";

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

export default async function publicContentHandler(request, response) {
  try {
    const requestPath = request.path || request.originalUrl?.split("?")[0] || "";
    await connectToDatabase();

    if (requestPath === "/api/projects") {
      const documents = await AdminProject.find().lean();
      const projects = mergeDefaults(defaultProjects, documents)
        .filter((project) => project.status === "completed");
      return response.json({ success: true, projects });
    }

    if (requestPath === "/api/testimonials") {
      const documents = await AdminTestimonial.find().lean();
      const testimonials = mergeDefaults(defaultTestimonials, documents)
        .filter((testimonial) => testimonial.isPublished !== false);
      return response.json({ success: true, testimonials });
    }

    return response.status(404).json({ success: false, message: "Content endpoint not found." });
  } catch (error) {
    console.error("Public content request failed:", error);
    return response.status(500).json({
      success: false,
      message: "Unable to load public content right now.",
    });
  }
}
