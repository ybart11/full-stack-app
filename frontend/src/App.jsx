import { useState, useEffect } from 'react'
import ContactList from './ContactList'
import './App.css'
import ContactForm from './ContactForm'

// resume on 1:14:25

function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Store the contact we are currently editing
  const [currentContact, setCurrentContact] = useState({})

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {

    // Flask server is running on 5000 
    const response = await fetch("http://127.0.0.1:5000/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  };

  // functions to toggle modal
  const closeModal = () => {
    setIsModalOpen(false)

    // set to empty when we close modal
    setCurrentContact({})
  }

  // arrow function syntax "= () => "
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  // what is happening when we actually perform update
  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
      <button onClick={openCreateModal}>Create Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
        </div>
      </div>
      }
    </>
  );
};

export default App
