"use client"

import Link from "next/link"
import { Camera, Bot, ChefHat, ShoppingCart, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"

const features = [
  {
    icon: Camera,
    title: "Upload Image",
    description: "Simply snap a photo of your ingredients or upload an existing image from your gallery.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    icon: Bot,
    title: "AI Detection",
    description: "Our AI instantly recognizes and identifies all the ingredients in your photo.",
    gradient: "from-teal-500 to-cyan-500"
  },
  {
    icon: ChefHat,
    title: "Recipe Suggestions",
    description: "Get personalized recipe recommendations based on what you have available.",
    gradient: "from-cyan-500 to-emerald-500"
  },
  {
    icon: ShoppingCart,
    title: "Grocery List",
    description: "Automatically generate a shopping list for any missing ingredients.",
    gradient: "from-emerald-500 to-green-500"
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute right-1/4 top-1/2 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              <span>AI-Powered Recipe Discovery</span>
            </div>
            
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Turn Your Ingredients into{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                Delicious Recipes
              </span>
            </h1>
            
            <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-muted-foreground">
              Snap a photo of your ingredients. Let our AI identify them and suggest 
              mouth-watering recipes you can make right now.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 px-8 shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40">
                  Get Started
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 px-8">
                Learn More
              </Button>
            </div>
          </div>

          {/* Hero Image Preview */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 to-emerald-500/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl">
              <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex items-center justify-center rounded-2xl bg-muted/50 p-8">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-primary/10">
                        <Camera className="size-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Drop your food image here</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {["Tomatoes", "Basil", "Mozzarella", "Olive Oil"].map((item) => (
                        <span 
                          key={item} 
                          className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="h-24 rounded-xl bg-muted/30" />
                    <div className="h-8 w-3/4 rounded-lg bg-muted/30" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border/50 bg-muted/30 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Transform your cooking experience in four simple steps
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group relative overflow-hidden border-0 bg-card shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                      <feature.icon className="size-6 text-white" />
                    </div>
                    <span className="flex size-8 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-primary to-emerald-500 transition-transform duration-300 group-hover:scale-x-100" />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-emerald-600 p-8 sm:p-16">
            <div className="absolute -right-20 -top-20 size-60 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-white/10 blur-3xl" />
            
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
                Ready to Start Cooking?
              </h2>
              <p className="mb-8 text-lg text-white/80">
                Join thousands of home cooks who are discovering new recipes every day with SnapChef AI.
              </p>
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="gap-2 px-8 shadow-lg"
                >
                  Try SnapChef AI Free
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                <ChefHat className="size-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">SnapChef AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SnapChef AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
