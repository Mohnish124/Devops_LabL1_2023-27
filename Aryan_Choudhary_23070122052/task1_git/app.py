import fastapi from FASTAPI

const app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World-main branch modification"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
    