import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Upload, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HealthIssue {
  title: string;
  description: string;
  recommendation?: string;
  status: "good" | "issue";
}

interface HealthResult {
  overallHealth: string;
  issues: HealthIssue[];
}

const HealthCheck = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [healthResult, setHealthResult] = useState<HealthResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      callHealthAPI(base64);
    };
    reader.readAsDataURL(file);
  };

  // Call Plant.id Health Assessment API
  const callHealthAPI = async (base64: string) => {
    setIsAnalyzing(true);
    setShowResults(false);

    try {
      const payload = {
        api_key: "DUpkWYSePUZX9OqqKqwOgjb39ZUmvZRRiKeBYxtz1lJ4WD9r5o", // replace with your API key
        images: [base64.split(",")[1]],
        modifiers: ["similar_images"],
        plant_language: "en",
        diseases: true
      };

      const res = await fetch("https://api.plant.id/v2/health_assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API request failed");

      const data = await res.json();

      const result: HealthResult = {
        overallHealth: data.health_assessment?.is_healthy ? "Good" : "Poor",
        issues: data.health_assessment?.diseases?.map((d: any) => ({
          title: d.name,
          description: d.description,
          recommendation: d.recommendation,
          status: d.is_problem ? "issue" : "good",
        })) || [],
      };

      setHealthResult(result);
      setShowResults(true);
    } catch (err) {
      console.error("Health Check API error:", err);
      alert("Failed to analyze plant health. Try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-8">
      {/* Header */}
      <header className="bg-accent text-accent-foreground p-6 rounded-b-3xl shadow-md mb-6">
        <div className="container mx-auto">
          <Link to="/dashboard" className="inline-flex items-center text-sm mb-4 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Garden
          </Link>
          <h1 className="text-2xl font-bold">Plant Health Check</h1>
          <p className="text-accent-foreground/80 text-sm mt-1">AI-powered health diagnosis</p>
        </div>
      </header>

      <div className="container mx-auto px-4 space-y-6">
        {/* Camera/Upload Section */}
        {!showResults && (
          <Card className="p-8 border-border animate-fade-in">
            <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
              {isAnalyzing ? (
                <div className="text-center">
                  <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
                  <p className="text-muted-foreground">Analyzing plant health...</p>
                </div>
              ) : imageBase64 ? (
                <img src={imageBase64} alt="Plant" className="w-full h-full object-cover rounded-2xl" />
              ) : (
                <div className="text-center p-8">
                  <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Upload a photo of your plant</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleUploadClick} disabled={isAnalyzing} className="h-14 gap-2">
                <Camera className="w-5 h-5" />
                Take Photo
              </Button>
              <Button onClick={handleUploadClick} disabled={isAnalyzing} variant="outline" className="h-14 gap-2">
                <Upload className="w-5 h-5" />
                Upload
              </Button>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </Card>
        )}

        {/* Results Section */}
        {showResults && healthResult && (
          <div className="space-y-4 animate-fade-in">
            {/* Overall Health */}
            <Card className="p-6 border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-card-foreground">
                    Overall Health: {healthResult.overallHealth}
                  </h3>
                </div>
              </div>
            </Card>

            {/* Issues Detected */}
            <Card className="p-6 border-border">
              <h3 className="font-semibold text-lg mb-4 text-card-foreground">Issues Detected</h3>
              <div className="space-y-4">
                {healthResult.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-4 rounded-lg ${
                      issue.status === "good" ? "bg-muted" : "bg-accent/10"
                    }`}
                  >
                    {issue.status === "good" ? (
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-card-foreground">{issue.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{issue.description}</p>
                      {issue.recommendation && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <p className="text-sm font-medium mb-1 text-card-foreground">Recommendation:</p>
                          <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Button onClick={() => setShowResults(false)} variant="outline" className="w-full">
              Check Another Plant
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthCheck;
