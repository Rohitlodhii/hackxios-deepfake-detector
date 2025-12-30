## System Architecture

### 1. Frontend Layer

- Built using **Next.js (App Router)** and **Tailwind CSS**
- Uses **shadcn/ui** components for a clean and consistent UI
- Allows users to upload a single image (JPG/PNG)
- Sends the image to the backend using a **POST request** in **multipart/form-data**
- Displays prediction results including:
    - Likely Fake / Likely Real label
    - Fake and Real probability scores
    - Disclaimer message

---

### 2. Backend Layer

- Built using a backend API server
- Receives image upload requests from the frontend
- Handles:
    - Image validation and format checking
    - Image preprocessing (resizing, normalization, tensor conversion)
    - Model inference request handling
- Invokes the trained deep learning model for prediction
- Sends a structured JSON response back to the frontend

---

### 3. Machine Learning Model Layer (MesoNet CNN)

- Uses a **MesoNet Convolutional Neural Network**
- Designed specifically for deepfake detection
- Trained on:
    - Real images
    - AI-generated / deepfake images
- Learns to detect mesoscopic features such as:
    - Local texture inconsistencies
    - Compression artifacts
    - Structural irregularities introduced by generative models
- Outputs probability scores indicating how likely the image is fake or real

---

### Data Flow Summary

1. User uploads an image via the frontend
2. Frontend sends the image to the backend API
3. Backend preprocesses the image and passes it to the MesoNet CNN
4. Model generates probability scores
5. Backend returns structured prediction results to the frontend
6. Frontend displays the results to the user