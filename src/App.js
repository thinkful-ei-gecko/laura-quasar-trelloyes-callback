import React, { Component } from 'react';
import List from './List'
import './App.css';

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}

function omit(obj, keyToOmit) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) =>
        key === keyToOmit ? newObj : {...newObj, [key]: value},
    {}
  );
}

class App extends Component {
  static defaultProps = {

  };

  state = {
    lists: [],
    allCards: {},
  }

  componentDidMount() {
    this.setState( {
      lists: this.props.store.lists,
      allCards: this.props.store.allCards,
    })
  }

  handleDeleteCard = (item, list) => {
    console.log('card: ', item, "list: ", list)
    const Lists = this.state.lists.map((listNum) => {
      let cards = listNum.cardIds.filter((card) => card !== item);
      // listNum.cardIds = cards       <---- don't use this, this is mutating the array
      // return Object.assign({}, listNum, {cardIds: cards}) <----- react way
      return {...listNum, cardIds: cards}       // <----- alt react way
    })

    const allCardsCopy = {...this.state.allCards};
    const newCards = omit(allCardsCopy, item);
    console.log(newCards);
    console.log(`item we want to delete from cards: ${item}`);

    this.setState( {
      lists: Lists,
      allCards: newCards,
    })
  }

  handleAddCard = (listId) => {
    const myNewCard = newRandomCard();
    const newCardList = {...this.state.allCards, [myNewCard.id] : myNewCard };
    const lists = this.state.lists.map((list) => {
      if (list.id === listId) {
        list.cardIds.push(myNewCard.id)
    } 
    return list;
    });
    this.setState ({
      allCards : newCardList,
      lists
    })
    console.log(newCardList);
  }

  render() {


    // const { store } = this.props
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list' >
          {this.state.lists.map(list => (
            <List
              onAdd = {() => this.handleAddCard(list.id)}
              onDelete={(item) => this.handleDeleteCard(item, list.id)}
              key={list.id}
              id = {list.id}
              header={list.header}
              cards={list.cardIds.map(id => this.state.allCards[id])}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
