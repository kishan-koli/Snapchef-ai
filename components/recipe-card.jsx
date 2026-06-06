"use client"

import { Clock, ChefHat, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const difficultyColors = {
  Easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
}

export function RecipeCard({ recipe, onViewRecipe }) {
  return (
    <Card className="group overflow-hidden border-0 bg-card shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <Badge 
          className={cn(
            "absolute right-3 top-3 border-0 font-medium",
            difficultyColors[recipe.difficulty] || difficultyColors.Easy
          )}
        >
          {recipe.difficulty}
        </Badge>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="line-clamp-2 text-lg font-semibold text-white">
            {recipe.title}
          </h3>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span>{recipe.cookTime}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ChefHat className="size-4" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
          {recipe.description}
        </p>
        <Button 
          className="w-full gap-2 transition-all duration-300 group-hover:gap-3"
          onClick={() => onViewRecipe?.(recipe)}
        >
          View Recipe
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  )
}
