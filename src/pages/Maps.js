// src/pages/Maps.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Maps = () => {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retrieve token from localStorage
  const token = localStorage.getItem('token'); // This should match the key used to store the token

  // Fetch maps from the API
  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/maps`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        setMaps(response.data);
      } catch (error) {
        setError('Error fetching maps');
        console.error('Error fetching maps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaps();
  }, [token]); // Dependency array includes token

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  // Render maps list
  return (
    <div>
      <h1>Maps</h1>
      <ul>
        {maps.map((map) => (
          <li key={map.id}>
            <h2>{map.name}</h2>
            <p><strong>Dimensions:</strong> {map.dimensions}</p>
            <p><strong>Start Point:</strong> {map.startPoint}</p>
            <p><strong>End Point:</strong> {map.endPoint}</p>
            <p><strong>Obstacles:</strong> {map.obstacles.join(', ')}</p>
            <p><strong>Waypoints:</strong> {map.waypoints.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Maps;
