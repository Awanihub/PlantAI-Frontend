import { Link } from "react-router-dom";
import {
  Camera,
  BookOpen,
  Heart,
  Droplets,
  Leaf,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LogoutButton from "@/components/LogoutButton";

import { useEffect, useState } from "react";

interface Plant {
  _id: string;
  plantName: string;
  scientificName: string;
  description: string;
  image: string;
}

const Dashboard = () => {
  const [myPlants, setMyPlants] = useState<Plant[]>([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://plantai-backend-jumt.onrender.com/api/garden",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setMyPlants(data.plants);
      }
    } catch (error) {
      console.error("Failed to fetch plants:", error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Remove this plant from your garden?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://plantai-backend-jumt.onrender.com/api/garden/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setMyPlants((prev) =>
          prev.filter((plant) => plant._id !== id)
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete plant.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20">

      {/* Header */}

      <header className="bg-primary text-primary-foreground p-6 rounded-b-3xl shadow-md">
        <div className="container mx-auto">

          <div className="flex items-center justify-between mb-4">

            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf className="w-6 h-6" />
              My Garden
            </h1>

            <LogoutButton />

          </div>

          <p className="text-primary-foreground/80 text-sm">
            You have {myPlants.length} plants in your garden
          </p>

        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">

        {/* Quick Actions */}

        <div className="grid grid-cols-2 gap-4">

          <Link to="/identify">
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-sm">
                  Identify Plant
                </h3>
              </div>
            </Card>
          </Link>

          <Link to="/health-check">
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-accent" />
                </div>

                <h3 className="font-semibold text-sm">
                  Health Check
                </h3>
              </div>
            </Card>
          </Link>

          <Link to="/learn">
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-sm">
                  Learn
                </h3>
              </div>
            </Card>
          </Link>

          <Link to="/reminders">
            <Card className="p-4 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-semibold text-sm">
                  Reminders
                </h3>
              </div>
            </Card>
          </Link>

        </div>

        {/* My Plants */}

        <div>

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-bold">
              My Plants
            </h2>

            <Link to="/garden">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1"
              >
                <Leaf className="w-4 h-4" />
                My Garden
              </Button>
            </Link>

          </div>

          {myPlants.length === 0 ? (

            <Card className="p-6 text-center">
              <p className="text-muted-foreground">
                No plants added yet.
              </p>
            </Card>

          ) : (

            <div className="space-y-4">

              {myPlants.map((plant) => (

                <Card
                  key={plant._id}
                  className="p-4 hover:shadow-md transition-all"
                >

                  <div className="flex items-start gap-4">

                    <img
                      src={plant.image}
                      alt={plant.plantName}
                      className="w-24 h-24 rounded-xl object-cover"
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold text-lg">
                        {plant.plantName}
                      </h3>

                      <p className="italic text-sm text-muted-foreground">
                        {plant.scientificName}
                      </p>

                      <p className="text-sm mt-2 line-clamp-2">
                        {plant.description}
                      </p>

                      <div className="flex gap-2 mt-4">

                        <Button
                          variant="outline"
                          size="sm"
                        >
                          View Details
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleDelete(plant._id)
                          }
                        >
                          Delete
                        </Button>

                      </div>

                    </div>

                  </div>

                </Card>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;