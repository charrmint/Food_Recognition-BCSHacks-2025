const express = require('express');

const app = express();

app.get("/products", (req, res) => {
    req.send("Server is ready123");
});

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
