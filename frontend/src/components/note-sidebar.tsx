"use client";

import { useState } from "react";
import { FolderOpen, ChevronDown, ChevronRight, FileText, Tag, Plus } from "lucide-react";

const folders = [
    { name: "Personal", active: true },
    { name: "Work", active: false },
];

const recentNotes = [
    "Handwritten Notes - ...",
    "Handwritten Notes - 1...",
    "Handwritten pages - 1...",
    "Handwritten pages - 1...",
    "Handwritten pages - 1...",
];

export function NoteSidebar() {
    const [foldersOpen, setFoldersOpen] = useState(true);
    const [activeFolder, setActiveFolder] = useState("Personal");

    return (
        <aside className="flex h-full w-64 flex-shrink-0 flex-col border-r border-white/[0.06] bg-white/[0.02]">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
                <FileText className="h-4 w-4 text-indigo-400" />
                <h2 className="text-sm font-semibold">Handwritten Notes</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
                {/* Folders */}
                <div>
                    <button
                        onClick={() => setFoldersOpen(!foldersOpen)}
                        className="flex w-full items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                    >
                        {foldersOpen ? (
                            <ChevronDown className="h-3 w-3" />
                        ) : (
                            <ChevronRight className="h-3 w-3" />
                        )}
                        Folders
                    </button>
                    {foldersOpen && (
                        <div className="space-y-1">
                            {folders.map((f) => (
                                <button
                                    key={f.name}
                                    onClick={() => setActiveFolder(f.name)}
                                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                                        activeFolder === f.name
                                            ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20"
                                            : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-300"
                                    }`}
                                >
                                    <FolderOpen className="h-3.5 w-3.5" />
                                    {f.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Notes */}
                <div>
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <ChevronDown className="h-3 w-3" />
                        Recent Notes
                    </p>
                    <div className="space-y-1">
                        {recentNotes.map((note, i) => (
                            <button
                                key={i}
                                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-slate-300 truncate"
                            >
                                <FileText className="h-3 w-3 flex-shrink-0 text-violet-400" />
                                <span className="truncate">{note}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Tags
                        </p>
                        <button className="flex h-5 w-5 items-center justify-center rounded border border-white/10 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-slate-300">
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        {["Study", "Work", "Ideas"].map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-white/[0.04] border border-white/[0.06] px-2 py-1 text-[10px] text-slate-400"
                            >
                                <Tag className="mr-1 inline h-2.5 w-2.5" />
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
