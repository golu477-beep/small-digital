import { useMemo, useState } from "react";
import { ArrowLeft, Check, Copy, FileText, Search, ShieldCheck } from "lucide-react";

const policies = {
  privacy: {
    label: "Privacy Policy",
    updated: "October 27, 2026",
    intro: "How Small Digital handles information shared through our website and services.",
    sections: [
      {
        title: "Information We Collect",
        paragraphs: [
          "When you contact us, request a project estimate, apply for a role, or subscribe to updates, we may collect the details you choose to provide, such as your name, email address, phone number, and message.",
          "Basic technical information, such as browser type and pages visited, may also be processed to keep the website secure and understand how it is used.",
        ],
      },
      {
        title: "How We Use Your Information",
        paragraphs: [
          "We use submitted information to respond to enquiries, prepare proposals, deliver requested services, provide support, and send newsletter updates where you have opted in.",
          "You can ask us to stop newsletter emails at any time. We do not use contact details for unrelated marketing without an appropriate choice or permission.",
        ],
      },
      {
        title: "Sharing and Service Providers",
        paragraphs: [
          "We may use trusted providers for hosting, email delivery, data storage, and other services needed to operate the website or complete your project. They receive only the information needed for their role.",
          "We do not sell personal information. We may disclose information where required by law or when necessary to protect our rights, users, or services.",
        ],
      },
      {
        title: "Retention and Security",
        paragraphs: [
          "We keep information for as long as it is needed to respond to you, provide services, meet legal obligations, and resolve disputes. Retention periods may differ depending on the type of information and our relationship.",
          "We use reasonable administrative and technical safeguards. No method of online storage or transmission can be guaranteed completely secure.",
        ],
      },
      {
        title: "Your Choices and Contact",
        paragraphs: [
          "Depending on where you live, you may be able to request access to, correction of, or deletion of your personal information, or object to certain uses. Contact us and we will review your request under applicable law.",
          "For privacy questions or requests, email SmallDigital@company.com.",
        ],
      },
    ],
  },
  terms: {
    label: "Terms & Conditions",
    updated: "October 27, 2026",
    intro: "The general terms for using this website and working with Small Digital.",
    sections: [
      {
        title: "Agreement and Acceptance",
        paragraphs: [
          "By using this website, you agree to these terms. A project begins only when both parties accept a written proposal, statement of work, or other service agreement.",
          "If a signed project agreement conflicts with these website terms, the project agreement applies to that project.",
        ],
      },
      {
        title: "Project Scope and Revisions",
        paragraphs: [
          "Deliverables, milestones, fees, responsibilities, and included revisions are described in the accepted project agreement. Requests outside the agreed scope may require a revised estimate and schedule.",
          "You agree to provide timely feedback, approvals, content, and access reasonably needed to complete the work.",
        ],
      },
      {
        title: "Intellectual Property",
        paragraphs: [
          "Ownership and licensing of project deliverables are determined by the applicable project agreement. Unless that agreement says otherwise, third-party tools, fonts, libraries, and other materials remain subject to their own licences.",
          "We may request permission before identifying a client or displaying completed work in our portfolio.",
        ],
      },
      {
        title: "Fees and Payment",
        paragraphs: [
          "Fees, payment dates, taxes, and any deposit or milestone schedule are stated in the applicable proposal or invoice. Work may be paused for overdue undisputed payments where permitted by the project agreement and applicable law.",
          "Any cancellation, rescheduling, or refund terms agreed for a project take precedence over this general summary.",
        ],
      },
      {
        title: "Third-Party Services and Liability",
        paragraphs: [
          "A project may depend on hosting providers, platforms, APIs, or other third-party services. Their availability and terms are controlled by those providers.",
          "Nothing in these terms limits a right or remedy that cannot legally be excluded. Project-specific warranties and liability terms should be set out in the written agreement.",
        ],
      },
    ],
  },
  refund: {
    label: "Refund Policy",
    updated: "October 27, 2026",
    intro: "How cancellations and refund requests are handled for digital agency services.",
    sections: [
      {
        title: "Project Deposits and Payments",
        paragraphs: [
          "The proposal or project agreement sets out any deposit, milestone payments, and cancellation terms. A payment for work already completed or costs already committed may not be refundable, subject to the written agreement and applicable law.",
          "Please review the payment schedule and cancellation terms before approving a proposal.",
        ],
      },
      {
        title: "Milestones and Deliverables",
        paragraphs: [
          "If a project is cancelled, we will review the work completed, approved milestones, and any non-cancellable third-party costs up to the cancellation date.",
          "Any amount due or refundable will be assessed against the project agreement and applicable law. We will explain the calculation before closing the project.",
        ],
      },
      {
        title: "Non-Refundable Costs",
        paragraphs: [
          "Third-party expenses, licences, subscriptions, and other costs purchased or committed specifically for a project may not be recoverable. Where possible, such costs will be identified in the proposal or invoice.",
          "This policy does not remove any consumer rights or other protections that apply under local law.",
        ],
      },
      {
        title: "How to Request a Review",
        paragraphs: [
          "Email SmallDigital@company.com with your name, project details, invoice reference, and reason for the request. We will acknowledge your request and review it against the project agreement.",
          "We aim to respond within 10 business days. If more time is needed, we will let you know.",
        ],
      },
    ],
  },
};

