"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Trash2, MessageCircle, Mail, Download } from "lucide-react";
import { leadsApi } from "@/lib/api";
import toast from "react-hot-toast";
import type { Lead } from "@/types";

const STATUSES = ["all", "new", "contacted", "enrolled", "not-interested"] as const;
type StatusFilter = typeof STATUSES[number];

const STATUS_STYLES: Record<string, string> = {
  new:             "bg-blue-100 text-blue-700 border-blue-200",
  contacted:       "bg-gold-100 text-gold-700 border-gold-200",
  enrolled:        "bg-emerald-100 text-emerald-700 border-emerald-200",
  "not-interested":"bg-cream-200 text-gray-500 border-cream-300",
};

const WHATSAPP = "919567175595";

export default function AdminLeadsPage() {
  const [leads, setLeads]             = useState<Lead[]>([]);
  const [loading, setLoading]         = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch]           = useState("");

  const load = () => {
    setLoading(true);
    const params = statusFilter !== "all" ? { status: statusFilter } : {};
    leadsApi.getAll(params)
      .then(res => setLeads(res.data.data))
      .catch(() => toast.error("Failed to load leads"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await leadsApi.updateStatus(id, status);
      setLeads(l => l.map(x => x._id === id ? { ...x, status: status as Lead["status"] } : x));
      toast.success("Status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    try {
      await leadsApi.delete(id);
      setLeads(l => l.filter(x => x._id !== id));
      toast.success("Lead deleted");
    } catch {
      toast.error("Failed to delete lead");
    }
  };

  const filtered = leads.filter(l =>
    l.studentName.toLowerCase().includes(search.toLowerCase()) ||
    l.whatsapp.includes(search) ||
    l.courseInterest?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-outfit font-bold text-h2 text-charcoal-900">Leads & Inquiries</h1>
          <p className="text-body text-gray-500">
            {leads.length} total · {leads.filter(l => l.status === "new").length} new
          </p>
        </div>
        <button
          onClick={async () => {
            try {
              const res = await leadsApi.export();
              const url = URL.createObjectURL(res.data);
              const a = document.createElement("a");
              a.href = url; a.download = "leads.csv"; a.click();
            } catch {
              toast.error("Export failed");
            }
          }}
          className="btn-secondary shrink-0"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input pl-10"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-gray-400" />
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-small font-medium transition-all capitalize
                ${statusFilter === s
                  ? "bg-maroon-800 text-white"
                  : "bg-white border border-cream-200 text-gray-500 hover:border-maroon-800/30"
                }`}
            >
              {s.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-cream-100 border-b border-cream-200">
                {["Student", "Grade", "Course Interest", "WhatsApp", "Source", "Date", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-4 text-small font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className="px-5 py-4"><div className="skeleton h-4 rounded" /></td>
                      ))}
                    </tr>
                  ))
                : filtered.map((lead, i) => (
                    <motion.tr
                      key={lead._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.02 }}
                      className="hover:bg-cream-50 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-maroon-800/10 flex items-center justify-center
                                          font-outfit font-bold text-maroon-800 text-small shrink-0">
                            {lead.studentName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-charcoal-900 text-small whitespace-nowrap">
                              {lead.studentName}
                            </p>
                            {lead.parentName && (
                              <p className="text-small text-gray-400">{lead.parentName}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-small text-gray-500 whitespace-nowrap">{lead.grade}</td>
                      <td className="px-5 py-4 text-small text-charcoal-800 whitespace-nowrap">
                        {lead.courseInterest || "—"}
                      </td>
                      <td className="px-5 py-4 text-small whitespace-nowrap">
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-maroon-800 hover:underline"
                        >
                          {lead.whatsapp}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-1 rounded-md bg-cream-100 text-small capitalize whitespace-nowrap">
                          {lead.source.replace(/-/g, " ")}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-small text-gray-500 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "2-digit" })}
                      </td>
                      <td className="px-5 py-4">
                        <select
                          value={lead.status}
                          onChange={e => updateStatus(lead._id, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-small font-medium border cursor-pointer
                            focus:outline-none ${STATUS_STYLES[lead.status]}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="not-interested">Not Interested</option>
                        </select>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${lead.studentName}, this is NextStep Academy. We wanted to follow up on your inquiry about ${lead.courseInterest || "our courses"}.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-green-50 text-gray-400 hover:text-green-600 transition-colors"
                            title="WhatsApp"
                          >
                            <MessageCircle size={15} />
                          </a>
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Email"
                            >
                              <Mail size={15} />
                            </a>
                          )}
                          <button
                            onClick={() => deleteLead(lead._id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
              }

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-16 text-center text-gray-500">
                    No leads found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
