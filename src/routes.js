const {
    getAllBookshelfsHandler,
    getSpecificBookshelfHandler,
    createBookshelfHandler,
    updateBookshelfHandler,
    deleteBookshelfHandler
} = require('./handler')

const routes = [
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookshelfsHandler
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getSpecificBookshelfHandler
    },
    {
        method: 'POST',
        path: '/books',
        handler: createBookshelfHandler
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: updateBookshelfHandler
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookshelfHandler
    },
]

module.exports = routes