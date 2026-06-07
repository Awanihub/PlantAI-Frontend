import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Camera, Upload, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PlantAPIResponse {
  suggestions?: Array<any>;
  is_plant?: boolean;
  // extend as needed
}

interface PlantData {
  image: string;          // base64 image
  name: string;
  probability: number;
  scientificName?: string;
  description?: string;
  commonNames?: string[];
  taxonomy?: string[];
  watering?: string;
  sunlight?: string;
  temperature?: string;
  soil?: string;
}

const PlantIdentify: React.FC = () => {
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  // Open file picker
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImageBase64(base64);
      identifyPlant(base64); // call API
    };
    reader.readAsDataURL(file);
  };

  // Call PlantID API
  const identifyPlant = async (base64: string) => {
    setIsIdentifying(true);
    try {
      const payload = {
        api_key: "DUpkWYSePUZX9OqqKqwOgjb39ZUmvZRRiKeBYxtz1lJ4WD9r5o", // replace with your key
        images: [base64],
        modifiers: ["similar_images"],
        plant_language: "en",
        plant_details: ["common_names", "wiki_description", "taxonomy"]
      };

      const res = await fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data: PlantAPIResponse = await res.json();

      if (data.suggestions && data.suggestions.length > 0) {
        const topPlant = data.suggestions[0];
        const plantData: PlantData = {
          image: base64,
          name: topPlant.plant_name,
          probability: topPlant.probability,
          scientificName: topPlant.plant_details?.scientific_name,
          description: topPlant.plant_details?.wiki_description?.value,
          commonNames: topPlant.plant_details?.common_names,
          taxonomy: topPlant.plant_details?.taxonomy,
          // Optional: add care info if available
        };

        // Navigate to PlantDetails page with plantData
        navigate("/plant-details", { state: { plant: plantData } });
      } else {
        alert("No plant identified. Try again with a clearer image.");
      }

    } catch (err) {
      console.error("Error identifying plant:", err);
      alert("Failed to identify plant. Please try again.");
    }
    setIsIdentifying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">

      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-md">
        <div className="container mx-auto">
          <Link to="/dashboard" className="inline-flex items-center text-sm mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Garden
          </Link>
          <h1 className="text-2xl font-bold">Identify Plant</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">Take or upload a photo to identify</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">

        {/* Camera / Upload Preview */}
        <Card className="mb-6 p-8 border-border animate-fade-in">
          <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden">
            {isIdentifying ? (
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Identifying your plant...</p>
              </div>
            ) : imageBase64 ? (
              <img src={imageBase64} alt="Uploaded Plant" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center p-8">
                <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Camera preview will appear here</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              //onClick={handleIdentify} // implement camera functionality if needed
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

            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border animate-slide-up">
          <h3 className="font-semibold mb-3 text-card-foreground">Tips for Best Results</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Ensure good lighting for clear photos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Capture the whole plant including leaves and flowers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Hold camera steady and focus on the plant</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Get close enough to see plant details clearly</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default PlantIdentify;
