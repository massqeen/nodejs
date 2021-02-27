const Contact = require('./schemas/contact')

const getAll = async () => await Contact.find({})

const getById = async (id) => await Contact.findOne({ _id: id })

const create = async (body) => await Contact.create(body)

const update = async (id, body) =>
  await Contact.findByIdAndUpdate({ _id: id }, { ...body }, { new: true })

const remove = async (id) => await Contact.findByIdAndRemove({ _id: id })

module.exports = {
  getAll,
  getById,
  remove,
  create,
  update,
}
