import React, {Component} from 'react';
import List from './List';
import PropTypes from 'prop-types';


class KanbanBoard extends Component {
    render () {
      return (
        <div className="app">
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