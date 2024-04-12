import prisma from "../db/db.js";
import message from "../config/message.js";

const { book, error } = message;

export const add = async (req, res) => {
  try {
    const { id } = req.user;
    const {
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
    } = req.body;

    

    if (
      (name ||
        description ||
        no_of_page ||
        author ||
        category ||
        price ||
        released_year) === undefined
    ) {
      return res
        .status(400)
        .json({ success: false, message: error.allFieldRequired });
    }
    await prisma.book.create({data:{
      name,
      description,
      no_of_page:parseInt(no_of_page),
      author,
      category,
      price:parseFloat(price),
      released_year:parseInt(released_year),
      userId: id,
    }});
    return res.status(201).json({ success: true, message: book.newBookCreate });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const { id } = req.user;
    const bookList = await prisma.book.findMany({
      where: {
        userId: id,
      },
    });

    if (!bookList) {
      return res.status(404).json({ message: book.bookNotFound });
    }
    return res.status(200).json({ AllBook: bookList });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.user;
    const _id = Number(req.params.id);
    const bookDetail = await prisma.book.findFirst({
      where: { userId: id, id: _id },
    });
    if (!bookDetail) {
      return res.status(404).json({ message: book.bookNotFound });
    }
    return res.status(200).json({ Book: bookDetail });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.user;
    const _id = Number(req.params.id);
    const {
      name,
      description,
      no_of_page,
      author,
      category,
      price,
      released_year,
    } = req.body;

    const updateBook = await prisma.book.update({
      where: { userId: id, id: _id },
      data: {
        name,
        description,
        no_of_page,
        author,
        category,
        price,
        released_year,
      },
    });
    if (!updateBook) {
      return res.status(404).json({ message: book.bookNotFound });
    }
    return res.status(200).json({ message: book.updateBook });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.user;
    const _id = Number(req.params.id);

    const deleteBook = await prisma.book.delete({
      where: { userId: id, id: _id },
    });
    if (!deleteBook) {
      return res.status(404).json({ message: book.bookNotFound });
    }
    return res.status(200).json({ message: book.deleteBook });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
