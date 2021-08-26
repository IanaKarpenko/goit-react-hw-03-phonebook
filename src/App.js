import './App.css';
import { Component } from 'react';
import { ContactForm } from './components/ContactForm';
import { v4 as uuidv4 } from 'uuid';
import { ContactList } from './components/ContactList';
import { Filter } from './components/Filter';

class App extends Component {

  state = {
    contacts: [],
    filter: ''
  }

  componentDidMount() {
    const existingContacts = localStorage.getItem('contacts') ? JSON.parse(localStorage.getItem('contacts')) : [];
    this.setState({ contacts: existingContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    const prevContacts = prevState.contacts;
    if (contacts != prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === name)) {
      alert(name + ' is already in contacts');
      return;
    }
    const contact = { id: uuidv4(), name: name, number: number };
    this.setState(({ contacts }) => ({contacts: [...contacts, contact]}));
  }



  changeFilter = (evt) => {
    this.setState({ filter: evt.target.value });
  }

  getFilteredArray = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact => contact.name.toUpperCase().includes(filter.toUpperCase()),0);
  }

  deleteContact = (evt) => {
    const nameForDelete = evt.target.name;
    this.setState((prevState) => (
      { contacts: prevState.contacts.filter(contact => contact.name !== nameForDelete) }
    ));
  }

  render() {
    const { filter } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Phonebook</h1>
          <ContactForm onClick={this.addContact} />
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter}/>
          <ContactList contacts={this.getFilteredArray()} onDelete={this.deleteContact} />
        </header>
      </div>
    );
  }
}

export default App;
