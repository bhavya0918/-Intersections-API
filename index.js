const express = require('express');
const turf = require('@turf/turf');

const app = express();
const PORT = 3000;

app.use(express.json());

// Middleware for header-based authentication
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid authentication token' });
  }

  // Perform authentication logic here
  

  next();
});

// POST endpoint for finding intersections
app.post('/api/intersections', (req, res) => {
  const linestring = req.body.linestring;

  if (!linestring) {
    return res.status(400).json({ error: 'Missing linestring in the request body' });
  }

  try {
    // Parse the GeoJSON linestring
    const geojson = JSON.parse(linestring);

    // Check if the linestring is valid
    if (geojson.type !== 'LineString') {
      return res.status(400).json({ error: 'Invalid linestring' });
    }

    // Perform intersection calculation using turf.js
    const intersectingLines = findIntersectingLines(geojson);

    // Return the result
    res.json(intersectingLines);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to find intersecting lines
function findIntersectingLines(linestring) {
  // Load the scattered lines data (replace with your own data source)
  const scatteredLinesData = require('./lines.json');

  // Create a feature collection of the scattered lines
  const scatteredLines = turf.featureCollection(scatteredLinesData);

  // Find intersecting lines using turf.js
  const intersectingLines = [];

  turf.featureEach(scatteredLines, (line) => {
    if (turf.booleanIntersects(line, linestring)) {
      intersectingLines.push({
        id: line.properties.id,
        intersection: turf.lineIntersect(line, linestring).features[0].geometry.coordinates
      });
    }
  });

  return intersectingLines;
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
