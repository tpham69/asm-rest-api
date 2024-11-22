const express = require("express");
const router = express.Router();
const Car = require("../models/car");

//Lấy form tạo xe
router.get('/form', (req, res) => {
    res.render("cars");
});

// Tạo ô tô mới
router.post("/create", async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Lấy danh sách ô tô dạng JSON
router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
