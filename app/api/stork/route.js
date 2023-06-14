import { getAuth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { getAllPublicPages } from "@/api/cms"
import { baseUrl } from "@/api/metadata"

export async function GET(req, res) {
  const { userId } = getAuth(req)
  if (!userId) {
    return res.status(403).json({ error: "Unauthorized access" })
  }

  const storkConfig = {
    input: {
      base_directory: process.env.WWW_KB_DIR,
      url_prefix: `${baseUrl}/kb`,
      frontmatter_handling: "Omit",
      files: (await getAllPublicPages()).map(({ filePath, title, slug }) => ({
        path: filePath,
        title,
        url: slug,
        filetype: "Markdown",
      })),
    },
  }

  return NextResponse.json(storkConfig)
}
