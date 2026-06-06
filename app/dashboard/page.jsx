"use client"

import { useState } from "react"
import { Utensils, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { UploadCard } from "@/components/upload-card"
import { IngredientTags } from "@/components/ingredient-tags"
import { RecipeCard } from "@/components/recipe-card"
import { GroceryList } from "@/components/grocery-list"
import { RecipeModal } from "@/components/recipe-modal"
import { AnalyzingLoader, RecipeCardSkeleton, IngredientsSkeleton } from "@/components/loader"
import { allGroceryItems } from "@/lib/mock-data"
import { toast } from "sonner"

export default function DashboardPage() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)

  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData)
    if (!imageData) {
      // Reset state when image is cleared
      setIngredients([])
      setRecipes([])
      setHasAnalyzed(false)
    }
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)
    setHasAnalyzed(false)

    try {
      // Call the analyze-image API
      const analyzeResponse = await fetch("/api/analyze-image", {
  method: "POST",
  headers: { "Content-Type": "application/json" },

  body: JSON.stringify({
    imageBase64: uploadedImage
  })
})

      const analyzeData = await analyzeResponse.json()

      if (analyzeData.success) {
        setIngredients(analyzeData.ingredients)
        toast.success(`Detected ${analyzeData.ingredients.length} ingredients!`)

        // Fetch recipes based on detected ingredients
        setIsLoadingRecipes(true)
        const recipesResponse = await fetch("/api/get-recipes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: analyzeData.ingredients })
        })

        const recipesData = await recipesResponse.json()

        if (recipesData.success) {
          setRecipes(recipesData.recipes)
        }
        setIsLoadingRecipes(false)
      } else {
        toast.error("Failed to analyze image")
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsAnalyzing(false)
      setHasAnalyzed(true)
    }
  }

  const handleUpdateIngredients = (updatedIngredients) => {
    setIngredients(updatedIngredients)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Recipe Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Upload an image of your ingredients to discover delicious recipes
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Upload & Ingredients */}
          <div className="space-y-6 lg:col-span-1">
            <UploadCard
              onImageUpload={handleImageUpload}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
            />

            {isAnalyzing && <IngredientsSkeleton />}

            {!isAnalyzing && ingredients.length > 0 && (
              <IngredientTags
                ingredients={ingredients}
                onUpdate={handleUpdateIngredients}
              />
            )}

            {!isAnalyzing && hasAnalyzed && recipes.length > 0 && (
              <GroceryList
                items={allGroceryItems}
                detectedIngredients={ingredients}
              />
            )}
          </div>

          {/* Right Column - Recipes */}
          <div className="lg:col-span-2">
            {isAnalyzing ? (
              <AnalyzingLoader />
            ) : hasAnalyzed ? (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Utensils className="size-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">
                      Recipe Suggestions
                    </h2>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {recipes.length} recipes found
                  </span>
                </div>

                {isLoadingRecipes ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <RecipeCardSkeleton key={i} />
                    ))}
                  </div>
                ) : recipes.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2">
                    {recipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onViewRecipe={setSelectedRecipe}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState />
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>

      {/* Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        open={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        detectedIngredients={ingredients}
      />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 py-16">
      <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
        <Sparkles className="size-8 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">
        No recipes yet
      </h3>
      <p className="max-w-sm text-center text-sm text-muted-foreground">
        Upload an image of your ingredients and click &quot;Analyze Image&quot; to discover 
        delicious recipes you can make.
      </p>
    </div>
  )
}
