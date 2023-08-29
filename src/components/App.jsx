import React, { useState } from 'react';
import { PhoneForm } from './Phonebook/PhoneForm';
import { ListItem } from './Phonebook/FormList';
import { nanoid } from 'nanoid';
import { Container } from './App.style';

export const App = () => {
  const [contacts, setContacts] = useState([
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ]);
  const [contactFilter, setContactFilter] = useState('');

  const addItem = newItem => {
    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === newItem.name.toLowerCase()
    );

    if (existingContact) {
      alert(`${newItem.name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: newItem.name,
      number: newItem.number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const changeContactFilter = newFilter => {
    setContactFilter(newFilter);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContactItems = contacts.filter(contact =>
    contact.name.toLowerCase().includes(contactFilter.toLowerCase())
  );

  return (
    <Container>
      <PhoneForm onAdd={addItem} />
      <ListItem
        contacts={visibleContactItems}
        contactFilter={contactFilter}
        onChangeContact={changeContactFilter}
        onDeleteContact={deleteContact}
      />
    </Container>
  );
};

export default App;
