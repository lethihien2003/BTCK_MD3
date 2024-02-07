const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");
const boardRequest = require("../requests/boardRequest");
const { verifyToken } = require("../middlewares/verifyToken");

router.use(verifyToken);

router.post("/",boardRequest.validateCreateBoardData, boardController.createBoardController);
router.get("/", boardController.getAllBoardController);
router.put(
  "/:id",
  boardRequest.checkBoardId,
  boardRequest.validateUpdateBoardData,
  boardController.updateBoardController
);
router.delete(
  "/:id",
  boardRequest.checkBoardId,
  boardController.deleteBoardController
);

module.exports = router;
