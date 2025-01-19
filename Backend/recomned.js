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
        // console.log("Received recommendations:", data);
        const id = data.property_ids;
        localStorage.setItem('id', id);
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
    const idarray = localStorage.getItem('id');
    console.log(idarray);
    console.log(bedrooms);
    console.log(type);

    if (bedrooms || type) {
        function filterPropertiesByIds(ids) {
            return properties.filter(property => ids.includes(property.propertyId));
        }
    
        function displayProperties(propertiesToShow) {
            const propertyGrid = document.getElementById('propertyGrid');
            propertyGrid.innerHTML = propertiesToShow.map(property => createPropertyCard(property)).join('');
            
            // Add click event listeners to all property cards
            document.querySelectorAll('.property-card').forEach(card => {
                card.addEventListener('click', handlePropertyCardClick);
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            displayProperties(properties);
        
            const popup = document.getElementById('propertyPopup');
            const closeBtn = popup.querySelector('.close-btn');
        
            closeBtn.addEventListener('click', () => {
                popup.style.display = 'none';
            });
        
            window.addEventListener('click', (event) => {
                if (event.target === popup) {
                    popup.style.display = 'none';
                }
            });
        });
        

        function handlePropertyCardClick(event) {
            const card = event.currentTarget;
            const propertyId = parseInt(card.dataset.propertyId);
            console.log("Clicked property ID:", propertyId);
            
            // Find the property in the properties array
            const property = properties.find(p => p.propertyId === propertyId);
            
            if (property) {
                // Update popup content
                document.getElementById('propertyTitle').textContent = property.title;
                document.getElementById('propertyImage').src = property.image;
                document.getElementById('propertyDescription').textContent = property.description;
                document.getElementById('bed').textContent = property.bedrooms;
                document.getElementById('bathrooms').textContent = property.bathrooms;
                document.getElementById('area').textContent = property.sqft;
                document.getElementById('price').textContent = property.price.toLocaleString();
        
                // Show the popup
                document.getElementById('propertyPopup').style.display = 'block';
            }
        }
        
        
    
        function updatePropertiesDisplay(data) {
            if (Array.isArray(data.property_ids) && data.property_ids.length > 0) {
                const filteredProperties = filterPropertiesByIds(data.property_ids);
                displayProperties(filteredProperties);
            } else {
                console.log("No property IDs received or invalid data");
                displayProperties(properties); // Assuming 'properties' is your full list of properties
            }
        }
        
        const idArray = idarray.split(',').map(Number);
        const receivedData = { property_ids: idArray};
        updatePropertiesDisplay(receivedData);
    
    
    } else {
        console.log("No filters set on page load. Waiting for user input.");
    }
});

// Add click event listener for manual updates
// document.getElementById('applyFilters').addEventListener('click', applyFiltersAndGetRecommendations);


