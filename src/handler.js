const { nanoid } = require('nanoid');
const books = require('./books');

const addBooks = (request, h) => {
  const { name, year, author, pageCount, readPage } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newBooks = {
    id,
    createdAt,
    updatedAt,
    name,
    year,
    author,
  };

  books.push(newBooks);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'data berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'data gagal ditambahkan, mohon isi header',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku, readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
};

module.exports = { addBooks };
