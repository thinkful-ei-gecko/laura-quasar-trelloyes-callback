import React, { Component } from 'react';
import List from './List'
import './App.css';

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
      if (listNum.id === list) {
        let cards = listNum.cardIds.filter((card) => card !== item);
        listNum.cardIds = cards
      }
      return listNum
    })
    
    this.setState( {
      lists: Lists,
    })
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
