import { useState } from "react";
import * as XLSX from "xlsx"; 

export default function Careers() {
  const [formData, setFormData] = useState({ name: "", role: "", resumeLink: "" });
  const [submitted, setSubmitted] = useState(false);

  const [applications, setApplications] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    

    const updatedList = [...applications, { ...formData, date: new Date().toLocaleDateString() }];
    setApplications(updatedList);

    setSubmitted(true);
    setFormData({ name: "", role: "", resumeLink: "" }); 
  };


  const exportToExcel = () => {
    if (applications.length === 0) {
      alert("Koi data export karne ke liye nahi hai!");
      return;
    }


    const worksheetData = applications.map((app, index) => ({
      "S.No": index + 1,
      "Full Name": app.name,
      "Role": app.role,
      "Resume Link": app.resumeLink,
      "Date Submitted": app.date,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

   
    XLSX.writeFile(workbook, "Job_Applications.xlsx");
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-white mb-2">Join Our Team</h2>
        <p className="text-slate-400 text-sm">Submit your details along with your public Resume Link.</p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="text-teal-400 text-4xl font-bold">✓</div>
            <h3 className="text-xl font-bold text-white">Application Submitted!</h3>
            <p className="text-slate-400 text-sm">We will review your resume link and get back to you soon.</p>
            <div className="flex gap-3 justify-center mt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Full Name</label>
              <input
                type="text"
                required
                placeholder="Aapka Naam"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-300 mb-2">Applying Role</label>
              <input
                type="text"
                required
                placeholder="e.g. Graphic Designer / Content Writer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-teal-500/30">
              <label className="block text-xs font-semibold uppercase text-teal-300 mb-1">
                Resume Link (Google Drive / Dropbox) *
              </label>
              <input
                type="url"
                required
                placeholder="https://drive.google.com/file/d/..."
                value={formData.resumeLink}
                onChange={(e) => setFormData({ ...formData, resumeLink: e.target.value })}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:border-teal-400 focus:outline-none mb-2"
              />
              <p className="text-xs text-slate-400">
                ⚠️ Make sure the link access is set to <strong>"Anyone with the link"</strong>.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl transition-all text-sm"
            >
              Submit Application
            </button>
          </form>
        )}

      
        {applications.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400 mb-3">Total Submissions: {applications.length}</p>
            <button
              onClick={exportToExcel}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-2 mx-auto"
            >
              📊 Download Submissions Excel (.xlsx)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}