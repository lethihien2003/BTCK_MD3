const Card = require("../models/card");

class CardService {
  getAllCards = async (listId) => {
      const cards = await Card.find({ deleted_at: null  });
      return cards;
  };

  createCard = async ({
    title,
    description,
    member,
    dueDate,
    avatar,
    attachment,
    listId,
  }) => {
    const newCard = new Card({
      title,
      description,
      member,
      dueDate,
      avatar,
      attachment,
      list_id: listId,
    });
    await newCard.save();

    return newCard;
  };

  updateCard = async (
    card,
    { title, description, member, dueDate, avatar, attachment }
  ) => {
    console.log(card);
    card.title = title;
    card.description = description;
    if (dueDate) {
      card.dueDate = dueDate;
    }
    if (avatar) {
      card.avatar = avatar;
    }
    if (attachment) {
      card.attachment = attachment;
    }
    if (member) {
      card.member = member;
    }
    await card.save();

    return card;
  };

  deleteCard = async (card) => {
    card.deleted_at = new Date();
    await card.save();
  };

  getDetailCards = async (card) => {
    const cards = await Card.findOne({ _id: card._id, deleted_at: null });
    return cards;
  };
}

module.exports = new CardService();
