import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Calculator, Check } from "lucide-react";

const projectTypes = {
  landing: { label: "Landing page", min: 18000, max: 35000, minWeeks: 2, maxWeeks: 3 },
  ecommerce: { label: "E-commerce website", min: 45000, max: 90000, minWeeks: 4, maxWeeks: 7 },
  application: { label: "Custom web application", min: 85000, max: 180000, minWeeks: 6, maxWeeks: 12 },
};

const addOns = [
  { id: "cms", label: "Content management system", min: 8000, max: 18000, weeks: 1 },
  { id: "payments", label: "Payment integration", min: 7000, max: 15000, weeks: 1 },
  { id: "seo", label: "SEO setup", min: 6000, max: 12000, weeks: 1 },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function ProjectEstimator({ isLight, onNavigate }) {
  const [projectType, setProjectType] = useState("landing");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const selectedProject = projectTypes[projectType];
  const estimate = useMemo(
    () =>
      selectedAddOns.reduce(
        (total, addOnId) => {
          const addOn = addOns.find((item) => item.id === addOnId);
          if (!addOn) return total;
          return {
            min: total.min + addOn.min,
            max: total.max + addOn.max,
            weeks: total.weeks + addOn.weeks,
          };
        },
        { min: selectedProject.min, max: selectedProject.max, weeks: selectedProject.maxWeeks },
      ),
    [selectedAddOns, selectedProject],
  );

  const deposit = Math.max(5000, Math.round(estimate.min * 0.1));

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleAddOn = (addOnId) => {
    setSelectedAddOns((current) =>
      current.includes(addOnId)
        ? current.filter((item) => item !== addOnId)
        : [...current, addOnId],
    );
  };

  const handlePayDeposit = async () => {
    if (!window.Razorpay) {
      setPaymentStatus("Razorpay checkout isn’t available in this browser session.");
      return;
    }

    setIsPaying(true);
    setPaymentStatus("");

    try {
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: deposit * 100,
          currency: "INR",
          receipt: "small-digital-project-deposit",
          customerName: "New client",
          email: "",
          phone: "",
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Unable to start checkout");
      }

      const razorpay = new window.Razorpay({
        key: result.key,
        amount: result.order.amount,
        currency: result.order.currency,
        name: "Small Digital",
        description: "Project deposit",
        order_id: result.order.id,
        handler: async ({ razorpay_payment_id, razorpay_order_id, razorpay_signature }) => {
          const verificationResponse = await fetch("/api/payments/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              payment_id: razorpay_payment_id,
              order_id: razorpay_order_id,
              signature: razorpay_signature,
            }),
          });

          const verificationResult = await verificationResponse.json();

          if (!verificationResponse.ok || !verificationResult.valid) {
            setPaymentStatus("Payment was captured but verification failed. Please reach out to the team.");
            return;
          }

          setPaymentStatus(`Payment received successfully. Your deposit of ${formatCurrency(deposit)} has been recorded.`);
        },
        theme: { color: "#06b6d4" },
        prefill: { name: "" },
      });

      razorpay.open();
    } catch (error) {
      setPaymentStatus(error instanceof Error ? error.message : "Unable to start checkout.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <section
      className={`estimator-section mx-auto max-w-5xl rounded-3xl border p-6 sm:p-9 ${
        isLight
          ? "border-slate-200 bg-white shadow-sm"
          : "border-slate-800 bg-slate-900/70"
      }`}
      aria-labelledby="estimator-heading"
    >
      <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600">
            <Calculator className="h-4 w-4" aria-hidden="true" />
            Project estimator
          </div>
          <h2
            id="estimator-heading"
            className={`text-2xl font-bold sm:text-3xl ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            Get a quick project estimate
          </h2>
          <p className={`mt-2 text-sm leading-6 ${
            isLight ? "text-slate-600" : "text-slate-400"
          }`}>
            Choose a project type and any add-ons to see an indicative budget and timeline.
          </p>

          <label
            htmlFor="project-type"
            className={`mt-6 block text-sm font-semibold ${
              isLight ? "text-slate-800" : "text-slate-200"
            }`}
          >
            What are you looking to build?
          </label>
          <select
            id="project-type"
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
            className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              isLight
                ? "border-slate-300 bg-white text-slate-900"
                : "border-slate-700 bg-slate-950 text-white"
            }`}
          >
            {Object.entries(projectTypes).map(([value, project]) => (
              <option key={value} value={value}>{project.label}</option>
            ))}
          </select>

          <fieldset className="mt-5 space-y-3">
            <legend className={`mb-3 text-sm font-semibold ${
              isLight ? "text-slate-800" : "text-slate-200"
            }`}>
              Optional features
            </legend>
            {addOns.map((addOn) => {
              const isSelected = selectedAddOns.includes(addOn.id);
              return (
                <label
                  key={addOn.id}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
                    isLight
                      ? "border-slate-200 text-slate-700 hover:border-cyan-300"
                      : "border-slate-800 text-slate-300 hover:border-cyan-800"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleAddOn(addOn.id)}
                    className="h-4 w-4 accent-cyan-600"
                  />
                  <span className="flex-1">{addOn.label}</span>
                  {isSelected && <Check className="h-4 w-4 text-cyan-600" aria-hidden="true" />}
                </label>
              );
            })}
          </fieldset>
        </div>

        <div className={`rounded-2xl border p-6 ${
          isLight
            ? "border-cyan-100 bg-cyan-50/70"
            : "border-cyan-900/60 bg-cyan-950/30"
        }`}>
          <p className={`text-xs font-semibold uppercase tracking-wider ${
            isLight ? "text-cyan-800" : "text-cyan-300"
          }`}>
            Indicative estimate
          </p>
          <p className={`mt-3 text-2xl font-extrabold sm:text-3xl ${
            isLight ? "text-slate-900" : "text-white"
          }`}>
            {formatCurrency(estimate.min)} – {formatCurrency(estimate.max)}
          </p>
          <p className={`mt-4 text-sm ${
            isLight ? "text-slate-700" : "text-slate-300"
          }`}>
            Estimated timeline: {selectedProject.minWeeks}–{estimate.weeks} weeks
          </p>
          <p className={`mt-4 text-xs leading-5 ${
            isLight ? "text-slate-600" : "text-slate-400"
          }`}>
            Planning range only, not a quotation. Final pricing and delivery depend on the confirmed scope.
          </p>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={handlePayDeposit}
              disabled={isPaying}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPaying ? "Processing..." : `Pay project deposit · ${formatCurrency(deposit)}`}
            </button>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Discuss your project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {paymentStatus && (
            <p className={`mt-4 text-sm ${paymentStatus.includes("successfully") || paymentStatus.includes("recorded") ? "text-emerald-600" : "text-amber-600"}`}>
              {paymentStatus}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
