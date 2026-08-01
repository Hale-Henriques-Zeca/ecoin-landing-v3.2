"use client";

import React from "react";

import {

    Code,

    Eye,

    FileCode,

} from "lucide-react";

export interface HtmlPreviewProps{

    html:string;

    className?:string;

}

export default function HtmlPreview({

    html,

    className=""

}:HtmlPreviewProps){

    return(

        <div

            className={`

            rounded-2xl

            border

            border-[#D4AF37]/30

            bg-black/70

            backdrop-blur-xl

            p-5

            ${className}

            `}

        >

            <div

                className="

                flex

                items-center

                justify-between

                mb-4

                "

            >

                <div

                    className="flex items-center gap-2"

                >

                    <Eye

                        size={18}

                        className="text-[#D4AF37]"

                    />

                    <span

                        className="font-semibold text-white"

                    >

                        HTML Preview

                    </span>

                </div>

                <FileCode

                    size={18}

                    className="text-[#D4AF37]"

                />

            </div>

            <div

                className="

                grid

                md:grid-cols-2

                gap-4

                "

            >

                {/* HTML */}

                <div

                    className="

                    rounded-xl

                    border

                    border-gray-700

                    bg-black/40

                    p-4

                    "

                >

                    <div

                        className="

                        flex

                        items-center

                        gap-2

                        mb-2

                        "

                    >

                        <Code

                            size={14}

                            className="text-[#D4AF37]"

                        />

                        <span

                            className="

                            text-xs

                            uppercase

                            text-gray-400

                            "

                        >

                            Código

                        </span>

                    </div>

                    <pre

                        className="

                        text-xs

                        text-green-300

                        whitespace-pre-wrap

                        overflow-auto

                        max-h-80

                        "

                    >

                        {html}

                    </pre>

                </div>

                {/* Render */}

                <div

                    className="

                    rounded-xl

                    border

                    border-[#D4AF37]/30

                    bg-white

                    overflow-auto

                    max-h-80

                    "

                >

                    <div

                        className="

                        border-b

                        p-2

                        bg-gray-100

                        text-xs

                        text-gray-600

                        "

                    >

                        Resultado Renderizado

                    </div>

                    <div

                        className="p-4"

                        dangerouslySetInnerHTML={{

                            __html:html

                        }}

                    />

                </div>

            </div>

        </div>

    );

}