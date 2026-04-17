import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/detect", formData);
      setResult(res.data);

      setImageUrl("http://localhost:8000/static/" + res.data.output_image);
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🛡️ DeepShield AI</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={handleUpload}>Analyze</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>{result.prediction}</h2>
          <p>Confidence: {result.confidence}</p>
          <p>{result.details}</p>

          <img src={imageUrl} alt="result" width="300" />
        </div>
      )}
    </div>
  );
}

export default App;