// Initialize the map after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map centered on Pakistan
    const map = L.map('map-container').setView([30.3753, 69.3451], 6);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);

    // State variables
    let currentTool = null;
    let markers = [];
    let lines = [];
    let polygons = [];
    let tempLine = null;
    let tempPolygon = null;
    let measurePoints = [];

    // Tool buttons
    const tools = ['marker', 'line', 'polygon', 'measure', 'clear'];
    tools.forEach(tool => {
        const button = document.getElementById(`${tool}-btn`);
        if (button) {
            button.addEventListener('click', () => {
                if (tool === 'clear') {
                    clearAll();
                } else {
                    setActiveTool(tool);
                }
            });
        }
    });

    // Set active tool
    function setActiveTool(tool) {
        currentTool = currentTool === tool ? null : tool;
        tools.forEach(t => {
            const btn = document.getElementById(`${t}-btn`);
            if (btn) {
                btn.style.opacity = currentTool === t ? '0.7' : '1';
            }
        });
    }

    // Map click handler
    map.on('click', (e) => {
        switch (currentTool) {
            case 'marker':
                addMarker(e.latlng);
                break;
            case 'line':
                handleLineDrawing(e.latlng);
                break;
            case 'polygon':
                handlePolygonDrawing(e.latlng);
                break;
            case 'measure':
                handleMeasurement(e.latlng);
                break;
        }
    });

    // Add marker
    function addMarker(latlng) {
        const marker = L.marker(latlng, { draggable: true }).addTo(map);
        const index = markers.length;
        
        const popupContent = `
            <div class="marker-popup">
                <button onclick="editMarker(${index})" style="background: #ffc107;">
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button onclick="deleteMarker(${index})" style="background: #dc3545; color: white;">
                    <i class="bi bi-trash"></i> Delete
                </button>
            </div>
        `;
        
        marker.bindPopup(popupContent);
        marker.on('dragend', () => updateConnectedShapes(marker));
        markers.push(marker);
    }

    // Handle line drawing
    function handleLineDrawing(latlng) {
        if (!tempLine) {
            tempLine = L.polyline([latlng], {
                color: '#17a2b8',
                weight: 3
            }).addTo(map);
        } else {
            const points = tempLine.getLatLngs();
            points.push(latlng);
            tempLine.setLatLngs(points);
            
            const distance = calculateDistance(points);
            tempLine.bindTooltip(`Distance: ${distance.toFixed(2)} km`);
            
            lines.push(tempLine);
            tempLine = null;
        }
    }

    // Handle polygon drawing
    function handlePolygonDrawing(latlng) {
        if (!tempPolygon) {
            tempPolygon = L.polygon([latlng], {
                color: '#28a745',
                fillOpacity: 0.2
            }).addTo(map);
        } else {
            const points = tempPolygon.getLatLngs()[0];
            points.push(latlng);
            tempPolygon.setLatLngs([points]);
            
            if (points.length > 2) {
                const area = calculateArea(points);
                tempPolygon.bindTooltip(`Area: ${area.toFixed(2)} km²`);
                
                polygons.push(tempPolygon);
                tempPolygon = null;
            }
        }
    }

    // Handle measurement
    function handleMeasurement(latlng) {
        measurePoints.push(latlng);
        if (measurePoints.length === 2) {
            const line = L.polyline(measurePoints, {
                color: '#ffc107',
                weight: 3,
                dashArray: '5, 10'
            }).addTo(map);
            
            const distance = calculateDistance(measurePoints);
            line.bindTooltip(`${distance.toFixed(2)} km`);
            
            lines.push(line);
            measurePoints = [];
        }
    }

    // Utility functions
    function calculateDistance(points) {
        let total = 0;
        for (let i = 1; i < points.length; i++) {
            total += points[i-1].distanceTo(points[i]);
        }
        return total / 1000; // Convert to kilometers
    }

    function calculateArea(points) {
        const coords = points.map(p => [p.lng, p.lat]);
        coords.push(coords[0]); // Close the polygon
        const poly = turf.polygon([coords]);
        return turf.area(poly) / 1000000; // Convert to square kilometers
    }

    function updateConnectedShapes(marker) {
        lines.forEach(line => {
            const points = line.getLatLngs();
            if (points.includes(marker.getLatLng())) {
                const distance = calculateDistance(points);
                line.setTooltipContent(`Distance: ${distance.toFixed(2)} km`);
            }
        });
    }

    function clearAll() {
        markers.forEach(m => map.removeLayer(m));
        lines.forEach(l => map.removeLayer(l));
        polygons.forEach(p => map.removeLayer(p));
        if (tempLine) map.removeLayer(tempLine);
        if (tempPolygon) map.removeLayer(tempPolygon);
        
        markers = [];
        lines = [];
        polygons = [];
        tempLine = null;
        tempPolygon = null;
        measurePoints = [];
    }

    // Make functions globally available
    window.editMarker = function(index) {
        const marker = markers[index];
        const label = prompt('Enter marker label:', marker.getTooltip()?.getContent() || '');
        if (label) {
            marker.unbindTooltip().bindTooltip(label, { permanent: true });
        }
    };

    window.deleteMarker = function(index) {
        const marker = markers[index];
        map.removeLayer(marker);
        markers.splice(index, 1);
    };
});
