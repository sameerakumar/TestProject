const express = require('express');
const mongoose = require('mongoose');
const RestRouter = require('./route');
const app = express();
const port = 5000;

app.use(express.json());

app.use('/restaurant', RestRouter);
app.use('/restaurants', RestRouter);
const uri = "mongodb+srv://sameera:sameera@cluster0.cgres.mongodb.net/sample_restaurants?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});