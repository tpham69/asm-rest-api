const express = require("express");
const router = express.Router();
const Car = require("../models/car");

// Lấy form tạo xe (hiển thị form cho người dùng)
router.get('/form', (req, res) => {
    res.render("dialog_add_car");
});

// Tạo ô tô mới (API)
router.post("/create", async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const cars = await Car.find();
        res.render("cars", { cars });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Lấy danh sách ô tô (API JSON)
router.get("/json-data", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Cập nhật thông tin xe
router.put("/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Cập nhật các trường
        car.tenXe = req.body.tenXe || car.tenXe;
        car.hangSanXuat = req.body.hangSanXuat || car.hangSanXuat;
        car.namSanXuat = req.body.namSanXuat || car.namSanXuat;
        car.giaBan = req.body.giaBan || car.giaBan;
        car.moTa = req.body.moTa || car.moTa;

        await car.save();
        res.json(car);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Xóa xe
router.delete("/:id", async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        await car.deleteOne();
        res.json({ message: "Car deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Lấy thông tin xe để sửa
router.get('/edit/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.render('edit', { car });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Cập nhật xe
router.post('/update/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        // Cập nhật thông tin xe
        car.tenXe = req.body.tenXe || car.tenXe;
        car.hangSanXuat = req.body.hangSanXuat || car.hangSanXuat;
        car.namSanXuat = req.body.namSanXuat || car.namSanXuat;
        car.giaBan = req.body.giaBan || car.giaBan;
        car.moTa = req.body.moTa || car.moTa;

        await car.save();
        res.redirect('/cars');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Xóa xe
router.get('/delete/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        await car.deleteOne();
        res.redirect('/cars');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
