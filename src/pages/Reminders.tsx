import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Droplets, Trash2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Reminders = () => {
  const { toast } = useToast();

interface GardenPlant {
  _id: string;
  plantName: string;
}

interface Reminder {
  _id: string;
  gardenPlantId: string;
  plantName: string;
  action: string;
  reminderDate: string;
  completed: boolean;
}

const [plants, setPlants] = useState<GardenPlant[]>([]);
const [reminders, setReminders] = useState<Reminder[]>([]);
const [loading, setLoading] = useState(true);

const [isModalOpen, setIsModalOpen] = useState(false);

const [selectedPlant, setSelectedPlant] = useState("");
const [action, setAction] = useState("Water");
const [reminderDate, setReminderDate] = useState("");

useEffect(() => {
  fetchPlants();
  fetchReminders();
}, []);

const fetchPlants = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8000/api/garden",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setPlants(data.plants);
    }
  } catch (err) {
    console.error(err);
  }
};

const fetchReminders = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:8000/api/reminders",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (data.success) {
      setReminders(data.reminders);
    }
  } catch (err) {
    console.error(err);
  }

  setLoading(false);
};
  const handleComplete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/reminders/${id}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        fetchReminders();

        toast({
          title: "Completed",
          description: "Reminder marked as completed.",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8000/api/reminders/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (data.success) {
        fetchReminders();

        toast({
          title: "Deleted",
          description: "Reminder removed successfully.",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddReminder = async () => {
    if (!selectedPlant || !action || !reminderDate) {
      toast({
        title: "Fill all fields",
        description: "Please complete the reminder form.",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gardenPlantId: selectedPlant,
          action,
          reminderDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Reminder added",
          description: "Plant reminder created successfully.",
        });

        fetchReminders();

        setSelectedPlant("");
        setAction("Water");
        setReminderDate("");
        setIsModalOpen(false);
      } else {
        toast({
          title: "Error",
          description: data.message,
        });
      }
    } catch (err) {
      console.error(err);

      toast({
        title: "Error",
        description: "Failed to create reminder.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-8">
      {/* Header */}
      <header className="bg-primary-dark text-primary-foreground p-6 rounded-b-3xl shadow-md mb-6">
        <div className="container mx-auto">
          <Link
            to="/dashboard"
            className="inline-flex items-center text-sm mb-4 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Garden
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Droplets className="w-6 h-6" />
            Plant Care Reminders
          </h1>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Never forget to care for your plants
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 space-y-6">
        {/* Add Reminder Button */}
        <Button
          onClick={() => setIsModalOpen(true)}
          className="w-full h-12 gap-2 animate-fade-in"
        >
          <Plus className="w-5 h-5" />
          Add New Reminder
        </Button>

        {/* Reminders List */}
        <div className="space-y-3">
          {reminders.map((reminder, index) => (
            <Card
              key={reminder._id}
              className={`p-4 border-border animate-fade-in ${
                reminder.completed ? "opacity-60" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleComplete(reminder._id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    reminder.completed
                      ? "bg-primary border-primary"
                      : "border-muted-foreground hover:border-primary"
                  }`}
                >
                  {reminder.completed && (
                    <Check className="w-4 h-4 text-primary-foreground" />
                  )}
                </button>

                <div className="flex-1">
                  <h3
                    className={`font-semibold ${reminder.completed ? "line-through text-muted-foreground" : "text-card-foreground"}`}
                  >
                    {reminder.action} {reminder.plantName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Droplets className="w-3 h-3 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      {reminder.reminderDate}
                    </p>
                  </div>
                </div>

                <Badge
                  variant={reminder.reminderDate === "Today" ? "default" : "secondary"}
                >
                  {reminder.reminderDate}
                </Badge>

                <button
                  onClick={() => handleDelete(reminder._id)}
                  className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <Card className="p-6 w-11/12 max-w-md relative animate-slide-up">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-destructive"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold mb-4">Add New Reminder</h2>
              <div className="space-y-4">
                <select
                  value={selectedPlant}
                  onChange={(e) => setSelectedPlant(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary/50"
                >
                  <option value="">Select a plant</option>
                  {plants.map((plant) => (
                    <option key={plant._id} value={plant._id}>
                      {plant.plantName}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Action (Water, Fertilize, etc.)"
                  value={action}
                  onChange={(e) => setAction(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary/50"
                />
                <input
                  type="date"
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-primary/50"
                />
                <Button onClick={handleAddReminder} className="w-full">
                  Add Reminder
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Tips */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-border animate-slide-up">
          <h3 className="font-semibold mb-3 text-card-foreground">
            Reminder Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Set reminders based on each plant's specific needs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>
                Check soil moisture before watering, even with reminders
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Adjust frequency based on season and environment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Enable notifications to never miss a care task</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Reminders;
