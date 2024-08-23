import React, { useState } from 'react';
import { findOptimalRoute, findOptimalRouteDiagonal } from '../../services/api';

const PathControls = ({ onRouteCalculated }) => {
  const [startPoint, setStartPoint] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCalculatePath = async (isDiagonal = false) => {
    setLoading(true);
    setError(null);
    try {
      // In a real scenario, you'd probably need to create a route first and then get its ID
      // For this example, we'll use a placeholder ID
      const routeId = '66c30c1f5862c1d035d52b5f';
      const response = isDiagonal
        ? await findOptimalRouteDiagonal(routeId)
        : await findOptimalRoute(routeId);
      onRouteCalculated(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to calculate route');
      setLoading(false);
    }
  };

  return (
    <div className="path-controls">
      <h2>Path Controls</h2>
      <input
        type="text"
        placeholder="Start Point"
        value={startPoint}
        onChange={(e) => setStartPoint(e.target.value)}
      />
      <input
        type="text"
        placeholder="End Point"
        value={endPoint}
        onChange={(e) => setEndPoint(e.target.value)}
      />
      <button onClick={() => handleCalculatePath(false)} disabled={loading}>
        Calculate Path
      </button>
      <button onClick={() => handleCalculatePath(true)} disabled={loading}>
        Calculate Diagonal Path
      </button>
      {loading && <p>Calculating route...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PathControls;