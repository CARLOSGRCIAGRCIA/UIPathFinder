import React, { useState, useEffect } from 'react';
import Menu from '../components/Dashboard/Menu';
import PathMap from '../components/Dashboard/PathMap';
import PathControls from '../components/Dashboard/PathControls';
import AvailableMaps from '../components/Dashboard/AvailableMaps';
import UserProfile from '../components/Dashboard/UserProfile';
import CreateMapForm from '../components/Forms/CreateMapForm';
import { getMaps } from '../services/api';
import './StylesPages/DashboardPage.css';

const DashboardPage = () => {
  const [selectedMap, setSelectedMap] = useState(null);
  const [calculatedRoute, setCalculatedRoute] = useState(null);
  const [maps, setMaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    fetchMaps();
  }, []);

  const fetchMaps = async () => {
    try {
      const response = await getMaps();
      setMaps(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load maps');
      setLoading(false);
    }
  };

  const handleMapSelect = (map) => {
    setSelectedMap(map);
  };

  const handleRouteCalculated = (route) => {
    setCalculatedRoute(route);
  };

  const handleCreateMapClick = () => {
    setShowCreateForm(true);
  };

  const handleMapCreated = () => {
    setShowCreateForm(false);
    fetchMaps();
  };

  if (loading) return <div>Loading maps...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-container">
      <Menu />
      <div className="dashboard-content">
        <h1>Path Finder Dashboard</h1>
        <div className="dashboard-grid">
          <div className="main-content">
            <div className="map-container">
              <PathMap selectedMap={selectedMap} calculatedRoute={calculatedRoute} />
            </div>
            <div className="controls-container">
              <PathControls onRouteCalculated={handleRouteCalculated} />
            </div>
            {!showCreateForm && (
              <button className="create-map-button" onClick={handleCreateMapClick}>
                Create New Map
              </button>
            )}
            {showCreateForm && <CreateMapForm onMapCreated={handleMapCreated} />}
          </div>
          <div className="sidebar">
            <UserProfile />
            <AvailableMaps maps={maps} onSelectMap={handleMapSelect} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;