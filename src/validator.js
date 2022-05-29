const validateBookPayload = ({
  name,
  year,
  author,
  summary,
  publisher,
  pageCount,
  readPage,
  reading
}, isUpdate = false) => {
  const operation = isUpdate ? 'memperbarui' : 'menambahkan'
  // mandatory validation
  if (!name) {
    return `Gagal ${operation} buku. Mohon isi nama buku`
  }
  if (!year) {
    return `Gagal ${operation} buku. Mohon isi tahun terbit buku`
  }
  if (!author) {
    return `Gagal ${operation} buku. Mohon isi penulis buku`
  }
  if (!summary) {
    return `Gagal ${operation} buku. Mohon isi ringkasan buku`
  }
  if (!publisher) {
    return `Gagal ${operation} buku. Mohon isi penerbit buku`
  }
  if (pageCount === undefined || pageCount === '') {
    return `Gagal ${operation} buku. Mohon isi jumlah halaman buku`
  }
  if (readPage === undefined || readPage === '') {
    return `Gagal ${operation} buku. Mohon isi jumlah halaman yang sudah dibaca`
  }
  if (reading === undefined || reading === '') {
    return `Gagal ${operation} buku. Mohon isi status reading`
  }

  // additional validation
  if (readPage > pageCount) {
    return `Gagal ${operation} buku. readPage tidak boleh lebih besar dari pageCount`
  }

  return null
}

module.exports = {
  validateBookPayload
}
