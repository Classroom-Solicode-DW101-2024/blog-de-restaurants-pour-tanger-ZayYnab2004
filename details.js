async function fetchRestaurantDetails() {
    const restaurantDetail = document.getElementById('restaurant-detail');
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantId = urlParams.get('id'); 

    try {
        const response = await fetch(`http://localhost:3002/restaurants/${restaurantId}`);

        
        if (!response.ok) {
            throw new Error('Restaurant not found');
        }

        const restaurant = await response.json();
        console.log(restaurant);  

        if (restaurant) {
            restaurantDetail.innerHTML = `
                <div class="restaurant-detail-card">
                    <img src="${restaurant.img}" alt="${restaurant.name}">
                    <h2>${restaurant.name}</h2>
                    <p>Cuisine: ${restaurant.cuisine}</p>
                    <p>Rating: ${restaurant.rating} ⭐</p>
                    <p>Address: ${restaurant.address}</p>
                    <p>Phone: ${restaurant.phone}</p>
                    <p><a href="${restaurant.website}" target="_blank">Visit Website</a></p>
                </div>
            `;
        }
    } catch (error) {
        console.error(error);
        restaurantDetail.innerHTML = '<p>There was an error loading the restaurant details.</p>';
    }
}

fetchRestaurantDetails();
