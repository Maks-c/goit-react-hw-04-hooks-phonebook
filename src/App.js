import {useState, useEffect} from "react";
import {nanoid} from "nanoid";
import Form from "./Compounents/Form";
import Contacts from "./Compounents/Contacts";
import Filter from "./Compounents/Filter";
import LocalStorageHooks from "./Hooks";
//===========================================
import {AppWrapper, MainHead} from "./AppStyle";

const App = () => {

    const [contacts, setContacts] = LocalStorageHooks('contacts', [])
    const [filter, setFilter] = useState('')

    const formSubmitHandler = (name, number) => {
        const newContact = {id: nanoid(), name, number}
        contacts.some(contact => contact.name === name) ? alert(`${name} is already in contacts!`) :
            setContacts(state => [...state, newContact])
    }

    const handleFilterChange = (e) => {
        setFilter(e.currentTarget.value)
    }

    const deleteContact = (contactId) => {
        setContacts(contacts.filter((contact) => contact.id !== contactId))
    }

    const visibleContacts = () => {
        return contacts.filter((contacts) => contacts.name.toLowerCase().includes(filter.toLowerCase().trim()))
    }

    const showContact = visibleContacts()

    return (

        <AppWrapper>
            <MainHead>Phonebook</MainHead>
            <Form onSubmit={formSubmitHandler}/>
            <h2>Contacts</h2>
            <Contacts contacts={showContact} onDelete={deleteContact}/>
            <Filter value={filter} onChange={handleFilterChange}/>
        </AppWrapper>
    )


}

export default App;
