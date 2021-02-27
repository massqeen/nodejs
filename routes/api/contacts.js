const express = require('express')
const router = express.Router()
const validate = require('./validation')
const contactsController = require('../../controllers/contacts')

router
  .get('/', contactsController.getAll)
  .post('/', validate.createContact, contactsController.create)

router
  .get('/:id', validate.id, contactsController.getById)
  .delete('/:id', validate.id, contactsController.remove)
  .patch('/:id', validate.id, validate.updateContact, contactsController.update)

module.exports = router
