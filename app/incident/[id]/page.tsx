import connectToDatabase from "@/lib/db";
import Incident from "@/lib/models/Incident";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function IncidentDetailsPage({ params }: { params: any }) {
  await connectToDatabase();
  const { id } = await params;
  
  const incident = await Incident.findById(id);
  if (!incident) return notFound();

  return (
    <main className="container mx-auto max-w-5xl px-6 py-12">
      <Link href="/" className="text-xs font-black text-gray-400 hover:text-red-600 uppercase tracking-widest transition-colors">
        ← Back to Incident Feed
      </Link>

      {/* EVIDENCE GALLERY SECTION */}
      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Slot 1: Victim/Reporter */}
        <div className="aspect-square rounded-3xl border border-gray-200 bg-white flex flex-col items-center justify-center p-6 shadow-sm">
           <span className="mb-4 rounded-full bg-gray-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500">Victim / Reporter</span>
           <div className="text-6xl">👤</div>
           <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">No Image Provided</p>
        </div>

        {/* Slot 2: The Item / Incident Scene */}
        <div className="aspect-square rounded-3xl border border-gray-200 bg-white flex flex-col items-center justify-center p-6 shadow-sm">
           <span className="mb-4 rounded-full bg-gray-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-gray-500">Evidence / Item</span>
           <div className="text-6xl">📦</div>
           <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">No Image Provided</p>
        </div>

        {/* Slot 3: The Accused / Red Flag */}
        <div className="aspect-square rounded-3xl border-2 border-dashed border-red-200 bg-red-50 flex flex-col items-center justify-center p-6 shadow-sm">
           <span className="mb-4 rounded-full bg-red-100 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-red-600 italic underline decoration-red-600 underline-offset-4">Primary Red Flag</span>
           <div className="text-6xl grayscale">❓</div>
           <p className="mt-4 text-[10px] font-black text-red-400 uppercase tracking-widest text-center">Identifying Image Pending Verification</p>
        </div>
      </section>

      {/* CASE CONTENT SECTION */}
      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <div className="border-l-8 border-red-600 pl-8">
            <span className="bg-red-600 px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter text-white italic">
              Status: {incident.status}
            </span>
            <h1 className="mt-4 text-5xl font-black uppercase tracking-tighter text-gray-900 leading-[0.9]">
              {incident.title}
            </h1>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-sm">
            <h2 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-[0.2em] flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span> Detailed Context
            </h2>
            <p className="text-xl leading-relaxed text-gray-800 font-medium whitespace-pre-wrap">
              {incident.description}
            </p>
          </div>

          {/* Witnesses */}
          <div className="rounded-3xl border border-gray-200 bg-gray-50/50 p-10">
            <h2 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-[0.2em]">Verified Witnesses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {incident.witnesses.map((w: string, i: number) => (
                <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 font-black text-gray-900 uppercase italic tracking-tight shadow-sm">
                   <div className="h-10 w-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">W{i+1}</div> 
                   {w}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <aside className="space-y-6">
           <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest border-b pb-4">Incident Logistics</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">Location</p>
                    <p className="font-black text-gray-900 uppercase text-lg italic">{incident.location}</p>
                 </div>
                 <div>
                    <p className="text-[9px] uppercase font-black text-gray-400 tracking-widest mb-1">Timeline</p>
                    <p className="font-black text-gray-900 uppercase">{incident.date} / {incident.time}</p>
                 </div>
              </div>
           </div>

           {incident.evidenceLink && (
              <a href={incident.evidenceLink} target="_blank" className="block w-full rounded-3xl bg-red-600 p-8 text-center text-white transition-all hover:bg-black active:scale-95 shadow-xl shadow-red-100">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-2">Primary Link</p>
                <p className="font-black uppercase tracking-tight text-xl italic">External Evidence ↗</p>
              </a>
           )}
        </aside>
      </div>
    </main>
  );
}