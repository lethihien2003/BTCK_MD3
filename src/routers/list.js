const express = require("express");
const router = express.Router();
const listController = require("../controllers/listController");
const listRequest = require("../requests/listRequest");
const { verifyToken } = require("../middlewares/verifyToken");

router.use(verifyToken);

router.get("/", listController.getAllListController);
router.post("/",
  listRequest.validateCreateListData,
  listController.createListController);
router.put(
  "/:id",
  listRequest.checkListId,
  listRequest.validateUpdateListData,
  listController.updateListController
);
router.delete(
  "/:id",
  listRequest.checkListId,
  listController.deleteListController
);

module.exports = router;
