import { createIncident } from "@/lib/actions/incident.actions";

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

      {/* Form with Action */}
      <form action={createIncident} className="space-y-10">
        
        {/* SECTION 1: BASIC INFO */}
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">1. Incident Overview</h2>
          
          <div className="flex flex-col gap-6">
            {/* Title - Now Full Width */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Incident Title*</label>
              <input 
                name="title" 
                type="text" 
                placeholder="e.g., Redmi 9 Phone Exam Hall theke Churi" 
                className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 w-full" 
                required 
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase text-gray-500">Incident Type*</label>
                <select 
                  name="type" 
                  className="rounded-lg border border-gray-300 bg-gray-50 p-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600" 
                  required
                >
                  <option value="">Select Type</option>
                  <option value="theft">Theft</option>
                  <option value="scam">Scam / Fraud</option>
                  <option value="harassment">Harassment</option>
                  <option value="other">Other Unethical Behavior</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-black uppercase text-gray-500">Floor/Location*</label>
                <input name="location" type="text" placeholder="e.g. Floor 6, Room 607" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Date*</label>
              <input name="date" type="date" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Approx. Time*</label>
              <input name="time" type="time" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Detailed Context*</label>
            <textarea name="description" rows={4} placeholder="Describe exactly what happened..." className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
          </div>
        </section>

        {/* SECTION 2: PARTIES INVOLVED */}
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">2. Involved Parties</h2>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Who is being reported? (Optional/If known)</label>
            <input name="reportedPerson" type="text" placeholder="Name or ID of the person" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" />
          </div>
        </section>

        {/* SECTION 3: WITNESSES */}
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">3. Witnesses</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-red-600">Witness 1*</label>
              <input name="witness1" type="text" placeholder="Name/ID" className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black uppercase text-red-600">Witness 2*</label>
              <input name="witness2" type="text" placeholder="Name/ID" className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
          </div>
        </section>

        {/* SECTION 4: EVIDENCE */}
        <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-2">4. Evidence</h2>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Evidence Link (FB Profile/Drive URL)</label>
            <input name="evidenceLink" type="url" placeholder="https://..." className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" />
          </div>
        </section>

        {/* SUBMIT */}
        <div className="pt-6">
          <button type="submit" className="group flex w-full items-center justify-center gap-3 rounded-full bg-red-600 py-5 text-xl font-black uppercase tracking-widest text-white transition-all hover:bg-black active:scale-95">
            File Formal Report
            <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
          </button>
        </div>
      </form>
    </main>
  );
}