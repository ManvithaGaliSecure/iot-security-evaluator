// src/App.js
import React, { useState } from 'react';
import DeviceSelector from './DeviceSelector';
import SecurityLayerSelector from './SecurityLayerSelector';
import axios from 'axios';

function App() {
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [evaluation, setEvaluation] = useState(null);

  const handleEvaluate = () => {
    // Send selected device and layers to the backend for evaluation
    axios.post('http://localhost:5000/api/evaluate-security', {
      device: selectedDevice,
      layers: selectedLayers,
    }).then(response => setEvaluation(response.data))
      .catch(error => console.error('Error evaluating security:', error));
  };

  return (
    <div>
      <h1>IoT Security Evaluator</h1>
      <DeviceSelector onDeviceSelect={setSelectedDevice} />
      <SecurityLayerSelector onLayerSelect={setSelectedLayers} />

      <button onClick={handleEvaluate} disabled={!selectedDevice || selectedLayers.length === 0}>
        Evaluate Security
      </button>

      {evaluation && (
        <div>
          <h2>Evaluation Results</h2>
          <p>Security Score: {evaluation.score}</p>
          <ul>
            {evaluation.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
