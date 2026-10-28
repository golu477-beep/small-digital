import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Check,
  CircleAlert,
  Inbox,
  LoaderCircle,
  LogOut,
  MessageSquareQuote,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

const emptyProject = {
  title: "",
  categories: ["Web Development"],
  description: "",
  requirement: "",
  solution: "",
  techStack: [],
  imageUrl: "",
  demoUrl: "",
  visual: "mint",
  status: "completed",
};

const emptyTestimonial = {
  quote: "",
  name: "",
  role: "",
  company: "",
  rating: "",
  isPublished: true,
};

async function adminRequest(path, options = {}) {
  const response = await fetch(`/api/admin${path}`, {
    ...options,
    credentials: "same-origin",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(result.message || "Admin request failed.");
    error.status = response.status;
    throw error;
  }
  return result;
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <article className="admin-stat-card">
      <span className="admin-stat-icon"><Icon className="h-5 w-5" aria-hidden="true" /></span>
      <div>
        <p>{title}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const result = await adminRequest("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      onLogin(result.email);
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <a href="/" className="admin-back-link"><ArrowLeft className="h-4 w-4" /> Back to website</a>
        <span className="admin-login-eyebrow">SMALL DIGITAL / ADMIN</span>
        <h1>Welcome back</h1>
        <p>Sign in to securely manage your leads and website content.</p>
        <form onSubmit={submit} className="admin-form">
          <label htmlFor="admin-email">Admin email</label>
          <input
            id="admin-email"
            type="email"
            autoComplete="username"
            required
            maxLength={254}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={200}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {error && <p className="admin-error" role="alert"><CircleAlert className="h-4 w-4" />{error}</p>}
          <button type="submit" disabled={isSubmitting} className="admin-primary-button">
            {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="admin-login-note">Admin credentials must be configured on the server.</p>
      </section>
    </main>
  );
}

function InquiryManager({ inquiries, onReload, onError }) {
  const [isBusy, setIsBusy] = useState("");

  const updateInquiry = async (inquiry, changes) => {
    setIsBusy(inquiry._id);
    try {
      await adminRequest(`/inquiries/${inquiry._id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
      });
      await onReload();
    } catch (error) {
      onError(error);
    } finally {
      setIsBusy("");
    }
  };

  const deleteInquiry = async (inquiry) => {
    if (!window.confirm(`Delete the inquiry from ${inquiry.name}? This cannot be undone.`)) return;
    setIsBusy(inquiry._id);
    try {
      await adminRequest(`/inquiries/${inquiry._id}`, { method: "DELETE" });
      await onReload();
    } catch (error) {
      onError(error);
    } finally {
      setIsBusy("");
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div><h2>Contact inquiries</h2><p>Review and triage messages from your website forms.</p></div>
        <span>{inquiries.length} shown</span>
      </div>
      {inquiries.length === 0 ? (
        <p className="admin-empty">No inquiries have been received yet.</p>
      ) : (
        <div className="admin-inquiry-list">
          {inquiries.map((inquiry) => (
            <article key={inquiry._id} className={`admin-inquiry ${inquiry.isRead ? "" : "is-unread"}`}>
              <div className="admin-inquiry-top">
                <div>
                  <span className={`admin-status-pill ${inquiry.isRead ? "is-read" : "is-pending"}`}>
                    {inquiry.isRead ? "Read" : "Pending"}
                  </span>
                  <span className="admin-inquiry-type">{inquiry.formType}</span>
                </div>
                <time dateTime={inquiry.createdAt}>
                  {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : "Date unavailable"}
                </time>
              </div>
              <h3>{inquiry.name}</h3>
              <div className="admin-inquiry-details">
                {inquiry.email && <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>}
                {inquiry.business && <span>Business: {inquiry.business}</span>}
                {inquiry.phone && <a href={`tel:${inquiry.phone}`}>{inquiry.phone}</a>}
                {inquiry.role && <span>Role: {inquiry.role}</span>}
              </div>
              {inquiry.message && <p className="admin-inquiry-message">{inquiry.message}</p>}
              {inquiry.resumeLink && (
                <a className="admin-inline-link" href={inquiry.resumeLink} target="_blank" rel="noreferrer">
                  Open resume link
                </a>
              )}
              <div className="admin-item-actions">
                <button
                  type="button"
                  disabled={Boolean(isBusy)}
                  onClick={() => updateInquiry(inquiry, { isRead: !inquiry.isRead })}
                  className="admin-secondary-button"
                >
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Mark {inquiry.isRead ? "unread" : "read"}
                </button>
                <button
                  type="button"
                  disabled={Boolean(isBusy)}
                  onClick={() => deleteInquiry(inquiry)}
                  className="admin-danger-button"
                >
                  {isBusy === inquiry._id
                    ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    : <Trash2 className="h-4 w-4" aria-hidden="true" />}
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectForm({ initialValue, onSave, onCancel, isSaving }) {
  const [form, setForm] = useState(() => ({
    ...emptyProject,
    ...(initialValue ?? {}),
    techStack: initialValue?.techStack ?? [],
  }));
  const [techStackInput, setTechStackInput] = useState(
    (initialValue?.techStack ?? []).join(", "),
  );
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await onSave({
        ...form,
        techStack: techStackInput.split(",").map((item) => item.trim()).filter(Boolean),
      });
    } catch (saveError) {
      setError(saveError.message);
    }
  };

  return (
    <form className="admin-editor-form" onSubmit={submit}>
      <label>Project title<input required minLength={2} maxLength={120} value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} /></label>
      <label>Categories
        <select
          multiple
          required
          value={form.categories}
          onChange={(event) => setForm({
            ...form,
            categories: [...event.target.selectedOptions].map((option) => option.value),
          })}
        >
          <option value="Web Development">Web Development</option>
          <option value="UI/UX">UI/UX</option>
          <option value="E-commerce">E-commerce</option>
        </select>
        <small>Use Ctrl (Windows) or Command (Mac) to choose more than one.</small>
      </label>
      <label>Description<textarea required maxLength={1000} rows={3} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
      <label>Client requirement<textarea maxLength={2000} rows={2} value={form.requirement} onChange={(event) => setForm({ ...form, requirement: event.target.value })} /></label>
      <label>Solution / approach<textarea maxLength={2000} rows={2} value={form.solution} onChange={(event) => setForm({ ...form, solution: event.target.value })} /></label>
      <label>Tech stack (comma-separated)<input maxLength={1000} value={techStackInput} onChange={(event) => setTechStackInput(event.target.value)} placeholder="React, Node.js, MongoDB" /></label>
      <label>Image URL (optional)<input type="url" maxLength={2048} value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} placeholder="https://example.com/image.jpg" /></label>
      <label>Live demo URL (optional)<input type="url" maxLength={2048} value={form.demoUrl} onChange={(event) => setForm({ ...form, demoUrl: event.target.value })} placeholder="https://example.com" /></label>
      <div className="admin-form-row">
        <label>Visual theme<select value={form.visual} onChange={(event) => setForm({ ...form, visual: event.target.value })}><option value="mint">Mint</option><option value="orange">Orange</option><option value="blue">Blue</option><option value="violet">Violet</option></select></label>
        <label>Project status<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="completed">Completed</option><option value="in-progress">In progress</option></select></label>
      </div>
      {error && <p className="admin-error" role="alert"><CircleAlert className="h-4 w-4" />{error}</p>}
      <div className="admin-item-actions">
        <button type="submit" disabled={isSaving} className="admin-primary-button">
          {isSaving && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Save project
        </button>
        <button type="button" onClick={onCancel} className="admin-secondary-button">Cancel</button>
      </div>
    </form>
  );
}

function TestimonialForm({ initialValue, onSave, onCancel, isSaving }) {
  const [form, setForm] = useState({
    ...emptyTestimonial,
    ...(initialValue ?? {}),
    rating: initialValue?.rating ?? "",
  });
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await onSave(form);
    } catch (saveError) {
      setError(saveError.message);
    }
  };

  return (
    <form className="admin-editor-form" onSubmit={submit}>
      <label>Client quote<textarea required minLength={5} maxLength={2000} rows={4} value={form.quote} onChange={(event) => setForm({ ...form, quote: event.target.value })} /></label>
      <label>Client name<input required minLength={2} maxLength={100} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
      <label>Role<input required maxLength={120} value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} /></label>
      <label>Company<input required maxLength={120} value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} /></label>
      <label>Rating
        <select required value={form.rating} onChange={(event) => setForm({ ...form, rating: Number(event.target.value) })}>
          <option value="" disabled>Choose client rating</option>
          {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} {rating === 1 ? "star" : "stars"}</option>)}
        </select>
      </label>
      <label className="admin-checkbox-label"><input type="checkbox" checked={form.isPublished} onChange={(event) => setForm({ ...form, isPublished: event.target.checked })} /> Published on the website</label>
      {error && <p className="admin-error" role="alert"><CircleAlert className="h-4 w-4" />{error}</p>}
      <div className="admin-item-actions">
        <button type="submit" disabled={isSaving} className="admin-primary-button">
          {isSaving && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
          Save testimonial
        </button>
        <button type="button" onClick={onCancel} className="admin-secondary-button">Cancel</button>
      </div>
    </form>
  );
}

function ContentManager({ type, items, onReload, onError }) {
  const isProject = type === "projects";
  const [editing, setEditing] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [busySlug, setBusySlug] = useState("");
  const endpoint = isProject ? "/projects" : "/testimonials";
  const ItemIcon = isProject ? BriefcaseBusiness : MessageSquareQuote;

  const save = async (value) => {
    setIsSaving(true);
    try {
      const isExisting = Boolean(editing?.slug);
      await adminRequest(isExisting ? `${endpoint}/${encodeURIComponent(editing.slug)}` : endpoint, {
        method: isExisting ? "PUT" : "POST",
        body: JSON.stringify(value),
      });
      setEditing(null);
      await onReload();
    } finally {
      setIsSaving(false);
    }
  };

  const remove = async (item) => {
    const label = isProject ? item.title : `${item.name} (${item.company})`;
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    setBusySlug(item.slug);
    try {
      await adminRequest(`${endpoint}/${encodeURIComponent(item.slug)}`, { method: "DELETE" });
      await onReload();
    } catch (error) {
      onError(error);
    } finally {
      setBusySlug("");
    }
  };

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <h2>{isProject ? "Portfolio projects" : "Client testimonials"}</h2>
          <p>{isProject ? "Manage the projects shown in your public portfolio." : "Manage quotes and choose which ones appear publicly."}</p>
        </div>
        <button
          type="button"
          className="admin-primary-button admin-add-button"
          onClick={() => setEditing(isProject ? { ...emptyProject } : { ...emptyTestimonial })}
        >
          <Plus className="h-4 w-4" aria-hidden="true" /> Add new
        </button>
      </div>

      {editing && (
        <div className="admin-editor-backdrop">
          <section className="admin-editor-dialog" role="dialog" aria-modal="true" aria-labelledby="admin-editor-title">
            <div className="admin-panel-heading">
              <h2 id="admin-editor-title">{editing.slug ? "Edit" : "Add"} {isProject ? "project" : "testimonial"}</h2>
              <button type="button" onClick={() => setEditing(null)} className="admin-secondary-button">Close</button>
            </div>
            {isProject
              ? <ProjectForm initialValue={editing} onSave={save} onCancel={() => setEditing(null)} isSaving={isSaving} />
              : <TestimonialForm initialValue={editing} onSave={save} onCancel={() => setEditing(null)} isSaving={isSaving} />}
          </section>
        </div>
      )}

      {items.length === 0 ? (
        <p className="admin-empty">No {isProject ? "projects" : "testimonials"} yet. Add the first one above.</p>
      ) : (
        <div className="admin-content-list">
          {items.map((item) => (
            <article key={item.slug} className="admin-content-item">
              <span className="admin-content-icon"><ItemIcon className="h-5 w-5" aria-hidden="true" /></span>
              <div className="admin-content-summary">
                <h3>{isProject ? item.title : `${item.name} · ${item.company}`}</h3>
                <p>{isProject ? item.description : item.quote}</p>
                <small>
                  {isProject
                    ? `${item.categories.join(", ")} · ${item.status}`
                    : `${item.role} · ${Number.isInteger(item.rating) ? `${item.rating}/5 stars` : "rating not provided"}${item.isPublished ? "" : " · Draft"}`}
                </small>
              </div>
              <div className="admin-item-actions">
                <button type="button" className="admin-secondary-button" onClick={() => setEditing(item)} aria-label={`Edit ${isProject ? item.title : `${item.name} testimonial`}`}>
                  <Pencil className="h-4 w-4" aria-hidden="true" /> Edit
                </button>
                <button type="button" className="admin-danger-button" disabled={Boolean(busySlug)} onClick={() => remove(item)} aria-label={`Delete ${isProject ? item.title : `${item.name} testimonial`}`}>
                  {busySlug === item.slug
                    ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    : <Trash2 className="h-4 w-4" aria-hidden="true" />}
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default function Admin() {
  const [email, setEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [section, setSection] = useState("overview");
  const [dashboard, setDashboard] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loadAdminData = useCallback(async () => {
    setError("");
    setIsLoading(true);
    try {
      const [dashboardResult, inquiryResult, projectResult, testimonialResult] = await Promise.all([
        adminRequest("/dashboard"),
        adminRequest("/inquiries"),
        adminRequest("/projects"),
        adminRequest("/testimonials"),
      ]);
      setDashboard(dashboardResult);
      setInquiries(inquiryResult.inquiries);
      setProjects(projectResult.projects);
      setTestimonials(testimonialResult.testimonials);
    } catch (loadError) {
      if (loadError.status === 401) {
        setIsAuthenticated(false);
        setEmail("");
      }
      setError(loadError.message);
      throw loadError;
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    adminRequest("/me")
      .then((result) => {
        if (!active) return;
        setEmail(result.email);
        setIsAuthenticated(true);
      })
      .catch(() => {
        if (active) setIsAuthenticated(false);
      })
      .finally(() => {
        if (active) setIsCheckingSession(false);
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.resolve().then(() => loadAdminData()).catch(() => {});
    }
  }, [isAuthenticated, loadAdminData]);

  const handleError = (requestError) => {
    if (requestError.status === 401) {
      setIsAuthenticated(false);
      setEmail("");
    }
    setError(requestError.message);
  };

  const handleLogout = async () => {
    try {
      await adminRequest("/logout", { method: "POST", body: "{}" });
    } catch (logoutError) {
      if (logoutError.status !== 401) setError(logoutError.message);
    } finally {
      setIsAuthenticated(false);
      setEmail("");
    }
  };

  if (isCheckingSession) {
    return <main className="admin-loading"><LoaderCircle className="h-6 w-6 animate-spin" />Checking admin session...</main>;
  }

  if (!isAuthenticated) return <AdminLogin onLogin={(adminEmail) => { setEmail(adminEmail); setIsAuthenticated(true); }} />;

  return (
    <main className="admin-dashboard">
      <header className="admin-topbar">
        <a href="/" className="admin-back-link"><ArrowLeft className="h-4 w-4" /> View website</a>
        <div className="admin-account">
          <span>{email}</span>
          <button type="button" onClick={handleLogout} className="admin-secondary-button">
            <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
          </button>
        </div>
      </header>

      <div className="admin-layout">
        <aside className="admin-sidebar">
          <span className="admin-login-eyebrow">ADMIN WORKSPACE</span>
          {[
            ["overview", "Overview"],
            ["inquiries", "Inquiries"],
            ["projects", "Portfolio"],
            ["testimonials", "Testimonials"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              className={section === value ? "admin-side-link is-active" : "admin-side-link"}
              onClick={() => { setSection(value); setError(""); }}
            >
              {label}
              {value === "inquiries" && dashboard?.stats?.pendingLeads > 0 && (
                <span>{dashboard.stats.pendingLeads}</span>
              )}
            </button>
          ))}
        </aside>

        <div className="admin-main-content">
          <div className="admin-page-heading">
            <div>
              <span className="admin-login-eyebrow">SMALL DIGITAL / ADMIN</span>
              <h1>{section === "overview" ? "Dashboard overview" : section === "inquiries" ? "Contact inquiries" : section === "projects" ? "Portfolio management" : "Testimonials management"}</h1>
              <p>Manage your website content and incoming business leads.</p>
            </div>
            <button type="button" className="admin-secondary-button" onClick={() => loadAdminData().catch(handleError)} disabled={isLoading}>
              {isLoading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
              Refresh
            </button>
          </div>

          {error && <p className="admin-error admin-page-error" role="alert"><CircleAlert className="h-4 w-4" />{error}</p>}

          {section === "overview" && (
            <>
              <div className="admin-stats-grid">
                <StatCard title="Total inquiries" value={dashboard?.stats?.totalInquiries ?? "—"} icon={Inbox} />
                <StatCard title="Pending leads" value={dashboard?.stats?.pendingLeads ?? "—"} icon={MessageSquareQuote} />
                <StatCard title="Completed projects" value={dashboard?.stats?.completedProjects ?? "—"} icon={BriefcaseBusiness} />
              </div>
              <section className="admin-panel">
                <div className="admin-panel-heading"><div><h2>Recent messages</h2><p>Your latest website inquiries.</p></div><button type="button" className="admin-inline-link" onClick={() => setSection("inquiries")}>View all</button></div>
                {!dashboard?.recentMessages?.length
                  ? <p className="admin-empty">No messages to show.</p>
                  : <div className="admin-recent-list">{dashboard.recentMessages.map((message) => <button type="button" key={message._id} onClick={() => setSection("inquiries")}><span className={message.isRead ? "admin-recent-dot is-read" : "admin-recent-dot"} /><span><strong>{message.name}</strong><small>{message.message || message.business || message.role || "New enquiry"}</small></span><time>{message.createdAt ? new Date(message.createdAt).toLocaleDateString() : ""}</time></button>)}</div>}
              </section>
            </>
          )}
          {section === "inquiries" && <InquiryManager inquiries={inquiries} onReload={loadAdminData} onError={handleError} />}
          {section === "projects" && <ContentManager type="projects" items={projects} onReload={loadAdminData} onError={handleError} />}
          {section === "testimonials" && <ContentManager type="testimonials" items={testimonials} onReload={loadAdminData} onError={handleError} />}
        </div>
      </div>
    </main>
  );
}
