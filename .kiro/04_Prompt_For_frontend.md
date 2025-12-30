
You are a professional Frontend Developer.
Your task is to build a simple and clean frontend UI for a Deepfake Image Detection website.
Project context:
 A Next.js 16 project using the App Router is already initialized. On the /frontend folder
 Tailwind CSS is already configured.
 shadcn/ui components are already installed and located in components/ui at the project root (fronted folder root ) 
 Work only inside the existing frontend folder.
 Do not reinstall Tailwind or shadcn.
UI requirements:
Navbar
 Create a responsive navbar.
 On the left side, add a GitHub button.
 On the right side, add the title text: “Deepfake Detector”.
 Use shadcn/ui components wherever appropriate.


Image upload section
 Below the navbar, create a centered image upload section.
 Add a file input that allows uploading only one image.
 Accepted formats are jpg, jpeg, and png.
 Add a Submit or Predict button.
 Use shadcn components such as Button, Input, Card, etc.
 Disable the submit button when no file is selected.
 Prevent multiple file uploads.


Backend integration:
-  The backend base URL is provided using the environment variable NEXT_PUBLIC_BACKEND_ID.
-  Send a POST request to the /predict endpoint.
-  Send the image as multipart/form-data.
Backend response format:
-  The backend returns an object containing:
{  fake_probability (number),
 real_probability (number),
 label (either “Likely Fake” or “Likely Real”),
 and a disclaimer message saying that the result is probabilistic.} 
Frontend behavior:
 After receiving the response, display:
 The prediction label,
 The fake probability,
 The real probability,
 and the disclaimer text.
 Show a loading state while the prediction request is in progress.
 Handle API errors gracefully with a user-friendly message.
Technical constraints:
 Use Next.js App Router conventions.
 Use client components where required.
 Use the fetch API for network requests.
 Keep the UI minimal and clean.
 No authentication is required.
Expected result:
 A working frontend that allows a user to upload an image, send it to the backend, and display the prediction results dynamically.
 The code should be clean, readable, and production-friendly.
