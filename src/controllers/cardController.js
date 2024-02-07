const { responseSuccess, responseError } = require("../utils/response");
const cardService = require("../services/cardService");

class CardController {
  getAllCardsController = async (req, res) => {
    try {
      const cards = await cardService.getAllCards(req.query);
      return responseSuccess(res, cards, 200, "Lấy danh sách cards thành công");
    } catch (error) {
      return responseError(
        res,
        error,
        500,
        "Đã xảy ra lỗi khi lấy danh sách cards"
      );
    }
  };

  createCardController = async (req, res) => {
    try {
      const newCard = await cardService.createCard(req.body);
      return responseSuccess(res, newCard, 201, "Tạo card mới thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi tạo card mới");
    }
  };

  updateCardController = async (req, res) => {
    try {
      const updatedCard = await cardService.updateCard(req.card, req.body);
      return responseSuccess(res, updatedCard, 200, "Cập nhật card thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi cập nhật card");
    }
  };

  deleteCardController = async (req, res) => {
    try {
      await cardService.deleteCard(req.card);
      return responseSuccess(res, null, 200, "Xóa card thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi xóa card");
    }
  };

  getCardByIdController = async (req, res) => {
    try {
      const result = await cardService.getDetailCards(req.card);
      return responseSuccess(res, result, 200, "Lấy thông tin card thành công");
    } catch (error) {
      return responseError(
        res,
        error,
        500,
        "Đã xảy ra lỗi khi lấy thông tin card"
      );
    }
  };
}

module.exports = new CardController();
