const handleError = (err) => {
  console.error(err.message)
  process.exit(1)
}

module.exports = handleError
