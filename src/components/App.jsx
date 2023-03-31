import { Component } from "react";
import { ContactForm } from "./Phonebook/ContactForm";
import { ContactList } from "./Phonebook/ContactList";
import { Filter } from "./Phonebook/Filter";
import css from './Phonebook/Phonebook.module.css';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
    this.localStorageKey = 'addedContacts';
  }

  componentDidMount() {
    this.contactsArray = JSON.parse(localStorage.getItem(this.localStorageKey)) || []
    if(this.contactsArray.length > 0) {
      this.setState(({ contacts }) => ({
        contacts: [...this.contactsArray],
      }));
    }
  }

  addContact = event => {
    const loweredCase = event.name.toLowerCase().trim();

    const exists = this.state.contacts.some(
      contact => contact.name.toLowerCase().trim() === loweredCase
    );

    if (exists) {
      alert(`${event.name} is already in contacts!`);
    } else {
      this.contactsArray.push(event)
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.contactsArray))
      this.setState(({ contacts }) => ({
        contacts: [...contacts, event],
      }));
    }
  };

  addFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    this.contactsArray = this.contactsArray.filter(contact => contact.id !== id)
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.contactsArray))
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  }

  render() {
    const { filter } = this.state;

    return (
      <section>
        <div className={css.phonebook__card}>
          <ContactForm addContact={this.addContact} />
          <ContactList
            contacts={this.filteredContacts()}
            deleteContact={this.deleteContact}
          >
            <Filter filter={filter} addFilter={this.addFilter} />
          </ContactList>
        </div>
      </section>
    );
  }
}
