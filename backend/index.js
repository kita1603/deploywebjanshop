//packages
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';


//Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirnameFE = path.dirname(__filename)




dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

// const cors = require('cors');
const app = express();
app.use(cors());
// const serverless = require('serverless-http');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

//Payment method
app.get("/api/config/paypal", (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  });

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

//use the frontend
app.use(express.static(path.join(__dirnameFE, '/frontend/dist')))

//render frontend
app.get('*', (req, res) => res.sendFile(path.join(__dirnameFE, '/frontend/dist/index.html')));

app.listen(port, () => console.log("Server running on port: " + port));

// module.exports.handler = serverless(app);