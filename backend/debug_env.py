import os

# Test environment variables
print("Testing environment variables in Vercel:")

required_vars = [
    "GEMINI_API_KEY",
    "OPENAI_BASE_URL", 
    "MODEL_NAME",
    "TEMPERATURE",
    "MAX_TOKENS",
    "REQUESTS_PER_MINUTE",
    "TOKENS_PER_MINUTE"
]

for var in required_vars:
    value = os.getenv(var, "NOT SET")
    print(f"{var}: {'SET' if value != 'NOT SET' and value != '' else 'NOT SET'}")

print("\nDebug complete.")