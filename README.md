
# 🕵️‍♂️ Deepfake Image Detector

A deepfake image detection system that analyzes facial images and provides a **probabilistic authenticity score** based on learned visual patterns.
The project focuses on identifying **AI-generated (GAN-based) image artifacts** rather than recognizing identities.

---

## 📌 Overview

With the rapid advancement of generative AI models, especially **GANs (Generative Adversarial Networks)**, AI-generated images are becoming increasingly realistic and difficult to distinguish from real photographs. This project explores how **computer vision models** can detect subtle inconsistencies introduced during the image generation process.

Instead of claiming absolute correctness, this system is designed as a **defensive, explainable tool** that supports human judgment.

---

## 🧠 How It Works

1. **Input**: A facial image uploaded via the frontend UI
2. **Processing**:

   * Image is resized and converted into a tensor
   * Passed through a CNN-based deepfake detection model
3. **Model Output**:

   * Probability of the image being *real*
   * Probability of the image being *AI-generated*
4. **Result**:

   * A human-readable label (`Likely Real`, `Likely Fake`, or confidence-based interpretation)

The model focuses on **mid-level texture patterns** such as:

* Unnatural smoothing
* Blending artifacts
* GAN-specific statistical inconsistencies

---

## 🧬 What Are GAN-Generated Images?

GANs (Generative Adversarial Networks) consist of two neural networks:

* **Generator** – creates synthetic images
* **Discriminator** – tries to detect whether images are real or fake

Through continuous competition, GANs can produce highly realistic images. However, even advanced models may leave behind **subtle visual or statistical artifacts**, which detection systems attempt to learn.

---

## ⚠️ Important Limitations

> **Deepfake detection is an open research problem.**

* The model performs well on images similar to its training data
* Performance may degrade on **unseen or newer AI generation methods**
* Outputs are **probabilistic**, not definitive proof
* Results should be interpreted cautiously and ethically

This tool is meant to **assist analysis**, not replace human decision-making.

---

## 🛠️ Tech Stack

### Backend

* Python
* FastAPI
* PyTorch
* Uvicorn
* Systemd (for production service)

### Frontend

* Next.js
* TypeScript
* Tailwind CSS

### Deployment

* Backend: AWS EC2
* Frontend: Vercel
* Secure API access via server-side proxy

---

## 📂 Project Structure

```
deepfake-image-detector/
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── requirements.txt
│   └── (model weights excluded from repo)
├── frontend/
│   └── Next.js application
└── README.md
```

> 🔒 Model weights (`.pth`) are intentionally excluded from version control.

---

## 🚀 Running Locally (Backend)

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload
```

Then open:

```
http://localhost:8000/docs
```

---

## 🌍 Live Demo

Frontend:

```
https://deepfakeimage-detector.vercel.app
```

---

## 📖 Disclaimer

This system provides a probabilistic indication of image authenticity based on learned visual patterns. It may not detect all deepfakes, especially those generated using unseen or highly advanced techniques. The output should be used as a supportive signal and not as definitive proof.

---

## 📬 Feedback & Discussion

This project is part of an ongoing exploration into **AI authenticity, trust, and responsible deployment of detection systems**.
Feedback, suggestions, and discussions are welcome.

---

## 📎 License

This project is intended for **educational and research purposes**.

---


