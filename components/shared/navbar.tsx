import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b bg-white py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo - Clean & Minimal */}
        <Link href="/" className="text-xl font-black no-underline">
          <span className="text-gray-900">IUBAT </span>
          <span className="text-red-600 uppercase">Chor's</span>
        </Link>

        {/* Links */}
        <div className="flex gap-4">
          <Link 
            href="/report" 
            className="rounded-lg bg-red-600 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-95"
          >
            Report Incident
          </Link>
        </div>
      </div>
    </nav>
  );
}