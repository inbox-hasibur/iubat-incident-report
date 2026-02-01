import { getReactionCounts } from "@/lib/actions/reaction.actions";
import ReactionBar from "./reaction-bar";

export default async function IncidentCard({ incident }: { incident: any }) {
  // Fetch reaction counts for this specific incident
  const reactionCounts = await getReactionCounts(incident._id);

  const statusColors: any = {
    unverified: "bg-gray-100 text-gray-600",
    verified: "bg-green-100 text-green-600",
    "under-review": "bg-amber-100 text-amber-600",
    resolved: "bg-blue-100 text-blue-600",
  };

  return (
    <div className="group h-full flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all hover:border-red-600 hover:shadow-xl">
      
      {/* 3-Image Grid Header */}
      <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50/50 border-b border-gray-100">
        <div className="relative aspect-square rounded-xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
           {incident.victimImage ? (
             <img src={incident.victimImage} alt="Victim" className="h-full w-full object-cover" />
           ) : (
             <span className="text-lg">👤</span>
           )}
           <div className="absolute bottom-0 w-full bg-black/60 py-0.5 text-center text-[7px] font-black uppercase tracking-widest text-white">Victim</div>
        </div>

        <div className="relative aspect-square rounded-xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
           {incident.itemImage ? (
             <img src={incident.itemImage} alt="Item" className="h-full w-full object-cover" />
           ) : (
             <span className="text-lg">📦</span>
           )}
           <div className="absolute bottom-0 w-full bg-black/60 py-0.5 text-center text-[7px] font-black uppercase tracking-widest text-white">Item</div>
        </div>

        <div className="relative aspect-square rounded-xl border-2 border-dashed border-red-100 bg-red-50 flex items-center justify-center overflow-hidden">
           {incident.accusedImage ? (
             <img src={incident.accusedImage} alt="Accused" className="h-full w-full object-cover" />
           ) : (
             <span className="text-red-600 font-black text-sm">?</span>
           )}
           <div className="absolute bottom-0 w-full bg-red-600 py-0.5 text-center text-[7px] font-black uppercase tracking-widest text-white">Flag</div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 flex flex-col flex-grow">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600 italic">
            {incident.type}
          </span>
          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${statusColors[incident.status]}`}>
            {incident.status}
          </span>
        </div>

        {/* Title links to details */}
        <a href={`/incident/${incident._id}`} className="block group-hover:text-red-600 transition-colors">
          <h3 className="mb-2 text-lg font-black leading-tight text-gray-900 uppercase">
            {incident.title}
          </h3>
        </a>
        
        <p className="mb-4 line-clamp-2 text-xs text-gray-500 flex-grow leading-relaxed">
          {incident.description}
        </p>

        <div className="mb-4 flex items-center justify-between text-[10px] font-bold uppercase text-gray-400">
          <span>📍 {incident.location}</span>
          <span>📅 {incident.date}</span>
        </div>

        {/* Reaction Bar Integration */}
        <ReactionBar incidentId={incident._id.toString()} initialCounts={reactionCounts} />
      </div>
    </div>
  );
}