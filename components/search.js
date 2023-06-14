"use client"

import Script from "next/script"

export default function StorkSearch() {
    return (
        <div className="stork-wrapper">
            <Script
                src="https://files.stork-search.net/releases/v1.6.0/stork.js"
                onLoad={() => {
                    stork.register("kb", "/kb-index.st")
                }}
            />
            <input type="search" data-stork="kb" className="stork-input p-3 rounded shadow-md w-full" placeholder="Search here..." />
            <div data-stork="kb-output" className="stork-output" />
        </div>
    )
}