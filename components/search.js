"use client"

import Script from "next/script"
import { useSearchParams } from 'next/navigation'

export default function StorkSearch() {
    const q = useSearchParams().get('q')
    return (
        <div className="stork-wrapper">
            <Script
                src="https://files.stork-search.net/releases/v1.6.0/stork.js"
                onLoad={() => {
                    stork.register("kb", "/kb-index.st")
                }}
            />
            <input type="search" defaultValue={q} data-stork="kb" className="stork-input" placeholder="Search here..." style={{ outline: 'none' }} />
            <div data-stork="kb-output" className="stork-output" />
        </div>
    )
}