from fastapi import FastAPI, HTTPException # type: ignore
from pydantic import BaseModel # type: ignore

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Welcome to the FastAPI application!"}
