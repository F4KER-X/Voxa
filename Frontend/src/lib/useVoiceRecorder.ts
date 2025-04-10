import { useState, useRef } from 'react';

export interface Recording {
  id: string;
  blob: Blob;
  url: string;
  timestamp: number;
}

export const useVoiceRecorder = (username: string) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const uploadRecording = async (blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("username", username);

      const res = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("✅ Uploaded to:", data.url);
    } catch (error) {
      console.error("❌ Upload failed:", error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const newRecording: Recording = {
          id: Date.now().toString(),
          blob,
          url,
          timestamp: Date.now(),
        };

        // Save locally in state
        setRecordings(prev => [...prev, newRecording]);

        // Upload to server
        await uploadRecording(blob);

        chunks.current = [];
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  return {
    isRecording,
    recordings,
    startRecording,
    stopRecording,
  };
};
