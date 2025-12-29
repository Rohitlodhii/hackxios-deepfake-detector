# Planning for the project

### Overall Idea through problem statement 

We need to make a model which analyzes images or videos and shows a probability or some measure of there authenticity.
Some sort of model which can predict if the image or video is deepfake or not.


### Current Scope

Currently , we decided to focus only on image based deepfake detection model , not going for video or audio detection because 

- this would reduce complexity and we can focus on one aspect for now
- training data would be available for deepfake images which would save us some time 
- Training a model on video or audio dataset would take a lot of time considering our specs.


We are considering a probabilistic ( 0-1 range ) output instead of binary classification ( like True or False ) to avoid overclaiming accuracy

Limited the scope to facial images to reduce variance and simplify model learning 


### Stack / Dataset / Deployment 

We will be using "deepfake-and-real-images" dataset from kaggle which contains about 190k image files which would be sufficient for it ..

Planning to use meso-net style CNN model

For creating apis , will be using fastapi backend 
For Frontend we will be using nextjs with shadcn 

**Frontend part can be vibe coded by kiro** , would contain a image upload thing + simple form , basic nav and all 


For deployment , we would deploy the backend to AWS EC2 , the frontend to vercel ig.. , 
++ saw **kiro powers** thing for deployment , eager to try that too.


### Overall flow

- First training a model on the dataset 
- Would work on the frontend inbetween 
- after training test the model , create apis
- connecting to frontend 
- deployment 
- making demo videos, blogs and other non-tech things..