// import { NextResponse } from "next/server"
// import { mockRecipes } from "@/lib/mock-data"

// export async function POST(request) {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 1000))

//   try {
//     const { ingredients } = await request.json()

//     // In a real implementation, you would:
//     // 1. Query a recipe database or AI model with the ingredients
//     // 2. Score recipes based on ingredient matches
//     // 3. Return sorted results with match percentages

//     // For now, filter mock recipes based on some ingredient overlap
//     const filteredRecipes = mockRecipes.filter(recipe => {
//       const recipeIngredients = recipe.ingredients.map(i => i.toLowerCase())
//       const userIngredients = ingredients.map(i => i.toLowerCase())
      
//       // Check if any user ingredient is mentioned in recipe ingredients
//       return userIngredients.some(userIng => 
//         recipeIngredients.some(recipeIng => 
//           recipeIng.includes(userIng) || userIng.includes(recipeIng)
//         )
//       )
//     })

//     return NextResponse.json({
//       success: true,
//       recipes: filteredRecipes.length > 0 ? filteredRecipes : mockRecipes.slice(0, 4),
//       total: filteredRecipes.length || 4
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch recipes" },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from "next/server";
import genAI from "@/lib/gemini";

export async function POST(request) {
  try {
    const body = await request.json();

    const ingredients = body.ingredients;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(`
      Suggest 3 recipes using these ingredients:
      ${ingredients.join(", ")}

      Return:
      - recipe title
      - ingredients
      - cooking steps
      - cooking time
    `);

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      success: true,
      recipes: text,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}