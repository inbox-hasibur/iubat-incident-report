export default function ReportPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl px-6 py-12">
      {/* Header */}
      <div className="mb-12 border-l-4 border-red-600 pl-6">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase">
          Submit a <span className="text-red-600">Red Flag</span>
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Formalize the incident with mandatory details and witnesses to ensure integrity.
        </p>
      </div>

      <form className="space-y-10">
        {/* SECTION 1: BASIC INFO */}
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">1. Incident Overview</h2>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Incident Type*</label>
              <select className="rounded-lg border border-gray-300 bg-gray-50 p-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600" required>
                <option value="">Select Type</option>
                <option value="theft">Theft</option>
                <option value="scam">Scam / Fraud</option>
                <option value="harassment">Harassment</option>
                <option value="other">Other Unethical Behavior</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Incident Title*</label>
              <input type="text" placeholder="Short summary" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600" required />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Date*</label>
              <input type="date" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Approx. Time*</label>
              <input type="time" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Floor/Location*</label>
              <input type="text" placeholder="e.g. 5th Floor, Library" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Detailed Context*</label>
            <textarea rows={4} placeholder="Describe exactly what happened..." className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
          </div>
        </section>

        {/* SECTION 2: PARTIES INVOLVED */}
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">2. Involved Parties</h2>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Who is being reported? (Optional/If known)</label>
            <input type="text" placeholder="Name or ID of the person" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" />
          </div>
        </section>

        {/* SECTION 3: WITNESSES (Mandatory) */}
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">3. Witnesses</h2>
          <p className="text-sm text-gray-500 italic">At least 2 witnesses are required for verification purposes.</p>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-red-600">Witness 1*</label>
              <input type="text" placeholder="Name/ID" className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-red-600">Witness 2*</label>
              <input type="text" placeholder="Name/ID" className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
          </div>
        </section>

        {/* SECTION 4: EVIDENCE */}
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">4. Evidence</h2>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Evidence Link (FB Profile/Drive/Video URL)</label>
            <input type="url" placeholder="https://..." className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Upload Files (Images/PDFs)</label>
            <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-10 transition-colors hover:bg-gray-50">
               <p className="text-sm text-gray-500 font-medium">Click to upload or drag & drop</p>
               <p className="text-xs text-gray-400 mt-1 uppercase font-bold">PDF, PNG, JPG, MP4</p>
            </div>
          </div>
        </section>

        {/* SUBMIT */}
        <div className="pt-6">
          <button type="button" className="group flex w-full items-center justify-center gap-3 rounded-full bg-red-600 py-5 text-xl font-black uppercase tracking-widest text-white transition-all hover:bg-black active:scale-95">
            File Formal Report
            <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </button>
          <p className="mt-4 text-center text-xs text-gray-400 uppercase font-bold tracking-widest">
            Submitting false information may lead to restricted access.
          </p>
        </div>
      </form>
    </main>
  );
}