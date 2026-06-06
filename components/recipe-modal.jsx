"use client"

import { Clock, ChefHat, Users, X, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

export function RecipeModal({ recipe, open, onClose, detectedIngredients = [] }) {
  if (!recipe) return null

  const isMissing = (ingredient) => {
    return !detectedIngredients.some(
      detected => ingredient.toLowerCase().includes(detected.toLowerCase())
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-hidden p-0">
        <div className="relative h-56 w-full">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white">
                {recipe.title}
              </DialogTitle>
            </DialogHeader>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-1.5">
                <Clock className="size-4" />
                <span className="text-sm">{recipe.cookTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="size-4" />
                <span className="text-sm">{recipe.servings} servings</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                {recipe.difficulty}
              </Badge>
            </div>
          </div>
        </div>

        <ScrollArea className="max-h-[calc(90vh-14rem)]">
          <div className="p-6">
            <p className="text-muted-foreground">{recipe.description}</p>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <ChefHat className="size-5 text-primary" />
                Ingredients
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {recipe.ingredients?.map((ingredient, index) => (
                  <li
                    key={index}
                    className={cn(
                      "flex items-center gap-2 rounded-lg p-2 transition-colors",
                      isMissing(ingredient) 
                        ? "bg-amber-50 dark:bg-amber-900/20" 
                        : "bg-muted/50"
                    )}
                  >
                    <span className={cn(
                      "size-2 rounded-full",
                      isMissing(ingredient) 
                        ? "bg-amber-500" 
                        : "bg-primary"
                    )} />
                    <span className={cn(
                      "text-sm",
                      isMissing(ingredient) && "text-amber-800 dark:text-amber-200"
                    )}>
                      {ingredient}
                    </span>
                    {isMissing(ingredient) && (
                      <AlertCircle className="ml-auto size-4 text-amber-500" />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-6" />

            <div>
              <h3 className="mb-4 text-lg font-semibold">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions?.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <p className="pt-1 text-sm text-muted-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
