import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  // Get width and height from query parameters
  const searchParams = request.nextUrl.searchParams
  const width = Number.parseInt(searchParams.get("width") || "400", 10)
  const height = Number.parseInt(searchParams.get("height") || "300", 10)
  const text = searchParams.get("text") || "Placeholder"
  const bgColor = searchParams.get("bg") || "#f0f0f0"
  const textColor = searchParams.get("color") || "#333333"

  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${bgColor}"/>
      <rect width="100%" height="100%" fill="none" stroke="#cccccc" stroke-width="2" x="1" y="1" width="${
        width - 2
      }" height="${height - 2}"/>
      <text x="50%" y="50%" font-family="Arial" font-size="14" font-weight="bold" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>
      <text x="50%" y="${
        height / 2 + 20
      }" font-family="Arial" font-size="12" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${width}x${height}</text>
    </svg>
  `

  // Return SVG as response
  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
