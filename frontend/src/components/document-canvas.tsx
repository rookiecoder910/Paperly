"use client";

import {
    Undo2,
    Redo2,
    ChevronDown,
    Bold,
    Italic,
    Underline,
    Pen,
    Eraser,
    List,
    LayoutGrid,
    MoreHorizontal,
} from "lucide-react";

export function DocumentCanvas() {
    return (
        <div className="flex flex-1 flex-col min-w-0">
            {/* Toolbar */}
            <div className="flex items-center gap-1 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2">
                <ToolBtn icon={<Undo2 className="h-4 w-4" />} />
                <ToolBtn icon={<Redo2 className="h-4 w-4" />} />

                <div className="mx-1.5 h-5 w-px bg-white/10" />

                <button className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-200">
                    Edit
                    <ChevronDown className="h-3 w-3" />
                </button>

                <div className="mx-1.5 h-5 w-px bg-white/10" />

                <ToolBtn icon={<Bold className="h-4 w-4" />} />
                <ToolBtn icon={<Italic className="h-4 w-4" />} />
                <ToolBtn icon={<Underline className="h-4 w-4" />} />
                <ToolBtn icon={<Pen className="h-4 w-4" />} />
                <ToolBtn icon={<Eraser className="h-4 w-4" />} />

                <div className="mx-1.5 h-5 w-px bg-white/10" />

                <ToolBtn icon={<List className="h-4 w-4" />} />
                <ToolBtn icon={<LayoutGrid className="h-4 w-4" />} />
                <ToolBtn icon={<MoreHorizontal className="h-4 w-4" />} />
            </div>

            {/* Canvas area */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
                <div className="mx-auto max-w-3xl rounded-xl border border-white/[0.06] bg-white shadow-xl">
                    {/* Parchment-style handwriting preview */}
                    <div className="p-6 sm:p-8 md:p-10 min-h-[500px]" style={{ fontFamily: "'Caveat', cursive" }}>
                        <h2 className="mb-4 text-2xl font-bold text-slate-800 sm:text-3xl">
                            Handwritten Notes
                        </h2>
                        <div className="space-y-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                            <p>
                                Handwritten notes at exact a structure kind on
                                analytics and quality of tasks, which is the diagram
                                of results field, charts and learning pages, screenshots
                                and comments, how the function a handwritten pages of
                                product options with the datacreating, and troubleshooting
                                command.
                            </p>
                            <div className="my-4 flex items-center gap-6 text-sm text-slate-600">
                                <div>
                                    <p className="font-semibold">Data documents</p>
                                    <p className="text-slate-500">4 Handwritten</p>
                                    <p className="text-slate-500">notes pages</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Handwritten</p>
                                    <p className="text-slate-500">pages</p>
                                </div>
                            </div>
                            <p>
                                In combination an engineering to meet your handwritten
                                analytics and develop the known benefits of notes
                                using as builder tools in beam converting the neatly fine
                                quality over deletes and comprehensive.
                            </p>
                            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-600">
                                <div>
                                    <p className="mb-1 font-semibold text-slate-700">Review Kitchen</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                                        <li>Product for your image</li>
                                        <li>Searched pages</li>
                                        <li>PDF quality</li>
                                    </ul>
                                </div>
                                <div>
                                    <p className="mb-1 font-semibold text-slate-700">Learning pages</p>
                                    <ul className="list-disc list-inside space-y-0.5 text-slate-500">
                                        <li>Passed AI engine extract of</li>
                                        <li>Jan presentation</li>
                                        <li>Download handwritten pages</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToolBtn({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-200">
            {icon}
        </button>
    );
}
