import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/90 py-4 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* New Brand: IUBAT RED FLAGS */}
        <Link href="/" className="text-xl font-black no-underline">
          <span className="text-gray-900">IUBAT </span>
          <span className="bg-red-600 px-2 py-1 text-white uppercase italic">Red Flags</span>
        </Link>

        <div className="flex gap-4">
          <Link 
            href="/report" 
            className="rounded-lg border-2 border-red-600 px-5 py-2 text-sm font-bold text-red-600 transition-all hover:bg-red-600 hover:text-white active:scale-95"
          >
            Report Incident
          </Link>
        </div>
      </div>
    </nav>
  );
}