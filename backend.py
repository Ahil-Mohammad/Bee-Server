from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import pipeline

# Load your GEMMA model or similar pre-trained model
chat_model = pipeline("conversational", model="microsoft/DialoGPT-medium")

app = FastAPI()

class UserMessage(BaseModel):
    message: str

@app.post("/chat/")
async def chat(user_message: UserMessage):
    try:
        # Generate a response using the model
        user_input = user_message.message
        response = chat_model(user_input)[0]['generated_text']
        return {"response": response}
    except Exception as e:
        return {"error": str(e)}

# To run the server: uvicorn backend:app --reload
