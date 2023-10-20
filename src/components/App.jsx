import React, { useState, useEffect } from 'react';
import { PhoneForm } from './Phonebook/PhoneForm';
import { ListItem } from './Phonebook/FormList';
import { nanoid } from 'nanoid';
import { Container } from './App.style';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactFilter, setContactFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
