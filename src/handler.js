const { nanoid } = require('nanoid')
const books = require('./books')
const { respSuccess, respError } = require('./helper')
const { validateBookPayload } = require('./validator')

const getBooksHandler = (req, h) => {
	try {
		const {
			name,
			reading,
			finished
		} = req.query

		// filtering properties to be returned
		let filteredBooks = books
			.map((book) => {
				return {
					id: book.id,
					name: book.name,
					publisher: book.publisher
				}
			})

		// applied additional filters
		if (name)
			filteredBooks = filteredBooks
				.filter((book) => {
					return (book.name.toLowerCase().includes(name.toLowerCase()))
				})
		if (reading)
			filteredBooks = filteredBooks
				.filter((book) => {
					return book.reading == (reading == 1)
				})
		if (finished)
			filteredBooks = filteredBooks
				.filter((book) => {
					return book.finished == (finished == 1)
				})

		return h.response(respSuccess({
			books: filteredBooks
		}))
	} catch (err) {
		console.log(err)
		return h.response(respError('Buku gagal didapatkan'))
			.code(500)
	}
}

const getBookByIdHandler = (req, h) => {
	try {
		const { id } = req.params
		const book = books.find((item) => item.id === id)

		if (book)
			return h.response(respSuccess({ book }))
		else
			return h.response(respError('Buku tidak ditemukan'))
				.code(404)
	} catch (err) {
		console.error(err)
		return h.response(respError('Buku gagal didapatkan'))
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

		const validationError = validateBookPayload(req.payload)
		if (validationError)
			return h.response(respError(validationError))
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

		return h.response(respSuccess({
			bookId: id
		}, 'Buku berhasil ditambahkan'))
			.code(201)
	} catch (err) {
		console.log(err)
		return h.response(respError('Buku gagal ditambahkan'))
			.code(500)
	}
}

const updateBookHandler = (req, h) => {
	try {
		const { id } = req.params
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

		const validationError = validateBookPayload(req.payload, true)
		if (validationError)
			return h.response(respError(validationError))
				.code(400)

		const bookIndex = books.findIndex((item) => item.id === id)
		const updatedAt = new Date().toISOString()

		if (bookIndex !== -1) {
			books[bookIndex] = {
				...books[bookIndex],
				name,
				year,
				author,
				summary,
				publisher,
				pageCount,
				readPage,
				reading,
				updatedAt
			}
			return h.response(respSuccess(null, 'Buku berhasil diperbarui'))
		} else
			return h.response(respError('Gagal memperbarui buku. Id tidak ditemukan'))
				.code(404)
	} catch (err) {
		console.log(err)
		return h.response(respError('Buku gagal diedit'))
			.code(500)
	}
}

const deleteBookHandler = (req, h) => {
	try {
		const { id } = req.params
		const bookIndex = books.findIndex((item) => item.id === id)

		if (bookIndex !== -1) {
			books.splice(bookIndex, 1)
			return h.response(respSuccess(null, 'Buku berhasil dihapus'))
		} else
			return h.response(respError('Buku gagal dihapus. Id tidak ditemukan'))
				.code(404)
	} catch (err) {
		console.log(err)
		return h.response(respError('Buku gagal dihapus'))
			.code(500)
	}
}

module.exports = {
	getBooksHandler,
	getBookByIdHandler,
	createBookHandler,
	updateBookHandler,
	deleteBookHandler
}