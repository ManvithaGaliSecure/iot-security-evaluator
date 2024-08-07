// src/SecurityLayerSelector.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SecurityLayerSelector = ({ onLayerSelect }) => {
  const [layers, setLayers] = useState([]);

  useEffect(() => {
    // Fetch security layers from the backend API
    axios.get('http://localhost:5000/api/security-layers')
      .then(response => setLayers(response.data))
      .catch(error => console.error('Error fetching security layers:', error));
  }, []);

  return (
    <div>
      <h2>Select Security Layers</h2>
      <select multiple onChange={e => onLayerSelect(Array.from(e.target.selectedOptions, option => option.value))}>
        {layers.map(layer => (
          <option key={layer.name} value={layer.name}>
            {layer.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SecurityLayerSelector;

