const Board = require("../models/board");

class BoardService {
  createBoard = async ({ title, avatar }) => {
    const newBoard = new Board({
      title,
      avatar,
    });

    await newBoard.save();
  };

  getAllBoard = async () => {
    try {
      const boards = await Board.aggregate()
        .match({ deleted_at: null })
        .lookup({
          from: "lists",
          localField: "_id",
          foreignField: "board_id",
          as: "lists",
        })
        .addFields({
          lists: {
            $filter: {
              input: "$lists",
              as: "item",
              cond: {
                $lte: ["$$item.deleted_at", null],
              },
            },
          },
        })
        .sort({
          created_at: -1,
        });

      return boards;
    } catch (error) {
      throw error;
    }
  };

  updateBoard = async (board, { title, avatar }) => {
    board.title = title;
    if (avatar) {
      board.avatar = avatar;
    }
    await board.save();
  };

  deleteBoard = async (board) => {
    board.deleted_at = new Date();
    await board.save();
  };
}

module.exports = new BoardService();
