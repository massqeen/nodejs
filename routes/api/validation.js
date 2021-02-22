const Joi = require('joi')
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
})

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

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