function getInitialPolicy() {
  const requested = new URLSearchParams(window.location.search).get("policy");
  return Object.hasOwn(policies, requested) ? requested : "privacy";
}

export default function LegalPortal() {
  const [activePolicy, setActivePolicy] = useState(getInitialPolicy);
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const policy = policies[activePolicy];
  const visibleSections = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return policy.sections;
    return policy.sections.filter((section) =>
      `${section.title} ${section.paragraphs.join(" ")}`.toLowerCase().includes(query),
    );
  }, [policy, search]);

  const selectPolicy = (key) => {
    setActivePolicy(key);
    setSearch("");
    setCopied(false);
    const url = new URL(window.location.href);
    url.searchParams.set("policy", key);
    window.history.replaceState({}, "", url);
  };

  const copyPolicy = async () => {
    const text = `${policy.label}\n\n${policy.sections.map((section) =>
      `${section.title}\n${section.paragraphs.join("\n\n")}`,
    ).join("\n\n")}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Unable to copy the legal policy.", error);
    }
  };

  return (
    <main className="legal-portal">
      <header className="legal-header">
        <a href="/" className="legal-back-link"><ArrowLeft aria-hidden="true" /> Back to Small Digital Home</a>
        <span className="legal-updated">Updated {policy.updated} <b /> Official Legal Terms</span>
      </header>

      <section className="legal-hero">
        <span className="legal-eyebrow"><ShieldCheck aria-hidden="true" /> COMPLIANCE & TRANSPARENCY</span>
        <h1>Small Digital <span>Legal Portal</span></h1>
        <p>Clear, transparent policies for working together and using our website.</p>
      </section>

      <nav className="legal-toolbar" aria-label="Legal policies">
        <div className="legal-policy-tabs">
          {Object.entries(policies).map(([key, item]) => (
            <button
              type="button"
              key={key}
              className={activePolicy === key ? "is-active" : ""}
              aria-current={activePolicy === key ? "page" : undefined}
              onClick={() => selectPolicy(key)}
            >
              <FileText aria-hidden="true" /> {item.label}
            </button>
          ))}
        </div>
        <div className="legal-actions">
          <label className="legal-search">
            <Search aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search policy details..."
              aria-label="Search policy details"
            />
          </label>
          <button type="button" className="legal-copy-button" onClick={copyPolicy}>
            {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
            {copied ? "Copied" : "Copy Text"}
          </button>
        </div>
      </nav>

      <div className="legal-layout">
        <aside className="legal-sidebar">
          <nav className="legal-toc" aria-label={`${policy.label} contents`}>
            <div className="legal-toc-heading"><span>TABLE OF CONTENTS</span><span>{visibleSections.length} SECTIONS</span></div>
            <ol>
              {visibleSections.map((section, index) => (
                <li key={section.title}><a href={`#legal-section-${index + 1}`}>{index + 1}. {section.title}</a></li>
              ))}
            </ol>
          </nav>
          <section className="legal-help-card">
            <h2>Have Legal Questions?</h2>
            <p>Our team can help clarify how these policies apply to your project.</p>
            <a href="mailto:SmallDigital@company.com">SmallDigital@company.com</a>
          </section>
        </aside>

        <article className="legal-document">
          <header className="legal-document-heading">
            <span className="legal-document-icon"><FileText aria-hidden="true" /></span>
            <div><h2>{policy.label}</h2><p>{policy.intro}</p></div>
          </header>
          {visibleSections.length > 0 ? visibleSections.map((section, index) => (
            <section className="legal-section" id={`legal-section-${index + 1}`} key={section.title}>
              <h3>{index + 1}. {section.title}</h3>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          )) : <p className="legal-no-results">No policy sections match “{search}”. Try another search.</p>}
          <p className="legal-draft-notice">
            <strong>Important:</strong> This page provides general information and is not legal advice. Review these draft policies with a qualified legal professional and update them to reflect your actual business practices and applicable laws.
          </p>
        </article>
      </div>
    </main>
  );
}
