from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
from torchvision import transforms
from model import Meso4
import io

app = FastAPI(title="Deepfake Image Detector")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Choose device
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load model
model = Meso4().to(device)
model.load_state_dict(torch.load("mesonet.pth", map_location=device))
model.eval()

# Image preprocessing (same as training)
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
])

@app.get("/")
def root():
    return {"status": "Deepfake Detector API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    img_tensor = transform(image).unsqueeze(0).to(device)

    with torch.no_grad():
        real_prob = model(img_tensor).item()
        fake_prob = 1 - real_prob

    return {
        "fake_probability": round(fake_prob, 3),
        "real_probability": round(real_prob, 3),
        "label": "Likely Fake" if fake_prob > 0.5 else "Likely Real",
        "disclaimer": "This result is probabilistic and not definitive proof."
    }

