const { nanoid } = require('nanoid')
const books = require('./books')
const { responseSuccess, responseError } = require('./response')

const getAllBooksHandler = (_, h) => {
    try {
        return {
            books
        }
    } catch (err) {
        console.log(err)
        return h.responseError("Buku gagal didapatkan")
            .code(500)
    }
}

const getSpecificBookHandler = (req, h) => {
    try {
        const { id } = req.params
        const book = books.filter((item) => item.id == id)

        if (book)
            return h.response({ book })
        else
            return h.responseError("Buku tidak ditemukan")
                .code(404)
    } catch (err) {
        console.error(err)
        return h.response(responseError("Buku gagal didapatkan"))
            .code(500)
    }
}

const createBookHandler = (req, h) => {
    try {
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        } = req.payload

        // mandatory validation
        if (!name)
            return h.response(responseError("Gagal menambahkan buku. Mohon isi nama buku"))
                .code(400)
        if (!year)
            return h.response(responseError("Gagal menambahkan buku. Mohon isi tahun terbit buku"))
                .code(400)
        if (!author)
            return h.response(responseError("Gagal menambahkan buku. Mohon isi penulis buku"))
                .code(400)
        if (!summary)
            return h.response(responseError("Gagal menambahkan buku. Mohon isi ringkasan buku"))
                .code(400)
        if (!publisher)
            return h.response(responseError("Gagal menambahkan buku. Mohon isi penerbit buku"))
                .code(400)
        if (!pageCount)
            return h.response(responseError("Gagal menambahkan buku. Mohon isi jumlah halaman buku"))
                .code(400)
        if (!readPage)
            return h.response(responseError("Gagal menambahkan buku. Mohon isi jumlah halaman yang sudah dibaca"))
                .code(400)
        if (reading !== false || reading !== true)
            return h.response(responseError("Gagal menambahkan buku. Mohon isi status membaca"))
                .code(400)

        // advance validation
        if (typeof (year) !== 'number')
            return h.response(responseError("Gagal menambahkan buku. Tahun terbit harus berisi angka"))
                .code(400)
        if (typeof (pageCount) !== 'number')
            return h.response(responseError("Gagal menambahkan buku. Jumlah Halaman harus berisi angka"))
                .code(400)
        if (typeof (readPage) !== 'number')
            return h.response(responseError("Gagal menambahkan buku. Jumlah Halaman yang dibaca harus berisi angka"))
                .code(400)
        if (year.toString().length < 4)
            return h.response(responseError("Gagal menambahkan buku. Tahun terbit tidak valid"))
                .code(400)
        if (pageCount < 0)
            return h.response(responseError("Gagal menambahkan buku. Jumlah Halaman tidak valid"))
                .code(400)
        if (readPage < 0)
            return h.response(responseError("Gagal menambahkan buku. Jumlah Halaman yang dibaca tidak valid"))
                .code(400)
        if (readPage > pageCount)
            return h.response(responseError("Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"))
                .code(400)

        // processing additional datas and adding new book
        const id = nanoid(16)
        const insertedAt = new Date().toISOString()
        const updatedAt = insertedAt
        const finished = readPage === pageCount

        const newBook = {
            id,
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            insertedAt,
            updatedAt,
        }
        books.push(newBook)

        return h.response(responseSuccess({
            bookId: id
        }, "Buku berhasil ditambahkan"))
            .code(201)
    } catch (err) {
        console.log(err)
        return h.response(responseError("Buku gagal ditambahkan"))
            .code(500)
    }
}

const updateBookHandler = (req, h) => { }

const deleteBookHandler = (req, h) => { }

module.exports = {
    getAllBooksHandler,
    getSpecificBookHandler,
    createBookHandler,
    updateBookHandler,
    deleteBookHandler
}