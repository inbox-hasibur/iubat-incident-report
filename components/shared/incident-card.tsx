export default function IncidentCard({ incident }: { incident: any }) {
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
        
        {/* 1. Victim/Reporter */}
        <div className="aspect-square rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center p-1 transition-all group-hover:border-red-200 shadow-sm">
           <span className="text-[7px] font-black text-gray-400 uppercase tracking-tighter mb-1">Victim</span>
           <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">👤</div>
        </div>

        {/* 2. Item/Product Context */}
        <div className="aspect-square rounded-xl border border-gray-200 bg-white flex flex-col items-center justify-center p-1 transition-all group-hover:border-red-200 shadow-sm">
           <span className="text-[7px] font-black text-gray-400 uppercase tracking-tighter mb-1">Item</span>
           <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">📦</div>
        </div>

        {/* 3. Alleged/Theft Person (Red Flag) */}
        <div className="aspect-square rounded-xl border-2 border-dashed border-red-100 bg-red-50/50 flex flex-col items-center justify-center p-1 transition-all group-hover:border-red-300 shadow-sm">
           <span className="text-[7px] font-black text-red-500 uppercase tracking-tighter mb-1">Alleged</span>
           <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-black text-sm">?</div>
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

        <h3 className="mb-2 text-lg font-black leading-tight text-gray-900 line-clamp-2 uppercase tracking-tight">
          {incident.title}
        </h3>
        
        <p className="mb-4 line-clamp-2 text-xs text-gray-500 flex-grow leading-relaxed">
          {incident.description}
        </p>

        <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-[10px] font-bold uppercase text-gray-400">
          <span className="flex items-center gap-1">📍 <span className="truncate max-w-[80px]">{incident.location}</span></span>
          <span>📅 {incident.date}</span>
        </div>
      </div>
    </div>
  );
}