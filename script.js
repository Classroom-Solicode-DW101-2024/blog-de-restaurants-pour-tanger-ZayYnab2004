document.addEventListener('DOMContentLoaded', () => {
    const restaurantList = document.getElementById('restaurant-list');
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('button');
    function fetchRestaurants() {
        fetch('http://localhost:3002/restaurants')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Received data:', data);
                if (data.length === 0) {
                    restaurantList.innerHTML = '<p>No restaurants found.</p>';
                } else {
                    restaurantList.innerHTML = '';  
                    data.forEach(restaurant => {
                        const card = document.createElement('div');
                        card.classList.add('restaurant-card');
                        card.innerHTML = `
                            <img src="${restaurant.img}" alt="${restaurant.name}">
                            <h3>${restaurant.name}</h3>
                            <p>Cuisine: ${restaurant.cuisine}</p>
                            <p>Rating: ${restaurant.rating} ⭐</p>
                            <p>Address: ${restaurant.address}</p>
                            <p>Phone: ${restaurant.phone}</p>
                            <a class="details-button" href="./Details.html?id=${restaurant.id}">Détails</a>
                        `;
                        restaurantList.appendChild(card);
                    });
                }
            })
            .catch(error => {
                console.error('Error fetching restaurant data:', error);
                restaurantList.innerHTML = '<p>Failed to load restaurants. Please try again later.</p>';
            });
    }


    function searchRestaurants() {
        const searchTerm = searchInput.value.toLowerCase(); 

        fetch('http://localhost:3002/restaurants')
            .then(response => response.json())
            .then(data => {
                console.log('Received data in search:', data);
                
                if (Array.isArray(data)) {
                    const filteredRestaurants = data.filter(restaurant => {
                       
                        const nameMatch = restaurant.name && restaurant.name.toLowerCase().includes(searchTerm);
                        const cuisineMatch = restaurant.cuisine && restaurant.cuisine.toLowerCase().includes(searchTerm);
                        
                        return nameMatch || cuisineMatch;
                    });

                   
                    restaurantList.innerHTML = '';  

                    if (filteredRestaurants.length > 0) {
                      
                        filteredRestaurants.forEach(restaurant => {
                            const card = document.createElement('div');
                            card.classList.add('restaurant-card');
                            card.innerHTML = `
                                <img src="${restaurant.img}" alt="${restaurant.name}">
                                <h3>${restaurant.name}</h3>
                                <p>Cuisine: ${restaurant.cuisine}</p>
                                <p>Rating: ${restaurant.rating} ⭐</p>
                                <p>Address: ${restaurant.address}</p>
                                <p>Phone: ${restaurant.phone}</p>
                                <a class="details-button" href="./Details.html?id=${restaurant.id}">Détails</a>
                            `;
                            restaurantList.appendChild(card);
                        });
                    } else {
                        restaurantList.innerHTML = '<p>No matching restaurants found.</p>';
                    }
                } else {
                    console.error('Data is not an array:', data);
                    restaurantList.innerHTML = '<p>Error: Unexpected data format.</p>';
                }
            })
            .catch(error => {
                console.log('Search error:', error);
                restaurantList.innerHTML = '<p>Error during search. Please try again later.</p>';
            });
    }

   
    searchButton.addEventListener('click', searchRestaurants);

    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchRestaurants();
        }
    });
    fetchRestaurants();
});
