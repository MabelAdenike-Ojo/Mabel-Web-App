import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load API key from .env
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

# ⿡ List available models
print("Listing all available models...\n")
models = genai.list_models()
for m in models:
    # Use attributes compatible with latest library versions
    print(getattr(m, "name", "Unknown Name"), "-", getattr(m, "supported_generation_methods", getattr(m, "capabilities", "Unknown")))

# ⿢ Ask user to pick a model
model_name = input("\nEnter the model name you want to use: ")

# ⿣ Create model instance
model = genai.GenerativeModel(model_name=model_name)

# ⿤ Send a test prompt
prompt = "Hello AI, how are you today?"
response = model.generate_content(prompt)

# ⿥ Print the AI response
print("\nAI Response:")
print(response.text)