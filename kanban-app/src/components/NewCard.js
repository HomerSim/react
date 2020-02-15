import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CardForm from './CardForm';


class NewCard extends Component {


    componentDidMount() {
        console.log(2);
        console.log(this.props);

    }

    componentWillMount() {
        this.setState({
            id:Date.now(),
            title:'',
            description:'',
            status:'todo',
            color:'#c9c9c9',
            tasks:[]
        });
        console.log(1);
        console.log(this.props);
        
    }

    handleChange(field, value) {
        this.setState({[field]:value});
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props);
        
        //this.props.cardModal.cardCallbacks.addCard(this.state);
       // this.addCard(this.state);
        //this.props.cardCallbacks.addCard(this.state);
        //this.props.history.push('/');
    }

    handleClose(e) {
        //this.props.history.pushState(null, '/'); // 이게 아니라 아래처럼 사용해야함 V4
        this.props.history.push('/');
    }

    

    render() {
        
        return (
            <CardForm draftCard={this.state}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} 
            />
        );
    }
}


NewCard.propTypes = {
    cardCallbacks:PropTypes.object,
}

export default NewCard;