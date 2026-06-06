"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function RecipeCardSkeleton() {
  return (
    <Card className="overflow-hidden border-0 bg-card shadow-lg">
      <Skeleton className="h-48 w-full rounded-none" />
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-4 h-4 w-3/4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}

export function IngredientsSkeleton() {
  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-40" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function AnalyzingLoader() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative">
        <div className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
        <div className="relative flex size-20 items-center justify-center rounded-full bg-primary/10">
          <div className="size-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground">Analyzing your image...</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Our AI is detecting ingredients and finding recipes
        </p>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="size-2 animate-bounce rounded-full bg-primary"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  )
}
