const properties = [
    {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80",
        title: "Hamilton, Jones and Huff",
        price: 422266,
        description: "Spacious house with modern amenities in East Mia, MA.",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2971,
        type: "house",
        propertyId: 1
    },
    {
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Gonzalez, Anderson and Wu",
        price: 535339,
        description: "Stylish apartment in Reevesview, NV with great amenities.",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 1513,
        type: "apartment",
        propertyId: 2
    },
    {
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80",
        title: "James Inc",
        price: 1016222,
        description: "Modern condo in Christineport, ND with parking available.",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1242,
        type: "condo",
        propertyId: 3
    },
    {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80",
        title: "Johnson and Sons",
        price: 412746,
        description: "Spacious family house in Port Bryanshire, FM with parking.",
        bedrooms: 5,
        bathrooms: 1,
        sqft: 3131,
        type: "house",
        propertyId: 4
    },
    {
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Thompson Group",
        price: 796026,
        description: "Unique apartment near USNS Miller with parking available.",
        bedrooms: 1,
        bathrooms: 4,
        sqft: 2626,
        type: "apartment",
        propertyId: 5
    },
    {
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80",
        title: "Keith, Dorsey and King",
        price: 627987,
        description: "Luxurious apartment near USNV Bryan with parking and pool.",
        bedrooms: 4,
        bathrooms: 1,
        sqft: 2772,
        type: "apartment",
        propertyId: 6
    },
    {
        image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        title: "Roberts PLC",
        price: 1201825,
        description: "Spacious apartment in West Loriton, DC with parking.",
        bedrooms: 4,
        bathrooms: 2,
        sqft: 3910,
        type: "apartment",
        propertyId: 7
    },
    {
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80",
        title: "Wilkins-Henderson",
        price: 1375167,
        description: "Luxurious apartment in West Josephberg, PA with parking and pool.",
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3419,
        type: "apartment",
        propertyId: 8
    },
    {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80",
        title: "Owens-Cabrera",
        price: 541385,
        description: "Modern apartment in North Jasonmouth, GA with parking and pool.",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2429,
        type: "apartment",
        propertyId: 9
    },
    {
        image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80",
        title: "Castro, Levine and Gill",
        price: 552651,
        description: "Charming condo in Oconnorville, VI with pool access.",
        bedrooms: 2,
        bathrooms: 4,
        sqft: 2620,
        type: "condo",
        propertyId: 10
    }
        
    ];

    function createPropertyCard(property) {
        return `
            <div class="property-card">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-info">
                    <h3>${property.title}</h3>
                    <p class="price">$${property.price.toLocaleString()}</p>
                    <p>${property.description}</p>
                    <div class="features">
                        <span>${property.bedrooms} bed</span>
                        <span>${property.bathrooms} bath</span>
                        <span>${property.sqft} sqft</span>
                    </div>
                </div>
            </div>
        `
        
    };
    document.addEventListener('DOMContentLoaded', () => {
        const propertyCards = document.querySelectorAll('.property-card');
        propertyCards.forEach((card, index) => {
          card.addEventListener('click', () => {
            console.log(`Clicked property card ${properties[index].propertyId}`);
          });
        });
      });
    

    const firstPropertyTitle = properties[0].title;  // 'Cozy Beach House'
    const firstPropertyPrice = properties[9].propertyId;  // 300000
    console.log('First Property Title:', firstPropertyTitle);
    console.log('First Property Price:', firstPropertyPrice);



    function displayProperties(propertiesToShow) {
        const propertyGrid = document.getElementById('propertyGrid');
        propertyGrid.innerHTML = propertiesToShow.map(createPropertyCard).join('');
    }

    function filterProperties() {
        const type = document.getElementById("propertyType").value;
        const bedrooms = parseInt(document.getElementById("bedrooms").value) || 0;
        const minPrice = parseInt(document.getElementById("minPrice").value) || 0;
        const maxPrice = parseInt(document.getElementById("maxPrice").value) || Infinity;

        const filteredProperties = properties.filter(property => {
            return (
                (type === "" || property.type === type) &&
                property.bedrooms >= bedrooms &&
                property.price >= minPrice &&
                property.price <= maxPrice
            );
        });

        displayProperties(filteredProperties);
    }

    displayProperties(properties);

    let map;
    let markers = [];

    function initMap() {
        map = L.map('map').setView([40.7128, -74.0060], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        updateMap(properties);
    }

    function updateMap(propertiesToShow) {
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        propertiesToShow.forEach(property => {
            const marker = L.marker([property.lat, property.lng]).addTo(map);
            marker.bindPopup(`<b>${property.title}</b><br>$${property.price.toLocaleString()}`);
            markers.push(marker);
        });
    }

    displayProperties(properties);
    initMap();