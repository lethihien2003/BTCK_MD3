const List = require("../models/list");

class ListService {
  getAllList = async (boardId) => {
    const lists = await List.find({ deleted_at: null });
    return lists;
  };

  createList = async ({ title, boardId, position }) => {
    const newList = new List({
      title,
      board_id: boardId,
      position,
    });
    await newList.save();

    return newList;
  };

  updateList = async (list, { title, position }) => {
    list.title = title;
    list.position = position;
    await list.save();
  };

  deleteList = async (list) => {
    list.deleted_at = new Date();
    await list.save();
  };
}

module.exports = new ListService();
