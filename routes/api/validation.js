const Joi = require('joi')
const mongoose = require('mongoose')
const phoneJoi = Joi.extend(require('joi-phone-number'))

const schemaCreateContact = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  phone: phoneJoi
    .string()
    .phoneNumber({
      defaultCountry: 'UA',
      format: 'international',
      strict: true,
    })
    .required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(20).optional(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional(),
  phone: phoneJoi.string().phoneNumber().optional(),
}).min(1)

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
    })
  }
  next()
}

module.exports.id = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid object id')
  }
  next()
}

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
