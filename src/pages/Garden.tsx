import { useEffect, useState } from "react";

interface Plant {
  _id: string;
  plantName: string;
  scientificName: string;
  description: string;
  image: string;
}

const Garden = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/garden", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setPlants(data.plants);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this plant from your garden?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8000/api/garden/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setPlants((prev) => prev.filter((plant) => plant._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete plant.");
    }
  };

  const handleAddReminder = async (gardenPlantId: string) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8000/api/reminders", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          gardenPlantId: gardenPlantId,
          action: "Water",
          reminderDate: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      console.log("Reminder Response:", data);

      if (data.success) {
        alert("Water reminder added!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert("Failed to add reminder");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">🌿 My Garden</h1>

      {loading ? (
        <p>Loading...</p>
      ) : plants.length === 0 ? (
        <p>No plants saved yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {plants.map((plant) => (
            <div key={plant._id} className="border rounded-xl p-4 shadow-md">
              <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h2 className="text-xl font-semibold mt-3">{plant.plantName}</h2>

              <p className="italic text-gray-500">{plant.scientificName}</p>

              <p className="mt-2 text-sm">{plant.description}</p>

              <button
                onClick={() => handleDelete(plant._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
              >
                Delete Plant
              </button>

              <button
                onClick={() => handleAddReminder(plant._id)}
                className="mt-3 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
              >
                Add Water Reminder
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Garden;
