// import { NextResponse } from "next/server"
// import { mockIngredients } from "@/lib/mock-data"


// export async function POST(request) {
//   // Simulate AI processing delay
//   await new Promise(resolve => setTimeout(resolve, 2000))

//   try {
//     // In a real implementation, you would:
//     // 1. Parse the image from the request
//     // 2. Send to a vision AI model (e.g., OpenAI GPT-4 Vision, Google Vision API)
//     // 3. Extract detected ingredients from the response

//     // For now, we return mock data
//     const detectedIngredients = mockIngredients

//     return NextResponse.json({
//       success: true,
//       ingredients: detectedIngredients,
//       confidence: 0.92,
//       message: "Successfully analyzed image"
//     })
//   } catch (error) {
//     return NextResponse.json(
//       { success: false, error: "Failed to analyze image" },
//       { status: 500 }
//     )
//   }
// }


import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(request) {
  try {
    const body = await request.json();

    const imageBase64 = body.imageBase64;

    if (!imageBase64) {
      return NextResponse.json(
        {
          success: false,
          error: "No image provided",
        },
        { status: 400 }
      );
    }

    const prompt = `
    Identify all food ingredients in this fridge image.

    Return ONLY valid JSON:

    {
      "ingredients": [],
      "healthy_score": 0,
      "suggested_recipe": "",
      "missing_items": []
    }
    `;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBase64.split(",")[1],
          mimeType: "image/jpeg",
        },
      },
    ]);

    const response = await result.response;

    const text = response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return NextResponse.json({
      success: true,
      data: JSON.parse(text),
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}