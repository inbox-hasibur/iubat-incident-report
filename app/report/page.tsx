export default function ReportPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-2xl px-6 py-12">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black tracking-tighter text-gray-900 uppercase">
          Report an <span className="text-red-600">Incident</span>
        </h1>
        <p className="mt-2 text-gray-600">
          Provide as much detail and evidence as possible to verify the report.
        </p>
      </div>

      {/* The Form */}
      <form className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {/* Incident Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wide text-gray-700">
            Incident Title
          </label>
          <input
            type="text"
            placeholder="e.g., Phone theft in Library"
            className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wide text-gray-700">
            Description & Context
          </label>
          <textarea
            placeholder="Describe what happened, the time, and any identifying details..."
            rows={4}
            className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            required
          />
        </div>

        {/* Evidence Link */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold uppercase tracking-wide text-gray-700">
            Evidence Link (FB Profile / Photo Link)
          </label>
          <input
            type="url"
            placeholder="https://facebook.com/profile..."
            className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-full rounded-full bg-red-600 py-4 text-lg font-black uppercase tracking-widest text-white transition-all hover:bg-red-700 active:scale-95"
        >
          Submit Report
        </button>
      </form>
    </main>
  );
}