import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Camera, Upload, ArrowLeft, Loader2 } from "lucide-react";

import CameraCapture from "@/components/cameraCapture";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PlantData {
  scanId: string;
  image: string;
  name: string;
  scientificName?: string;
  description?: string;
  watering?: string;
  sunlight?: string;
  fertilizer?: string;
  commonProblems?: string;
  careInstructions?: string;
}

const PlantIdentify: React.FC = () => {
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraCapture = (file: File, preview: string) => {
    setImageBase64(preview);
    identifyPlant(file, preview);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      setImageBase64(base64);

      identifyPlant(file, base64);
    };

    reader.readAsDataURL(file);
  };

  const identifyPlant = async (file: File, previewImage: string) => {
    setIsIdentifying(true);

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("image", file);

      const response = await fetch(
        "https://plantai-backend-jumt.onrender.com/api/plants/identify",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await response.json();

      console.log("Backend Response:", data);

      if (data.success) {
        const plantData: PlantData = {
          scanId: data.scanId,
          image: previewImage,
          name: data.plantName,
          scientificName: data.scientificName,
          description: data.description,
          watering: data.wateringTips,
          sunlight: data.sunlightRequirements,
          fertilizer: data.fertilizerSuggestions,
          commonProblems: data.commonProblems,
          careInstructions: data.careInstructions,
        };

        navigate("/plant-details", {
          state: {
            plant: plantData,
          },
        });
      } else {
        alert(data.message || "Plant identification failed");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to identify plant");
    } finally {
      setIsIdentifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-md">
        <div className="container mx-auto">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Garden
          </Link>

          <h1 className="text-2xl font-bold">Identify Plant</h1>

          <p className="text-primary-foreground/80 text-sm mt-1">
            Take or upload a photo to identify
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Card className="mb-6 p-8 border-border">
          <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
            {isIdentifying ? (
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Identifying your plant...
                </p>
              </div>
            ) : imageBase64 ? (
              <img
                src={imageBase64}
                alt="Plant Preview"
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Camera preview will appear here
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setShowCamera(true)}
              disabled={isIdentifying}
              className="h-14 gap-2"
            >
              <Camera className="w-5 h-5" />
              Take Photo
            </Button>

            <Button
              onClick={handleUploadClick}
              disabled={isIdentifying}
              variant="outline"
              className="h-14 gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
          </div>
        </Card>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
          <h3 className="font-semibold mb-3 text-card-foreground">
            Tips for Best Results
          </h3>

          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Ensure good lighting for clear photos</li>
            <li>• Capture the whole plant including leaves and flowers</li>
            <li>• Hold camera steady and focus on the plant</li>
            <li>• Get close enough to see plant details clearly</li>
          </ul>
        </Card>
      </div>

      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-2xl px-4">
            <CameraCapture
              onCapture={(file, preview) => {
                handleCameraCapture(file, preview);
                setShowCamera(false);
              }}
            />

            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={() => setShowCamera(false)}
            >
              Close Camera
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantIdentify;
