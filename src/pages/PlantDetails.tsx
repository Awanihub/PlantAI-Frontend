import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Sun,
  Droplets,
  Thermometer,
  AlertTriangle,
  BookOpen,
  Heart,
} from "lucide-react";
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

const PlantDetails = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const plant: PlantData | undefined = location.state?.plant;

  // If user refreshes or arrives without plant data → redirect
  useEffect(() => {
    if (!plant) navigate("/identify");
  }, [plant, navigate]);

  if (!plant) return null;

  const handleAskPlant = async () => {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://plantai-backend-jumt.onrender.com/api/chat/ask", // ✅ fixed: correct port + route
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plantInfo: {
              plantName: plant?.name,
              scientificName: plant?.scientificName,
              description: plant?.description,
              wateringTips: plant?.watering,
              sunlightRequirements: plant?.sunlight,
              fertilizerSuggestions: plant?.fertilizer,
            },
            question,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setAnswer(data.answer);
      } else {
        console.error("Chat error:", data.message);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleAddToGarden = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch("https://plantai-backend-jumt.onrender.com/api/garden/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        scanId: plant?.scanId,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Plant added to your garden successfully!");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Failed to add plant to garden");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-8">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-md mb-6">
        <div className="container mx-auto">
          <Link
            to="/identify"
            className="inline-flex items-center text-sm mb-4 hover:opacity-80 transition-opacity"
          >
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
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Card>

        {/* Plant Name */}
        <div className="animate-slide-up">
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            {plant.name}
          </h2>
          {plant.scientificName && (
            <p className="text-muted-foreground italic mb-3">
              {plant.scientificName}
            </p>
          )}
        </div>

        {/* Care Requirements */}
        <Card
          className="p-6 border-border animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <h3 className="font-semibold text-lg mb-4 text-card-foreground">
            Care Requirements
          </h3>

          <div className="space-y-4">
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

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Fertilizer</p>
                <p className="text-sm text-muted-foreground">
                  {plant.fertilizer || "Information not available"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Common Problems</p>
                <p className="text-sm text-muted-foreground">
                  {plant.commonProblems || "Information not available"}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Care Instructions */}
        {plant.careInstructions && (
          <Card
            className="p-6 border-border animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <h3 className="font-semibold text-lg mb-3">Care Instructions</h3>
            <p className="text-muted-foreground text-sm">
              {plant.careInstructions}
            </p>
          </Card>
        )}

        {/* Ask Plant AI */}
        <Card
          className="p-6 border-border animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          <h3 className="font-semibold text-lg mb-3">Ask Plant AI</h3>
          <textarea
            placeholder="Ask anything about your plant..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="w-full p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button
            onClick={handleAskPlant}
            disabled={loading}
            className="mt-3 w-full"
          >
            {loading ? "Thinking..." : "Ask"}
          </Button>

          {answer && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">{answer}</p>
            </div>
          )}
        </Card>

        {/* Action Buttons */}
        <div
          className="grid grid-cols-2 gap-4 animate-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          <Button variant="outline" className="w-full h-12 gap-2">
            <BookOpen className="w-4 h-4" />
            Learn More
          </Button>
          <Button className="w-full h-12 gap-2" onClick={handleAddToGarden}>
            <Heart className="w-4 h-4" />
            Add to Garden
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
