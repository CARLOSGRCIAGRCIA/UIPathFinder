import React, { useState } from 'react';
import { createMap } from '../../services/api';
import './Styles/CreateMapForm.css';

const CreateMapForm = ({ onMapCreated, onCancel }) => {
  const [newMap, setNewMap] = useState({
    name: '',
    width: 100,
    height: 100,
    start: { x: 0, y: 0 },
    end: { x: 99, y: 99 },
    obstacles: [],
    waypoints: []
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setNewMap(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: parseInt(value, 10)
        }
      }));
    } else {
      setNewMap(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMap(newMap);
      setError(null);
      if (onMapCreated) onMapCreated();
    } catch (err) {
      setError('Failed to create map');
    }
  };

  return (
    <form className="create-map-form" onSubmit={handleSubmit}>
      <h2>Create New Map</h2>
      <div className="form-group">
        <label htmlFor="name">Map Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          value={newMap.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="width">Width:</label>
        <input
          id="width"
          type="number"
          name="width"
          value={newMap.width}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          type="number"
          name="height"
          value={newMap.height}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="start-x">Start X:</label>
        <input
          id="start-x"
          type="number"
          name="start.x"
          value={newMap.start.x}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="start-y">Start Y:</label>
        <input
          id="start-y"
          type="number"
          name="start.y"
          value={newMap.start.y}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="end-x">End X:</label>
        <input
          id="end-x"
          type="number"
          name="end.x"
          value={newMap.end.x}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="end-y">End Y:</label>
        <input
          id="end-y"
          type="number"
          name="end.y"
          value={newMap.end.y}
          onChange={handleInputChange}
          required
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="form-buttons">
        <button className="submit-button" type="submit">Create Map</button>
        <button className="cancel-button" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default CreateMapForm;