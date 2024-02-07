const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");
const cardRequest = require("../requests/cardRequest");
const { verifyToken } = require("../middlewares/verifyToken");

router.use(verifyToken);


router.get("/", cardController.getAllCardsController);
router.post("/", 
  cardRequest.validateCreateCardData,
  cardController.createCardController);
router.put(
  "/:id",
  cardRequest.checkCardId,
  cardRequest.validateUpdateCardData,
  cardController.updateCardController
);
router.delete(
  "/:id",
  cardRequest.checkCardId,
  cardController.deleteCardController
);
router.get(
  "/:id",
  cardRequest.checkCardId,
  cardController.getCardByIdController
);
module.exports = router;
