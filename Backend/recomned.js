async function getRecommendations(bedrooms, type) {
    console.log("Function triggered with:", { bedrooms, type });

    try {
        const response = await fetch('http://127.0.0.1:5000/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bedrooms, type })
        });

        if (!response.ok) {
            throw new Error("Failed to fetch recommendations");
        }

        const data = await response.json();
        console.log("Received recommendations:", data);
        console.log("Received recommendations:", data.property_ids);
        return data.recommendations;
    } catch (error) {
        console.error("Error in fetch:", error);
        return [];
    }
}

async function applyFiltersAndGetRecommendations() {
    const bedrooms = localStorage.getItem('bed');
    const type = localStorage.getItem('prop');

    if (!bedrooms && !type) {
        // If both bedrooms and type are empty, don't fetch recommendations
        console.log("No filters applied. Skipping recommendations.");
        return;
    }

    console.log("Bedrooms:", bedrooms);
    console.log("Type:", type);

    const recommendedIds = await getRecommendations(bedrooms, type);

    const recommendedProperties = properties.filter(property =>
        recommendedIds.includes(property.propertyId)
    );

    // Add code here to update the UI with recommendedProperties
    // For example:
    // displayRecommendedProperties(recommendedProperties);
}

// Check if bedrooms and type are empty on page load
document.addEventListener('DOMContentLoaded', () => {
    const bedrooms = localStorage.getItem('bed');
    const type = localStorage.getItem('prop');

    if (bedrooms || type) {
        applyFiltersAndGetRecommendations();
    } else {
        console.log("No filters set on page load. Waiting for user input.");
    }
});

// Add click event listener for manual updates
document.getElementById('applyFilters').addEventListener('click', applyFiltersAndGetRecommendations);


