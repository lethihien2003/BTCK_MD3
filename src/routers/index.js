const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const boardRouter = require("./board");
const listRouter = require("./list");
const cardRouter = require("./card");

router.use("/auth", authRouter);
router.use("/board", boardRouter);
router.use("/list", listRouter);
router.use("/card", cardRouter);

module.exports = router;
