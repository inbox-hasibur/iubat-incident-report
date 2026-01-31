import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 py-12 text-center">
      {/* Alert Badge */}
      <div className="mb-6 rounded-full bg-red-100 px-4 py-1.5 text-xs font-bold tracking-widest text-red-600 uppercase">
        Campus Safety Alert
      </div>

      {/* Hero Content */}
      <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tighter text-gray-900 md:text-7xl">
        Protect the <span className="text-red-600">IUBAT</span> Community.
      </h1>
      
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600 md:text-xl">
        A transparent platform to report unethical activities and stay informed about safety incidents on campus. Your reports help everyone stay vigilant.
      </p>

      {/* Call to Actions */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/report"
          className="w-full rounded-full bg-red-600 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-red-700 active:scale-95 sm:w-auto"
        >
          File a Report
        </Link>
        <Link
          href="#incidents"
          className="w-full rounded-full border-2 border-gray-900 px-10 py-4 text-lg font-bold text-gray-900 transition-all hover:bg-gray-900 hover:text-white active:scale-95 sm:w-auto"
        >
          View Incidents
        </Link>
      </div>

      {/* Simple Stats/Trust Section */}
      <div className="mt-20 grid grid-cols-2 gap-8 border-t border-gray-200 pt-10 md:grid-cols-3">
        <div className="flex flex-col">
          <span className="text-3xl font-black text-gray-900">100%</span>
          <span className="text-sm font-medium text-gray-500 uppercase">Anonymity</span>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-black text-gray-900">Verified</span>
          <span className="text-sm font-medium text-gray-500 uppercase">Evidence</span>
        </div>
        <div className="flex flex-col col-span-2 md:col-span-1">
          <span className="text-3xl font-black text-gray-900">Fast</span>
          <span className="text-sm font-medium text-gray-500 uppercase">Alerts</span>
        </div>
      </div>
    </main>
  );
}