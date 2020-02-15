import React, {Component} from 'react';

import './App.css';
//import KanbanBoard from './KanbanBoard';

import KanbanBoardContainer from './components/KanbanBoardContainer';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import NewCard from './components/NewCard';
import EditCard from './components/EditCard';


/*
let cardsList = [
  {
    id : 1,
    title : 'Read the Book',
    description : 'I should read the **whole** book',
    color: '#BD8D31',
    status : 'in-progress',
    tasks : []
  },
  {
    id : 2,
    title : 'Write som code',
    description : 'Code along with the samples in the book. The complete source can be fond at [github](https://github.com/homersim)',
    color: '#3A7E28',
    status : 'todo',
    tasks : [
      {
        id : 1,
        name : 'ContactList Example',
        done: true
      },
      {
        id : 2,
        name : 'Kanban Example',
        done: false
      },
      {
        id : 3,
        name : 'My own experiments',
        done: false
      }
    ]
  },
];
*/
class App extends Component {
  /*render () {
    return (
      <KanbanBoardContainer></KanbanBoardContainer>
      
      //<KanbanBoard cards={cardsList}>Hello ~ Homersim</KanbanBoard>
      
    );
  }*/



  render (){
    return(
      <Router>
          <Route path="/" component={KanbanBoardContainer} />
          <Route path="/new"   render={(props) => <NewCard {...props}></NewCard>} />  
          <Route path="/edit/:card_id" component={EditCard} />        
        
      </Router>
    );
  }
  /*
  render (){
    return(
      <Router>
        <Route component={KanbanBoardContainer}>
            <Route path="/" component={KanbanBoard}>
                <Route path="new" component={NewCard} />
                <Route path="edit/:card_id" component={EditCard} />
            </Route>
        </Route>
      </Router>
    );
  }
  */
}


export default App;
