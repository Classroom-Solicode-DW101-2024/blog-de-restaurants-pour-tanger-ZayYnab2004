const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser=require("body-parser")
const app = express();
const port = 3002;

app.use(cors());
app.use(bodyParser.json())

const restaurants=require("./restaurants.json");


app.get('/restaurants', (req, res) => {
    res.json(restaurants);  
});

app.get("/restaurants/:id", (req, res) => {
    
    const restaurantId = parseInt(req.params.id, 10);
    
    const restaurant = restaurants.find((r) => r.id === restaurantId);
    if (restaurant) {
        res.json(restaurant);
    } else {
        res.status(404).json({ error: "Restaurant not found" });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
