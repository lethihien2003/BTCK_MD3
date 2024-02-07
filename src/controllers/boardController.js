const { responseSuccess, responseError } = require("../utils/response");
const boardService = require("../services/boardService");

class BoardController {
  createBoardController = async (req, res) => {
    try {
      await boardService.createBoard(req.body);
      return responseSuccess(res, null, 201, "Tạo bảng thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi tạo bảng");
    }
  };

  getAllBoardController = async (req, res) => {
    try {
      const result = await boardService.getAllBoard(req.query);
      return responseSuccess(res, result, 200, "Lấy danh sách bảng thành công");
    } catch (error) {
      return responseError(
        res,
        error,
        500,
        "Đã xảy ra lỗi khi lấy danh sách bảng"
      );
    }
  };

  updateBoardController = async (req, res) => {
    try {
      const updatedBoard = await boardService.updateBoard(req.board, req.body);
      return responseSuccess(res, updatedBoard, 200, "Cập nhật bảng thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi cập nhật bảng");
    }
  };

  deleteBoardController = async (req, res) => {
    try {
      await boardService.deleteBoard(req.board);
      return responseSuccess(res, null, 200, "Xóa bảng thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi xóa bảng");
    }
  };
}

module.exports = new BoardController();
