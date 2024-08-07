// src/DeviceSelector.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeviceSelector = ({ onDeviceSelect }) => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // Fetch devices from the backend API
    axios.get('http://localhost:5000/api/devices')
      .then(response => setDevices(response.data))
      .catch(error => console.error('Error fetching devices:', error));
  }, []);

  return (
    <div>
      <h2>Select IoT Device</h2>
      <select onChange={e => onDeviceSelect(e.target.value)}>
        <option value="">Select a device</option>
        {devices.map(device => (
          <option key={device.name} value={device.name}>
            {device.name} ({device.manufacturer})
          </option>
        ))}
      </select>
    </div>
  );
};

export default DeviceSelector;

