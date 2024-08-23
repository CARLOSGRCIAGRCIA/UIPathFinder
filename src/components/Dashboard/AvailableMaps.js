import React, { useState, useEffect } from "react";
import { getMaps } from "../../services/api";

const AvailableMaps = ({ onSelectMap }) => {
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const response = await getMaps();
        const mapsData = Array.isArray(response.data)
          ? response.data
          : response.data.maps
          ? response.data.maps
          : typeof response.data === "object"
          ? Object.values(response.data)
          : [];
        setMaps(mapsData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching maps:", err);
        setError("Failed to load maps");
        setLoading(false);
      }
    };

    fetchMaps();
  }, []);

  if (loading) return <div>Loading maps...</div>;
  if (error) return <div>{error}</div>;

  const mapItems = Array.isArray(maps) ? (
    maps.map((map, index) => (
      <li key={map.id || index} onClick={() => onSelectMap(map)}>
        {map.name || `Map ${index + 1}`}
      </li>
    ))
  ) : (
    <li>No maps available</li>
  );

  return (
    <div className="available-maps">
      <h2>Available Maps</h2>
      <ul>{mapItems}</ul>
    </div>
  );
};

export default AvailableMaps;
