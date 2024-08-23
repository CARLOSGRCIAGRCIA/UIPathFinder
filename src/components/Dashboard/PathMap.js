import React from 'react';

const PathMap = ({ selectedMap, calculatedRoute }) => {
  if (!selectedMap) {
    return <div>Please select a map</div>;
  }

  return (
    <div className="path-map">
      <h2>Map: {selectedMap.name}</h2>
      {calculatedRoute ? (
        <div>
          <h3>Calculated Route:</h3>
          <pre>{JSON.stringify(calculatedRoute, null, 2)}</pre>
          {/* Here you would render your map and draw the route */}
        </div>
      ) : (
        <p>No route calculated yet</p>
      )}
    </div>
  );
};

export default PathMap;