"use client"

import { useEffect, useRef } from "react"

interface DynamicPlaceholderProps {
  width: number
  height: number
  category?: string
  color?: string
}

export default function DynamicPlaceholder({
  width,
  height,
  category = "Image",
  color = "#1e3a8a",
}: DynamicPlaceholderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = width
    canvas.height = height

    // Draw gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height)
    gradient.addColorStop(0, `${color}33`) // Light version of the color
    gradient.addColorStop(1, `${color}66`) // Darker version of the color
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw pattern
    ctx.strokeStyle = `${color}22`
    ctx.lineWidth = 1
    const patternSize = 20
    for (let i = 0; i < width; i += patternSize) {
      for (let j = 0; j < height; j += patternSize) {
        ctx.strokeRect(i, j, patternSize, patternSize)
      }
    }

    // Draw text
    ctx.fillStyle = color
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(category, width / 2, height / 2 - 10)

    // Draw dimensions
    ctx.font = "12px Arial"
    ctx.fillText(`${width}x${height}`, width / 2, height / 2 + 15)
  }, [width, height, category, color])

  return <canvas ref={canvasRef} width={width} height={height} className="w-full h-auto" />
}
