const express = require("express");
require("dotenv").config();
const db = require("./configs/mongodb");
const router = require("./routers");
require('dotenv').config();

const errorHandle = require('./middlewares/errorHandler');


const app = express();
const port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router)

db.connect();

// Sử dụng middleware xử lý lỗi
app.use(errorHandle)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
