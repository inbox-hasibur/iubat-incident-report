export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-extrabold text-primary mb-4 uppercase tracking-tighter">
        IUBAT Incident Reporting
      </h1>
      <p className="text-muted-foreground text-lg max-w-md">
        This platform is for reporting safety incidents and staying alert within the campus.
      </p>
      <button className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-bold hover:opacity-90 transition-all">
        Report an Incident
      </button>
    </main>
  );
}