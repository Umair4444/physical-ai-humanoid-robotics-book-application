from src.config.settings import settings

print('Gemini API Key loaded:', settings.gemini_api_key is not None and len(settings.gemini_api_key) > 0)
print('OpenAI API Key loaded:', settings.openai_api_key is not None and len(settings.openai_api_key) > 0)
print('Default model:', settings.default_model)
print('All settings loaded successfully')