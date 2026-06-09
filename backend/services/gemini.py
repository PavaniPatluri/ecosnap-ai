import os
import json
from google import genai
from google.genai import types

def analyze_image(image_bytes: bytes, mime_type: str) -> dict:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        # Mock response for development if no key is provided
        return {
            "object_name": "Generic Plastic Bottle",
            "carbon_footprint": 0.08,
            "water_footprint": 3.0,
            "energy_consumption": 0.1,
            "eco_score": 45,
            "explanation": "Plastic bottles take hundreds of years to decompose and contribute to microplastic pollution.",
            "sustainable_alternatives": "Reusable stainless steel or glass water bottles.",
            "estimated_savings": "Switching to a reusable bottle saves approx 167 bottles per year and reduces carbon footprint by 13kg CO2."
        }
        
    client = genai.Client(api_key=api_key)
    
    prompt = """
    You are an environmental expert AI. Analyze the image provided.
    Identify the main object in the image (product, food, vehicle, etc.).
    Calculate or estimate its environmental impact.
    Return ONLY a raw JSON object (no markdown formatting, no comments) with the following keys exactly:
    - "object_name": string (name of the object)
    - "carbon_footprint": float (estimated kg CO2 emissions)
    - "water_footprint": float (estimated liters of water used)
    - "energy_consumption": float (estimated kWh of energy used)
    - "eco_score": integer (0-100, where 100 is highly sustainable and 0 is extremely harmful)
    - "explanation": string (brief explanation of its environmental impact)
    - "sustainable_alternatives": string (better alternatives)
    - "estimated_savings": string (what would be saved if the alternative is chosen)
    """
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            prompt,
            types.Part.from_bytes(data=image_bytes, mime_type=mime_type)
        ]
    )
    
    try:
        # The response text should be JSON
        text = response.text.strip()
        if text.startswith("```json"):
            text = text[7:-3].strip()
        elif text.startswith("```"):
            text = text[3:-3].strip()
            
        result = json.loads(text)
        return result
    except Exception as e:
        print(f"Error parsing Gemini response: {e}")
        # Return fallback on error
        return {
            "object_name": "Unknown Object",
            "carbon_footprint": 0.0,
            "water_footprint": 0.0,
            "energy_consumption": 0.0,
            "eco_score": 50,
            "explanation": "Could not analyze object.",
            "sustainable_alternatives": "N/A",
            "estimated_savings": "N/A"
        }
