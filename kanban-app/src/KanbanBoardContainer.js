import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import {throttle} from './utils';

import 'whatwg-fetch';
import 'babel-polyfill';


//const API_URL = "http://kanbanapi.pro-react.com";
const API_URL = "https://raw.githubusercontent.com/HomerSim/react/master/kanban-app/src/json/kanbandb.json";

const API_HEADERS = {
    'Content-Type' : 'application/json',
   
};
// 다음단계 넘어가기전에 처리하자........

class KanbanBoardContainer extends Component {
    constructor(){
        super(...arguments);
        this.state = {
            cards:[],
        };
        // 인수가 변경된 경우에만 updatecardStatus 를 호출한다. 
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        // 최대 500ms 마다 (또는 인수가 변경된 경우) updateCardPosition을 호출한다. 
        this.updatecardPosition = throttle(this.updateCardPosition.bind(this), 500);
    }

    componentDidMount() {

        fetch(API_URL)
        .then(response => response.json())
        .then((responseData) => {
            this.setState({cards:responseData})
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error);
        })
    }

    addTask(cardId, taskName) {
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let newTask = {id:Date.now(), name:taskName, done:false};

        let cards = this.state.cards;
        let card = cards[cardIndex];
            card.tasks.push(newTask);
        
        this.setState({
            cards:cards
        });

        /*
        // 새로운 객체를 생성하고 태스크의 배열로 새로운 태스크를 푸시한다. 
        let nextState = update(this.state.cards, {
            [cardIndex]:{
                tasks:{$push:[newTask]}
            }
        });
        
        this.setState({cards:nextState});

        fetch('${APP_URL}/cards/${cardId}/tasks', {
            method:'post',
            headers:API_HEADERS,
            body:JSON.stringify(newTask)
        })
        .then((response) => response.json())
        .then((responseData) => {
            newTask.id = responseData.id;
            this.setState({cards:nextState});
        });
        */
    }

    deleteTask(cardId, taskId, taskIndex) {
        
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);

        let cards = this.state.cards;
        let card = cards[cardIndex];
            card.tasks.splice(taskIndex,1);
        
        this.setState({
            cards:cards
        });
        
        /*
        let nextState = update(this.state.cards, {
            [cardIndex]:{
                tasks:{$splice : [[taskIndex,1]]}
            }
        });

        this.setState({cards:nextState});
        // api를 호출해 서버에서 해당 태스크를 제거한다. 
        fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
            method:'delete',
            headers:API_HEADERS
        });
        */
    }

    toggleTask(cardId, taskId, taskIndex) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
   
        let cards   = this.state.cards;
        let card    = cards[cardIndex];
        let task    = card.tasks[taskIndex];

        let done = !task.done;
            task.done = done;

        this.setState({
            cards
        });
        
        /*
        let newDoneValue;
        let nextState = update(this.state.cards, {
            [cardIndex]:{
                tasks:{
                    [taskIndex]:{
                        done: {
                            $apply:(done)=>{
                                newDoneValue = !done
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });
        
       this.setState({cards:nextState});

       fetch('${API_URL}/cards/${cardId}/tasks/${taskId}', {
           method: 'put',
           headers:API_HEADERS,
           body:JSON.stringify({done:newDoneValue})
       });
       */
    }

    updateCardStatus(cardId, listId) {
        let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
        
        let card = this.state.cards[cardIndex];
        if (card.status !== listId) {
            this.setState(update(this.state, {
                cards : {
                    [cardIndex] : {
                        status : {$set:listId}
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId, afterId) {
        // 다른 카드 위로 드래그 할 떄만 진행한다.
        if(cardId !== afterId) {
            // 카드의 인덱스를 찾느다.
            let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
            // 현재 카드를 얻는다.
            let card = this.state.cards[cardIndex];
            //마우스로 가리키는 카드의 인덱스를 찾느다.
            let afterIndex = this.state.cards.findIndex((card) => card.id === afterId);
            // splice를 이용해 카드를 제거한 후 새로운 인덱스 위치로 삽입한다. 
            this.setState(update(this.state, {
                cards : {
                    $splice : [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    persistCardDrag (cardId, status) {
        //카드의 인덱스를 찾는다.
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        //현재 카드를 얻는다. 
        let card = this.state.cards[cardIndex];

        // 이거 서버응답 하는 부분인데... 이부분은 쓰지말자... 저쪽 서버가 닫혀있음...

    }


    render(){
        return <KanbanBoard cards={this.state.cards}
                    taskCallbacks={{
                        toggle:this.toggleTask.bind(this),
                        delete:this.deleteTask.bind(this),
                        add:this.addTask.bind(this)
                    }}
                    
                    cardCallbacks={{
                        updateStatus : this.updateCardStatus,
                        updatePosition : this.updateCardPosition,
                        persistCardDrag : this.persistCardDrag.bind(this)
                    }}    
                ></KanbanBoard>
    }
}

export default KanbanBoardContainer;