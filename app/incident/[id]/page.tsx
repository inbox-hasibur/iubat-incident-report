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

      {/* EVIDENCE GALLERY SECTION (With Real Images) */}
      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Victim Slot */}
        <div className="relative aspect-square rounded-3xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center shadow-sm">
           {incident.victimImage ? (
             <img src={incident.victimImage} className="h-full w-full object-cover" alt="Victim" />
           ) : (
             <div className="flex flex-col items-center"><span className="text-6xl mb-2 grayscale opacity-20">👤</span></div>
           )}
           <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white">Victim</div>
        </div>

        {/* Item Slot */}
        <div className="relative aspect-square rounded-3xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center shadow-sm">
           {incident.itemImage ? (
             <img src={incident.itemImage} className="h-full w-full object-cover" alt="Item" />
           ) : (
             <div className="flex flex-col items-center"><span className="text-6xl mb-2 grayscale opacity-20">📦</span></div>
           )}
           <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white">Evidence / Item</div>
        </div>

        {/* Accused Slot */}
        <div className="relative aspect-square rounded-3xl border-2 border-dashed border-red-200 bg-red-50 overflow-hidden flex items-center justify-center shadow-sm">
           {incident.accusedImage ? (
             <img src={incident.accusedImage} className="h-full w-full object-cover" alt="Accused" />
           ) : (
             <div className="flex flex-col items-center"><span className="text-6xl mb-2">❓</span></div>
           )}
           <div className="absolute top-4 left-4 bg-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase text-white italic tracking-tighter">Primary Red Flag</div>
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

          {/* Description */}
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
                   <div className="h-10 w-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center italic">W{i+1}</div> 
                   {w}
                </div>
              ))}
            </div>
          </div>
          
          {/* Multiple Evidence Links (The Missing Links Section) */}
          <div className="rounded-3xl border border-gray-200 bg-white p-10">
            <h2 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-[0.2em]">External Evidence Links</h2>
            <div className="space-y-3">
              {incident.evidenceLinks && incident.evidenceLinks.length > 0 ? (
                incident.evidenceLinks.map((link: string, i: number) => (
                  <a key={i} href={link} target="_blank" className="flex items-center gap-3 p-5 rounded-2xl border border-gray-100 bg-gray-50 text-sm font-bold text-blue-600 transition-all hover:bg-red-50 hover:text-red-600 group">
                    <span className="text-xl group-hover:scale-125 transition-transform">🔗</span> 
                    <span className="break-all">{link}</span>
                    <span className="ml-auto">↗</span>
                  </a>
                ))
              ) : (
                <p className="text-xs font-bold text-gray-400 italic">No external links provided.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Log */}
        <aside className="space-y-6">
           <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest border-b pb-4">Logistics</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[9px] uppercase font-black text-gray-400 mb-1">Location</p>
                    <p className="font-black text-gray-900 uppercase text-lg italic tracking-tight">{incident.location}</p>
                 </div>
                 <div>
                    <p className="text-[9px] uppercase font-black text-gray-400 mb-1">Timeline</p>
                    <p className="font-black text-gray-900 uppercase tracking-tight">{incident.date} / {incident.time}</p>
                 </div>
                 {incident.reportedPerson && (
                    <div>
                        <p className="text-[9px] uppercase font-black text-gray-400 mb-1">Alleged Person</p>
                        <p className="font-black text-red-600 uppercase tracking-tight">{incident.reportedPerson}</p>
                    </div>
                 )}
              </div>
           </div>
        </aside>
      </div>
    </main>
  );
}