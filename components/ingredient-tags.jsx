"use client"

import { useState } from "react"
import { X, Plus, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function IngredientTags({ ingredients, onUpdate }) {
  const [newIngredient, setNewIngredient] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleRemove = (index) => {
    const updated = ingredients.filter((_, i) => i !== index)
    onUpdate?.(updated)
  }

  const handleAdd = () => {
    if (newIngredient.trim()) {
      onUpdate?.([...ingredients, newIngredient.trim()])
      setNewIngredient("")
      setIsAdding(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd()
    } else if (e.key === "Escape") {
      setIsAdding(false)
      setNewIngredient("")
    }
  }

  if (!ingredients || ingredients.length === 0) {
    return null
  }

  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
            <Check className="size-4 text-primary" />
          </div>
          Detected Ingredients
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient, index) => (
            <Badge
              key={index}
              variant="secondary"
              className={cn(
                "group cursor-pointer gap-1.5 px-3 py-1.5 text-sm transition-all duration-200",
                "hover:bg-destructive/10 hover:text-destructive"
              )}
              onClick={() => handleRemove(index)}
            >
              {ingredient}
              <X className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
            </Badge>
          ))}
          
          {isAdding ? (
            <div className="flex items-center gap-1">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add ingredient..."
                className="h-8 w-32 text-sm"
                autoFocus
              />
              <Button size="icon-sm" variant="ghost" onClick={handleAdd}>
                <Check className="size-4" />
              </Button>
              <Button 
                size="icon-sm" 
                variant="ghost" 
                onClick={() => {
                  setIsAdding(false)
                  setNewIngredient("")
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-full border-dashed"
              onClick={() => setIsAdding(true)}
            >
              <Plus className="size-3" />
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
