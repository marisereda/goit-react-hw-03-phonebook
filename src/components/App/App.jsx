import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from 'components/GlobalStyle';
import { Box } from 'components/Box';
import { Section } from 'components/Section';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { theme } from 'constants';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // --------------------------------
  addContact = ({ name, number }) => {
    const seekingName = name.toLowerCase().trim();
    const foundName = this.state.contacts.find(
      contact => contact.name.toLowerCase().trim() === seekingName
    );

    if (foundName) {
      return alert(`${name} is already in contacts`);
    }

    const newContact = {
      id: nanoid(),
      name: name.trim(),
      number: number.trim(),
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  // --------------------------------
  deleteContact = id => {
    this.setState(prevState => {
      const contacts = prevState.contacts.filter(contact => contact.id !== id);
      return { contacts };
    });
  };

  // --------------------------------
  handleChangeFilter = e => {
    const filter = e.target.value.toLowerCase();
    this.setState({ filter });
  };

  // --------------------------------
  getFilteredContacts = () => {
    let { contacts, filter } = this.state;
    filter = filter.trim();
    return filter
      ? contacts.filter(contact => contact.name.toLowerCase().includes(filter))
      : contacts;
  };

  // --------------------------------
  render() {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        flexDirection="column"
        justifyContent="center"
        alignItems="flex-start"
        padding={6}
      >
        <Section title="Phonebook" bgColor={theme.colors.bgLight}>
          <ContactForm addContact={this.addContact} />
        </Section>

        <Section title="Contacts" bgColor={theme.colors.bgPrimary}>
          <Filter
            handleChangeFilter={this.handleChangeFilter}
            filterValue={this.state.filter}
          />
          <ContactList
            filteredContacts={this.getFilteredContacts()}
            deleteContact={this.deleteContact}
          />
        </Section>

        <GlobalStyle />
      </Box>
    );
  }
}
