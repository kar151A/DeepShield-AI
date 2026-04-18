import { useState } from "react";
import axios from "axios";

function App() {
  
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
  if (!file) {
    alert("Please select a file");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    setLoading(true); // 🔥 START LOADING

    const res = await axios.post("http://localhost:8000/detect", formData);

    setResult(res.data);
    setImageUrl("http://localhost:8000/static/" + res.data.output_image);

  } catch (error) {
    console.error(error);
    alert("Error connecting to backend");
  } finally {
    setLoading(false); // 🔥 STOP LOADING
  }
};

  return (
  <div style={{
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "Arial"
  }}>
    <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
      🛡️ DeepShield AI
    </h1>

    <p style={{ color: "#94a3b8" }}>
      Detect Fake / Manipulated Images using AI
    </p>

    <div style={{
      marginTop: "30px",
      padding: "30px",
      background: "#1e293b",
      borderRadius: "12px",
      boxShadow: "0px 10px 30px rgba(0,0,0,0.5)"
    }}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        style={{ marginBottom: "20px" }}
      />

      <br />

      <button
  onClick={handleUpload}
  disabled={loading}
  style={{
    padding: "10px 20px",
    background: loading ? "gray" : "#22c55e",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }}
>
  {loading ? "Processing..." : "Analyze Image"}
</button>
      {loading && <div className="loader"></div>
      
      }
      
    </div>

    {result && (

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2 style={{
  color: result.prediction === "FAKE" ? "#ef4444" : "#22c55e",
  fontSize: "28px"
}}>
  {result.prediction}
</h2>

        <p>Confidence: {result.confidence}</p>

        <p>{result.details}</p>
        <p style={{ color: "#94a3b8", marginTop: "5px" }}>
  {result.prediction === "FAKE"
    ? "⚠️ This image shows signs of manipulation."
    : "✅ This image appears authentic."}
</p>

        <img
          src={imageUrl}
          alt="result"
          width="350"
          style={{
            marginTop: "20px",
            borderRadius: "10px",
            border: "2px solid #334155"
          }}
        />
      </div>
    )}
    
  </div>
);
}

export default App;