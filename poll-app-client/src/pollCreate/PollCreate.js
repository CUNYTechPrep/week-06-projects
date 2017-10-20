import React, { Component } from 'react';
import ChoiceComponent from '../pollCreateForm/ChoiceComponent';

class PollCreate extends Component {
    constructor() {
        super();
        this.state = {
            poll: {
                question: "",
                choices: []
            },
            choicesComponent: [],
            index: 0,
            questionID: ""
        }
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleChoices = this.handleChoices.bind(this);
        this.addAChoice = this.addAChoice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleQuestion(event) {
        const fieldName = event.target.name;
        const poll = this.state.poll;
        poll[fieldName] = event.target.value;

        this.setState({ poll });
        console.log(this.state.poll.question);
    }

    handleChoices(event) {
        const key = event.target.key;
        const poll = this.state.poll;
        poll['choices'][key] = event.target.value;
        console.log(this.state.poll.choices[key]);
        this.setState({ poll });
    }

    addAChoice() {
        const choices = this.state.choicesComponent;
        this.setState({ index: this.state.index + 1 });
        console.log(this.state.index);
        choices.push(<ChoiceComponent key={this.state.index} handleChoice={this.handleChoices} />)
        this.setState({ choicesComponent: choices });
    }

    onSubmit(event) {
        event.preventDefault();
        console.log("hi posting...");
        console.log(this.state.poll.question);
        let questionID;
        fetch('http://localhost:8000/polls', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: this.state.poll.question
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((jsonBody) => {
                this.setState({ questionID: jsonBody.id });
                questionID = jsonBody.id
                console.log(this.state.questionID);
                fetch('http://localhost:8000/polls/' + questionID + '/choices', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        description: 'choice1'
                    })
                })
                    .then((res) => {
                        //console.log(res);
                        return res.json();
                    })
                    .then((jsonBody) => {
                        console.log(jsonBody);
                        //this.setState({ questionID: jsonBody.id });
                        //console.log(this.state.questionID);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })



    }

    render() {
        return (
            <div className="container">
                <div className="col-md-12">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label htmlFor="Question">Question: </label><br />
                            <input type="text" className="form-control" name="question"
                                placeholder="Enter a question" onChange={this.handleQuestion}></input> <br />
                            <label htmlFor="Choices">Choices: </label><br />
                            <div>
                                {this.state.choicesComponent}
                            </div>
                            <button type="button" className="btn btn-default btn-lg pull-right" onClick={this.addAChoice}>
                                <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            </button>
                            <br />
                            <input type="submit" value="Submit" className="btn btn-primary"></input>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


}

export default PollCreate;