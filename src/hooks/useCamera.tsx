import React, { useState, useRef, use, useEffect } from "react";

const UseCamera = () => {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [plantImage, setPlantImage] = useState<string | null>(null);
  const [savedBackgroundImage, setSavedBackgroundImage] = useState<
    string | null
  >(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Capture the image from the camera and display it in the video element on the page
  const captureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error capturing image:", error);
    }
  };

  // Take a picture of the background and save it to the state and local storage as a base64 string
  const takeBackgroundImage = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg");
        setBackgroundImage(imageData);
        localStorage.setItem("backgroundImage", imageData);
      }
    }
  };

  // Get the saved background image from local storage
  const getSavedBackgroundImage = () => {
    setSavedBackgroundImage(localStorage.getItem("backgroundImage"));
  };

  // Take a picture of the plant and save it to the state as a base64 string
  const takePlantImage = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");

      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg");

        setPlantImage(imageData);
      }
    }
  };

  return {
    backgroundImage,
    plantImage,
    savedBackgroundImage,
    videoRef,
    captureImage,
    takeBackgroundImage,
    takePlantImage,
    getSavedBackgroundImage,
  };
};

export default UseCamera;
