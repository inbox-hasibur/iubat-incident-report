import ReportForm from "@/components/shared/report-form";

export default function ReportPage() {
  return (
    <main className="container mx-auto min-h-screen max-w-3xl px-6 py-12">
      {/* Page Header */}
      <div className="mb-12 border-l-4 border-red-600 pl-6">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase leading-[0.9]">
          Submit a <span className="text-red-600">Red Flag</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 font-medium">
          Formalize the incident with mandatory details and witnesses to ensure integrity.
        </p>
      </div>

      {/* Calling the Interactive Client Form */}
      <ReportForm />
      
      {/* Footer Disclaimer */}
      <p className="mt-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">
        IUBAT Red Flags • Official Integrity System
      </p>
    </main>
  );
}