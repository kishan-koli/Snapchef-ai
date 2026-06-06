"use client"

import { useState } from "react"
import { ShoppingCart, Copy, Check, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

export function GroceryList({ items, detectedIngredients = [] }) {
  const [checkedItems, setCheckedItems] = useState([])
  const [copied, setCopied] = useState(false)

  const missingItems = items?.filter(
    item => !detectedIngredients.some(
      ing => ing.toLowerCase() === item.toLowerCase()
    )
  ) || []

  const toggleItem = (item) => {
    setCheckedItems(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    )
  }

  const copyToClipboard = async () => {
    const text = missingItems
      .map(item => `${checkedItems.includes(item) ? "✓" : "○"} ${item}`)
      .join("\n")
    
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast.success("Grocery list copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  if (missingItems.length === 0) {
    return null
  }

  return (
    <Card className="border-0 bg-card shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingCart className="size-4 text-primary" />
            </div>
            Missing Ingredients
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={copyToClipboard}
          >
            {copied ? (
              <>
                <Check className="size-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy List
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/20 dark:text-amber-200">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <p>These ingredients are needed for the selected recipes but weren&apos;t detected in your image.</p>
        </div>
        <ul className="space-y-2">
          {missingItems.map((item, index) => (
            <li
              key={index}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-lg p-3 transition-all duration-200",
                "hover:bg-muted/50",
                checkedItems.includes(item) && "bg-muted/30"
              )}
              onClick={() => toggleItem(item)}
            >
              <Checkbox
                checked={checkedItems.includes(item)}
                onCheckedChange={() => toggleItem(item)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className={cn(
                "transition-all duration-200",
                checkedItems.includes(item) && "text-muted-foreground line-through"
              )}>
                {item}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>{checkedItems.length} of {missingItems.length} items checked</span>
          {checkedItems.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCheckedItems([])}
            >
              Clear all
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
