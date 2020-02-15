import React, {Component} from 'react';
import {DndProvider} from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import List from './List';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


class KanbanBoard extends Component {
/*    render () {
      return (
          <div className="app">
            <DndProvider backend={HTML5Backend}>
              <List id="todo" title="TO DO" 
                  taskCallbacks={this.props.taskCallbacks}
                  cardCallbacks={this.props.cardCallbacks}
                  cards={this.props.cards.filter((card) => card.status === "todo")
              }></List>

              <List id="in-progress" title="In Progress" 
                  taskCallbacks={this.props.taskCallbacks} 
                  cardCallbacks={this.props.cardCallbacks}
                  cards={this.props.cards.filter((card) => card.status === "in-progress")
              }></List>

              <List id="done" title="Done" 
                  taskCallbacks={this.props.taskCallbacks} 
                  cardCallbacks={this.props.cardCallbacks}
                  cards={this.props.cards.filter((card) => card.status === "done")
              }></List>
            </DndProvider>
          </div>
        
      );
    }
  */
    render () {
      
      return (
          <div>
            <div className="app">
              <Link to="/new" className="float-button">+</Link>
              <DndProvider backend={HTML5Backend}>
                <List id="todo" title="TO DO" 
                      taskCallbacks={this.props.taskCallbacks}
                      cardCallbacks={this.props.cardCallbacks}
                      cards={this.props.cards.filter((card) => card.status === "todo")
                  }></List>

                  <List id="in-progress" title="In Progress" 
                      taskCallbacks={this.props.taskCallbacks} 
                      cardCallbacks={this.props.cardCallbacks}
                      cards={this.props.cards.filter((card) => card.status === "in-progress")
                  }></List>

                  <List id="done" title="Done" 
                      taskCallbacks={this.props.taskCallbacks} 
                      cardCallbacks={this.props.cardCallbacks}
                      cards={this.props.cards.filter((card) => card.status === "done")
                  }></List> 
              </DndProvider>
             
            </div>
          </div>
      );
    }
    

  }
  
KanbanBoard.propType = {
  cards : PropTypes.arrayOf(PropTypes.object),
  taskCallbacks : PropTypes.object,
  cardCallbacks : PropTypes.object

}

export default KanbanBoard;
