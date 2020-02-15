import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import update from 'react-addons-update';
import {throttle} from '../utils';

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

    addCard(card) {
        console.log(card);
        // 낙관적인 UI 변경을 되돌려야 하는 경우를 대비해 
        // 변경하기 전 원래 상태에 대한 참조를 저장한다.
        let prevState = this.state;

        //  카드에 임시 ID를 부여한다. 
        if (card.id === null) {
            let card = Object.assign({}, card, {id:Date.now()});
        }

        // 새로운 객체를 생성화고 카드의 배열로 새로운 카드를 푸시한다. 
        let nextState = update(this.state.cards, {$push:[card]});

        // 변경된 객체로 컴포넌트 상태를 설정한다. 
        this.setState({cards:nextState});

        // API를 호출해 서버에 카드를 추가한다.
        // 이건 안함 ~ 

    }

    updateCard(card) {
        // 낙관적인 UI 변경을 되돌려야 하는 경우를 대비해
        // 변경하기 전 원래 상태에 대한 참조를 저장한다. 
        let prevState = this.state;

        // 카드의 인덱스를 찾는다. 
        let cardIndex = this.state.cards.findIndex((c) => c.id === card.id);

        // $set 명령을 이용해 카드 전체를 변경한다. 
        let nextState = update(
            this.state.cards, {
                [cardIndex] : {$set:card}
            }
        );

        // 변경된 객체로 컴포넌트 상태를 설정한다. 
        this.setState({cards:nextState});

        // 서버통신은 안해 ~ 
    }

    render(){
        let cardCall = {
            addCard : this.addCard.bind(this),
            updateCard : this.updateCard.bind(this),
            updateStatus : this.updateCardStatus.bind(this),
            updatePosition : this.updateCardPosition.bind(this),
            persistCardDrag : this.persistCardDrag.bind(this)
        };

        return (
                <div>
                    <KanbanBoard cards={this.state.cards}
                        taskCallbacks={{
                            toggle:this.toggleTask.bind(this),
                            delete:this.deleteTask.bind(this),
                            add:this.addTask.bind(this)
                        }}
                        
                        cardCallbacks={{
                            addCard : this.addCard.bind(this),
                            updateCard : this.updateCard.bind(this),
                            updateStatus : this.updateCardStatus.bind(this),
                            updatePosition : this.updateCardPosition.bind(this),
                            persistCardDrag : this.persistCardDrag.bind(this)
                        }}    
                    ></KanbanBoard>
                </div>
        )
    }
/*
    render (){
        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards:this.state.cards,
            taskCallbacks:{
                toggle:this.toggleTask.bind(this),
                delete:this.deleteTask.bind(this),
                add:this.addTask.bind(this)                
            },
            cardCallbacks:{
                addCard:this.addCard.bind(this),
                updateCard : this.updateCard.bind(this),
                updateStatus : this.updateCardStatus.bind(this),
                updatePosition : this.updateCardPosition.bind(this),
                persistCardDrag : this.persistCardDrag.bind(this)
            }
        });

        return kanbanBoard;
    }*/
 }


export default (KanbanBoardContainer);