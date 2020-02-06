import React, {Component} from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

class List extends Component {
    render () {
        var cards = this.props.cards.map((card) => {
            return <Card id={card.id}
                        title={card.title}
                        description={card.description}
                        color={card.color}
                        tasks={card.tasks}
                        key={card.id}
                        taskCallbacks={this.props.taskCallbacks}
                        cardCallbacks={this.props.cardCallbacks}
                    />
        });

      return (
        <div className="list">
            <h1>{this.props.title}</h1>
            {cards}
            
        </div>
      );
    }
  }
  
  List.propTypes = {
    title:PropTypes.string.isRequired,
    cards : PropTypes.arrayOf(PropTypes.object),
    taskCallbacks:PropTypes.object,
    cardCallbacks:PropTypes.object
  }

  export default List;