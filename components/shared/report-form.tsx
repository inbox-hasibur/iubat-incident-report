"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/upload";
import { createIncident } from "@/lib/actions/incident.actions";
import { useRouter } from "next/navigation";

export default function ReportForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Multiple Links State
  const [links, setLinks] = useState([""]); // Start with 1 empty link

  // Image Files State
  const [images, setImages] = useState<{ [key: string]: File | null }>({
    victim: null,
    item: null,
    accused: null,
  });

  // Handle Link Add/Remove
  const addLinkField = () => setLinks([...links, ""]);
  const removeLinkField = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    // 1. Upload Images to Cloudinary (if selected)
    if (images.victim) {
      const url = await uploadImage(images.victim);
      if (url) formData.set("victimImage", url);
    }
    if (images.item) {
      const url = await uploadImage(images.item);
      if (url) formData.set("itemImage", url);
    }
    if (images.accused) {
      const url = await uploadImage(images.accused);
      if (url) formData.set("accusedImage", url);
    }

    // 2. Prepare Links (Join them with comma to send as string)
    // Filter out empty links
    const validLinks = links.filter(l => l.trim() !== "").join(",");
    formData.set("evidenceLinks", validLinks);

    // 3. Send to Server Action
    const result = await createIncident(formData);

    if (result.success) {
      alert("Red Flag Reported Successfully!");
      router.push("/"); // Go to homepage
    } else {
      alert("Error: " + result.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* SECTION 1: BASIC INFO */}
      <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">1. Incident Overview</h2>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Incident Title*</label>
            <input name="title" type="text" placeholder="e.g., Phone Stolen from Library" className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600" required />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Incident Type*</label>
              <select name="type" className="rounded-lg border border-gray-300 bg-gray-50 p-3 outline-none focus:border-red-600" required>
                <option value="">Select Type</option>
                <option value="theft">Theft</option>
                <option value="scam">Scam / Fraud</option>
                <option value="harassment">Harassment</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase text-gray-500">Location*</label>
              <input name="location" type="text" placeholder="e.g. Floor 6, Room 607" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Date*</label>
            <input name="date" type="date" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-gray-500">Time*</label>
            <input name="time" type="time" className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-black uppercase text-gray-500">Detailed Context*</label>
          <textarea name="description" rows={4} placeholder="Describe exactly what happened..." className="rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
        </div>
      </section>

      {/* SECTION 2: WITNESSES */}
      <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">2. Witnesses (Mandatory)</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-red-600">Witness 1*</label>
            <input name="witness1" type="text" placeholder="Name/ID" className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black uppercase text-red-600">Witness 2*</label>
            <input name="witness2" type="text" placeholder="Name/ID" className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600" required />
          </div>
        </div>
      </section>

      {/* SECTION 3: EVIDENCE & MEDIA */}
      <section className="space-y-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">3. Evidence & Media</h2>
        
        {/* Image Upload Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Victim Image */}
            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Victim / Reporter</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImages({...images, victim: e.target.files?.[0] || null})}
                  className="text-xs file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-red-700 hover:file:bg-red-100"
                />
            </div>
            {/* Item Image */}
            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Stolen Item / Scene</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImages({...images, item: e.target.files?.[0] || null})}
                  className="text-xs file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-red-700 hover:file:bg-red-100"
                />
            </div>
            {/* Accused Image */}
            <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Accused / Red Flag</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => setImages({...images, accused: e.target.files?.[0] || null})}
                  className="text-xs file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:px-4 file:py-2 file:text-xs file:font-bold file:text-red-700 hover:file:bg-red-100"
                />
            </div>
        </div>

        {/* Dynamic Links Section */}
        <div className="space-y-4 border-t border-gray-100 pt-6">
          <label className="text-xs font-black uppercase text-gray-500">External Evidence Links (Drive/Facebook)</label>
          {links.map((link, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="url"
                placeholder="https://drive.google.com/..."
                value={link}
                onChange={(e) => handleLinkChange(index, e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 p-3 outline-none focus:border-red-600"
              />
              {links.length > 1 && (
                <button type="button" onClick={() => removeLinkField(index)} className="px-4 text-red-600 font-bold hover:bg-red-50 rounded-lg">✕</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addLinkField} className="text-xs font-bold text-red-600 hover:underline">+ Add Another Link</button>
        </div>
      </section>

      {/* SUBMIT */}
      <div className="pt-6">
        <button 
          type="submit" 
          disabled={loading}
          className="group flex w-full items-center justify-center gap-3 rounded-full bg-red-600 py-5 text-xl font-black uppercase tracking-widest text-white transition-all hover:bg-black active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading Evidence..." : "File Formal Report"}
          {!loading && <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>}
        </button>
      </div>
    </form>
  );
}