import React, { useState } from "react";
import { fetchPlayerData, fetchSignature } from "./api";

function App() {
  const [playerName, setPlayerName] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [signatureUrl, setSignatureUrl] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("default.png");

  const handleFetchPlayerData = async () => {
    try {
      const data = await fetchPlayerData(playerName);
      setPlayerData(data);
    } catch (error) {
      console.error("Error fetching player data:", error);
      alert("Failed to fetch player data. Please try again.");
    }
  };

  const handleGenerateSignature = async () => {
    try {
      const signatureBlob = await fetchSignature(playerName, selectedTemplate);
      setSignatureUrl(URL.createObjectURL(signatureBlob));
    } catch (error) {
      console.error("Error generating signature:", error);
      alert("Failed to generate signature. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>RuneScape Skill Signature Generator</h1>
      <input
        type="text"
        placeholder="Enter Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)}>
        <option value="default.png">Default</option>
        <option value="template1.png">Template 1</option>
        <option value="template2.png">Template 2</option>
      </select>
      <button onClick={handleFetchPlayerData}>Fetch Player Data</button>
      <button onClick={handleGenerateSignature}>Generate Signature</button>

      {playerData && (
        <div>
          <h2>Player Data</h2>
          <pre>{JSON.stringify(playerData, null, 2)}</pre>
          {playerData.avatar_url && (
            <img src={playerData.avatar_url} alt="Player Avatar" style={{ width: 100, height: 100 }} />
          )}
          {playerData.live_view_url && (
            <img src={playerData.live_view_url} alt="Live View" style={{ width: 150, height: 150 }} />
          )}
        </div>
      )}

      {signatureUrl && (
        <div>
          <h2>Generated Signature</h2>
          <img src={signatureUrl} alt="Skill Signature" />
        </div>
      )}
    </div>
  );
}

export default App;
