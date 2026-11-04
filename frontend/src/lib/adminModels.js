import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    formType: { type: String, required: true, enum: ["message", "business", "career"] },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254 },
    message: { type: String, trim: true, maxlength: 5000 },
    business: { type: String, trim: true, maxlength: 200 },
    phone: { type: String, trim: true, maxlength: 30 },
    role: { type: String, trim: true, maxlength: 150 },
    resumeLink: { type: String, trim: true, maxlength: 2048 },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true, maxlength: 120 },
    categories: { type: [String], required: true, validate: (items) => items.length > 0 },
    visual: { type: String, enum: ["mint", "orange", "blue", "violet"], default: "mint" },
    description: { type: String, required: true, trim: true, maxlength: 1000 },
    requirement: { type: String, trim: true, maxlength: 2000, default: "" },
    solution: { type: String, trim: true, maxlength: 2000, default: "" },
    techStack: { type: [String], default: [] },
    imageUrl: { type: String, trim: true, maxlength: 2048, default: "" },
    demoUrl: { type: String, trim: true, maxlength: 2048, default: "" },
    status: { type: String, enum: ["in-progress", "completed"], default: "completed" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const testimonialSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    quote: { type: String, required: true, trim: true, maxlength: 2000 },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    role: { type: String, required: true, trim: true, maxlength: 120 },
    company: { type: String, required: true, trim: true, maxlength: 120 },
    rating: { type: Number, min: 1, max: 5, default: null },
    isPublished: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export const AdminProject = mongoose.models.AdminProject ||
  mongoose.model("AdminProject", projectSchema);
export const AdminTestimonial = mongoose.models.AdminTestimonial ||
  mongoose.model("AdminTestimonial", testimonialSchema);
