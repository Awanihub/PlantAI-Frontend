import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Sun, Droplets, Thermometer, Info, BookOpen, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

interface PlantData {
  image: string; // Base64 image
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

const PlantDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Getting data that was passed from Identify Page
  const plant: PlantData | undefined = location.state?.plant;

  // If user refreshes this page or comes without selecting a plant → redirect
  useEffect(() => {
    if (!plant) navigate("/identify");
  }, [plant, navigate]);

  if (!plant) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-8">

      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-md mb-6">
        <div className="container mx-auto">
          <Link to="/identify" className="inline-flex items-center text-sm mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Identify
          </Link>
          <h1 className="text-2xl font-bold">Plant Details</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 space-y-6">

        {/* Plant Image */}
        <Card className="overflow-hidden border-border animate-fade-in">
          <div className="aspect-video bg-black flex items-center justify-center">
            <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
          </div>
        </Card>

        {/* Plant Name & Probabilities */}
        <div className="animate-slide-up">
          <h2 className="text-3xl font-bold mb-2 text-foreground">{plant.name}</h2>

          {plant.scientificName && (
            <p className="text-muted-foreground italic mb-3">
              {plant.scientificName}
            </p>
          )}

          <Badge variant="secondary">
            Confidence: {(plant.probability * 100).toFixed(1)}%
          </Badge>

          <div className="flex flex-wrap gap-2 mt-3">
            {plant.commonNames?.map((n, i) => (
              <Badge key={i} variant="secondary">{n}</Badge>
            ))}
          </div>
        </div>

        {/* Care Requirements */}
        <Card className="p-6 border-border animate-fade-in" style={{ animationDelay: "100ms" }}>
          <h3 className="font-semibold text-lg mb-4 text-card-foreground">Care Requirements</h3>

          <div className="space-y-4">

            {/* Sunlight */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Sun className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Sunlight</p>
                <p className="text-sm text-muted-foreground">
                  {plant.sunlight || "Information not available"}
                </p>
              </div>
            </div>

            {/* Water */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Watering</p>
                <p className="text-sm text-muted-foreground">
                  {plant.watering || "Information not available"}
                </p>
              </div>
            </div>

            {/* Temp */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Temperature</p>
                <p className="text-sm text-muted-foreground">
                  {plant.temperature || "Information not available"}
                </p>
              </div>
            </div>

            {/* Soil */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Info className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Soil Type</p>
                <p className="text-sm text-muted-foreground">
                  {plant.soil || "Information not available"}
                </p>
              </div>
            </div>

          </div>
        </Card>

        {/* Description */}
        {plant.description && (
          <Card className="p-6 border-border animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h3 className="font-semibold text-lg mb-3">About this Plant</h3>
            <p className="text-muted-foreground text-sm">{plant.description}</p>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 animate-slide-up" style={{ animationDelay: "300ms" }}>
          <Button variant="outline" className="w-full h-12 gap-2">
            <BookOpen className="w-4 h-4" />
            Learn More
          </Button>

          <Button className="w-full h-12 gap-2">
            <Heart className="w-4 h-4" />
            Add to Garden
          </Button>
        </div>

      </div>
    </div>
  );
};

export default PlantDetails;
