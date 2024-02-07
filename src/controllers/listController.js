const { responseSuccess, responseError } = require("../utils/response");
const listService = require("../services/listService");

class ListController {
  getAllListController = async (req, res) => {
    try {
      const lists = await listService.getAllList(req.query);
      return responseSuccess(res, lists, 200, "Lấy danh sách list thành công");
    } catch (error) {
      return responseError(
        res,
        error,
        500,
        "Đã xảy ra lỗi khi lấy danh sách list"
      );
    }
  };

  createListController = async (req, res) => {
    try {
      const newList = await listService.createList(req.body);
      return responseSuccess(res, newList, 201, "Tạo list mới thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi tạo list mới");
    }
  };

  updateListController = async (req, res) => {
    try {
      const updatedList = await listService.updateList(req.list, req.body);
      return responseSuccess(res, updatedList, 200, "Cập nhật list thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi cập nhật list");
    }
  };

  deleteListController = async (req, res) => {
    try {
      await listService.deleteList(req.list);
      return responseSuccess(res, null, 200, "Xóa list thành công");
    } catch (error) {
      return responseError(res, error, 500, "Đã xảy ra lỗi khi xóa list");
    }
  };
}

module.exports = new ListController();
