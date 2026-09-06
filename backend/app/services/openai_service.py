from openai import AsyncOpenAI

from app.core.config import get_settings


settings = get_settings()

client = AsyncOpenAI(
    api_key=settings.openai_api_key
)


async def generate_chat_response(message: str) -> str:
    response = await client.responses.create(
        model="gpt-5-mini",
        instructions=(
            "You are KrishiBondhu.AI, an AI agriculture assistant. "
            "Help farmers with crops, diseases, fertilizer, irrigation, "
            "weather-related agricultural decisions, and general farming questions. "
            "Give practical, clear, and easy-to-understand answers."
        ),
        input=message,
    )

    return response.output_text