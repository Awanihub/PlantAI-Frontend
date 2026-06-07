import { Link } from "react-router-dom";
import { Camera, BookOpen, Heart, Droplets, Leaf, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LogoutButton from "@/components/LogoutButton";

const Dashboard = () => {
  const myPlants = [
    { id: 1, name: "Monstera Deliciosa", health: "Healthy", lastWatered: "2 days ago", image: "🌿" },
    { id: 2, name: "Snake Plant", health: "Needs Water", lastWatered: "5 days ago", image: "🌱" },
    { id: 3, name: "Pothos", health: "Healthy", lastWatered: "1 day ago", image: "🍃" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20">
      {/* Header */}
      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-md animate-slide-up">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              My Garden
            </h1>
            {/* <Link to="/identify">
              <Button variant="secondary" size="sm" className="gap-2">
                <Camera className="w-4 h-4" />
                Identify
              </Button>
            </Link> */}
            <LogoutButton />
          </div>
          <p className="text-primary-foreground/80 text-sm">You have {myPlants.length} plants in your garden</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <Link to="/identify">
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-card-foreground">Identify Plant</h3>
              </div>
            </Card>
          </Link>

          <Link to="/health-check">
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-sm text-card-foreground">Health Check</h3>
              </div>
            </Card>
          </Link>

          <Link to="/learn">
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-primary-light/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary-light" />
                </div>
                <h3 className="font-semibold text-sm text-card-foreground">Learn</h3>
              </div>
            </Card>
          </Link>

          <Link to="/reminders">
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-border">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-earth/30 rounded-full flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-primary-dark" />
                </div>
                <h3 className="font-semibold text-sm text-card-foreground">Reminders</h3>
              </div>
            </Card>
          </Link>
        </div>

        {/* My Plants */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">My Plants</h2>
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              <Plus className="w-4 h-4" />
              Add Plant
            </Button>
          </div>

          <div className="space-y-3">
            {myPlants.map((plant, index) => (
              <Card
                key={plant.id}
                className="p-4 hover:shadow-md transition-all cursor-pointer border-border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{plant.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-card-foreground">{plant.name}</h3>
                    <p className="text-sm text-muted-foreground">Last watered: {plant.lastWatered}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    plant.health === "Healthy" 
                      ? "bg-primary/10 text-primary" 
                      : "bg-accent/10 text-accent"
                  }`}>
                    {plant.health}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
