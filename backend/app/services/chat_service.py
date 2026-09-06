from app.services.openai_service import generate_chat_response


async def chat_with_ai(message: str) -> str:
    return await generate_chat_response(message)