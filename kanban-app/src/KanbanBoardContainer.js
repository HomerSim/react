import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';


//const API_URL = "http://kanbanapi.pro-react.com";
const API_URL = "https://yts.lt/api/v2/list_movies.json?sort_by=like_count";
const API_HEADERS = {
    'Content-Type' : 'application/json',
   
};

class KanbanBoardContainer extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            cards:[],
        };
    }

    componentDidMount() {

        fetch(API_URL)
        .then(response => response.json())
        .then((responseData) => {
            let data = responseData.data.movies;
            console.log(responseData.data.movies);
            this.setState({cards:data})
            
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error);
        })
    }

    render(){
        return <KanbanBoard cards={this.state.cards}></KanbanBoard>
    }
}

export default KanbanBoardContainer;