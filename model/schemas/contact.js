const { Schema, model } = require('mongoose')

const contactSchema = new Schema(
  {
    name: {
      type: String,
      min: 2,
      max: 20,
      required: [true, 'Set name for the contact'],
    },
    email: {
      type: String,
      min: 6,
      max: 20,
      required: [true, 'Set email for the contact'],
      unique: true,
    },
    phone: {
      type: String,
      min: 6,
      max: 15,
      unique: true,
    },
  },
  { versionKey: false, timestamps: true }
)

const Contact = model('contact', contactSchema)

module.exports = Contact
