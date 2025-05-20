"use client"

import { useEffect, useRef } from "react"

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  bgColor?: string
  textColor?: string
}

export default function PlaceholderImage({
  width,
  height,
  text = "Image Placeholder",
  bgColor = "#f0f0f0",
  textColor = "#333333",
}: PlaceholderImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Draw background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    // Draw border
    ctx.strokeStyle = "#cccccc"
    ctx.lineWidth = 2
    ctx.strokeRect(1, 1, width - 2, height - 2)

    // Draw text
    ctx.fillStyle = textColor
    ctx.font = "bold 14px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text, width / 2, height / 2)

    // Draw dimensions
    ctx.font = "12px Arial"
    ctx.fillText(`${width}x${height}`, width / 2, height / 2 + 20)
  }, [width, height, text, bgColor, textColor])

  return <canvas ref={canvasRef} width={width} height={height} className="w-full h-auto" />
}
