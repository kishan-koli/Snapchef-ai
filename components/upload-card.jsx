"use client"

import { useState, useCallback } from "react"
import { Upload, ImageIcon, X, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function UploadCard({ onImageUpload, onAnalyze, isAnalyzing }) {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (file.type.startsWith("image/")) {
      setFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target.result)
        onImageUpload?.(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const clearImage = () => {
    setPreview(null)
    setFile(null)
    onImageUpload?.(null)
  }

  return (
    <Card className="overflow-hidden border-2 border-dashed border-border transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
      <CardContent className="p-0">
        {!preview ? (
          <div
            className={cn(
              "relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 p-8 transition-all duration-300",
              dragActive && "bg-primary/5"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="absolute inset-0 z-10 cursor-pointer opacity-0"
              accept="image/*"
              onChange={handleChange}
            />
            <div className={cn(
              "flex size-20 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300",
              dragActive && "scale-110 bg-primary/20"
            )}>
              <Upload className="size-10 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                Drag & drop your food image
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                or click to browse from your device
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ImageIcon className="size-4" />
              <span>Supports JPG, PNG, WebP</span>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={preview}
              alt="Food preview"
              className="h-[300px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-3 top-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={clearImage}
            >
              <X className="size-4" />
            </Button>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <Button
                className="w-full gap-2 shadow-lg"
                size="lg"
                onClick={() => onAnalyze?.(file)}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Analyze Image
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
