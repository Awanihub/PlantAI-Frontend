import { useState } from "react";
import { useLocation } from "react-router-dom";

const PlantChat = () => {
  const location = useLocation();

  const plant = location.state?.plant;

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://plantai-backend-jumt.onrender.com/api/chat/message",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            plantScanId: plant.scanId,
            question,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAnswer(data.answer);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌱 Plant AI Chat</h1>

      <h3>{plant?.name}</h3>

      <textarea
        placeholder="Ask anything about your plant..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "20px",
        }}
      />

      <button
        onClick={sendMessage}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {answer && (
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>Plant AI Answer</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default PlantChat;