// a component that allows us to create contacts
import { useState } from "react";

// updateCallback is a function we are going to call as soon as we performed any updates
const ContactForm = ({ existingContact = {}, updateCallback }) => {

    // content we want to store
    const [firstName, setFirstName] = useState(existingContact.firstName || "")
    const [lastName, setLastName] = useState(existingContact.lastName || "")
    const [email, setEmail] = useState(existingContact.email || "")

    // know if we are updating or creating
    const updating = Object.entries(existingContact).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault() // not refresh page auto

        // set up a POST request so we can actually create the contact; js obect
        const data = {
            firstName,
            lastName,
            email
        }

        // specify url endpoint where we want to go to
        const url = "http://127.0.0.1:5000/" + (updating ? `update_contact/${existingContact.id}` : "create_contact")

        // convert js object up top to json
        // setting options for request
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        // send request
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    // return the form
    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );

};

export default ContactForm