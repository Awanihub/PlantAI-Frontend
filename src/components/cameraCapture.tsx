import { useEffect, useRef, useState } from "react";
import { Camera, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CameraCaptureProps {
  onCapture: (file: File, preview: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setCameraOpen(true);
      setCaptured(false);
      setError("");
    } catch (err) {
      console.error(err);

      setError(
        "Unable to access camera. Please allow camera permission."
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current
        .getTracks()
        .forEach((track) => track.stop());

      streamRef.current = null;
    }

    setCameraOpen(false);
  };

  const capturePhoto = async () => {
  if (!videoRef.current || !canvasRef.current) return;

  const video = videoRef.current;
  const canvas = canvasRef.current;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(video, 0, 0);

  const base64 = canvas.toDataURL("image/jpeg");

  setPreview(base64);
  setCaptured(true);

  stopCamera();

  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), "image/jpeg", 0.95);
  });

  const file = new File([blob], "plant.jpg", {
    type: "image/jpeg",
  });

  onCapture(file, base64);
};

const retakePhoto = () => {
  setCaptured(false);
  setPreview("");
  startCamera();
};
  useEffect(() => {
  return () => {
    stopCamera();
  };
}, []);

return (
  <Card className="p-6 border-border">
    <div className="aspect-square bg-muted rounded-2xl overflow-hidden flex items-center justify-center">

      {!cameraOpen && !captured && (
        <div className="text-center">
          <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />

          <Button onClick={startCamera}>
            Open Camera
          </Button>

          {error && (
            <p className="text-red-500 text-sm mt-4">
              {error}
            </p>
          )}
        </div>
      )}

      {cameraOpen && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      )}

      {captured && (
        <img
          src={preview}
          alt="Captured"
          className="w-full h-full object-cover"
        />
      )}

      <canvas
        ref={canvasRef}
        className="hidden"
      />
    </div>

    <div className="flex gap-3 mt-5">

      {cameraOpen && (
        <Button
          className="flex-1"
          onClick={capturePhoto}
        >
          <Check className="w-4 h-4 mr-2" />
          Capture
        </Button>
      )}

      {captured && (
        <Button
          variant="outline"
          className="flex-1"
          onClick={retakePhoto}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Retake
        </Button>
      )}

    </div>
  </Card>
  );
};

export default CameraCapture;