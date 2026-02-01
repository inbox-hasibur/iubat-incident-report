import Link from "next/link";
import connectToDatabase from "@/lib/db";
import Incident from "@/lib/models/Incident";
import IncidentCard from "@/components/shared/incident-card";

export default async function Home({ searchParams }: { searchParams: any }) {
  await connectToDatabase();
  
  // URL theke filter type neya (e.g. ?type=theft)
  const typeFilter = (await searchParams).type;
  
  // Filter logic: type thakle filter korbe, na thakle sob dekhabe
  const query = typeFilter ? { type: typeFilter } : {};
  const incidents = await Incident.find(query).sort({ createdAt: -1 });

  const categories = [
    { label: "All", value: "" },
    { label: "Theft", value: "theft" },
    { label: "Scam", value: "scam" },
    { label: "Harassment", value: "harassment" },
  ];

  return (
    <main className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-20 flex flex-col items-center text-center">
        <h1 className="max-w-3xl text-5xl font-black tracking-tighter text-gray-900 md:text-7xl italic uppercase">
          IUBAT <span className="text-red-600">Red Flags</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-600">
          A community-driven awareness platform to report and track unethical activities.
        </p>
      </section>

      {/* Category Filters */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.value ? `/?type=${cat.value}` : "/"}
            className={`rounded-full px-6 py-2 text-sm font-bold transition-all ${
              (typeFilter || "") === cat.value
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white text-gray-600 border border-gray-200 hover:border-red-600"
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Incident Feed Section */}
      <section id="incidents" className="scroll-mt-24">
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
            Recent Incidents ({incidents.length})
          </h2>
        </div>

        {incidents.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {incidents.map((item: any) => (
              <IncidentCard 
                key={item._id} 
                incident={JSON.parse(JSON.stringify(item))} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-200 py-24 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 italic">
              No {typeFilter} incidents found.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}