const path = require('path')
const fs = require('fs/promises')

const contactsPath = path.resolve('./db/contacts.json')

async function listContacts() {
  try {
    console.log(contactsPath)
    const res = await fs.readFile(contactsPath)
    console.table(JSON.parse(res))
  } catch (error) {
    // handleError(error);
  }
}

async function getContactById(contactId) {
  try {
    const res = await fs.readFile(contactsPath)
    const data = JSON.parse(res)
    const contact = data.find((contact) => contact.id === contactId)
    if (!contact) {
      console.log(`Id:${contactId} not found!`)
    } else {
      console.table([contact])
    }
  } catch (error) {
    // handleError(error);
  }
}

async function removeContact(contactId) {
  console.log(contactId)
  try {
    const res = await fs.readFile(contactsPath)
    const data = JSON.parse(res)
    const contacts = data.filter((contact) => contact.id !== contactId)

    if (contacts.length !== data.length) {
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

      console.log(`Contact with id: ${contactId} removed!`)
    } else {
      console.log(`No contact with such id:${contactId}`)
    }
  } catch (error) {
    // handleError(error)
  }
}

async function addContact(name, email, phone) {
  try {
    const res = await fs.readFile(contactsPath)
    const contacts = JSON.parse(res)

    contacts.push({ id: contacts.length + 1, name, email, phone })

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

    console.log('Contact added!')
  } catch (error) {
    // handleError(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}
