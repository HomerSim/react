import React, {Component} from 'react';
import List from './List';
import PropTypes from 'prop-types';


class KanbanBoard extends Component {
    render () {
      return (
        <div className="app">
            <List id="todo" title="TO DO" cards={
                this.props.cards.filter((card) => card.status === "todo")
            }></List>

            <List id="in-progress" title="In Progress" cards={
                this.props.cards.filter((card) => card.status === "in-progress")
            }></List>

            <List id="done" title="Done" cards={
                this.props.cards.filter((card) => card.status === "done")
            }></List>
        </div>
      );
    }
  }
  
KanbanBoard.propType = {
  cards : PropTypes.arrayOf(PropTypes.object)
}

  export default KanbanBoard;