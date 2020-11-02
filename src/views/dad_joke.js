import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Row, Button, Form, Input} from 'reactstrap'
import './../assets/stylesheets/dad_joke.css';

class ClassName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: "",
            isLoading: false,
            joke: "...",
            jokeResults: [],
            history: [],
            maxLimit: 30

        }
        this.search = this.search.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
    }

    onChangeValue(e, data) {
        this.setState({
            [data]: e.target.value
        })
    }

    search() {
        const {textInput, history, maxLimit} = this.state;
        let input = textInput.replace(/\s+/g, ' ').trim();

        let jokeUrl = new URL("https://icanhazdadjoke.com/search");
        let params = {term: textInput, limit: maxLimit};
        jokeUrl.search = new URLSearchParams(params).toString();

        fetch(jokeUrl, {
            method: "GET",
            headers: {Accept: "application/json"},
        }).then(response => response.json())
            .then(json => {
                const totalRes = json["total_jokes"];
                const res = json.results;

                const filter = res.filter(data => {
                    return  history.map(x => x.jokeId).indexOf(data.id) <= 0 || history.map(x => x.phrase).indexOf(input) <= 0
                });

                const newJoke = filter[Math.ceil(Math.random() * filter.length - 1)];

                let isHistoryZero = history.filter(data => data["phrase"] === input).length !== totalRes;
                if (totalRes > 0 && isHistoryZero) {
                    this.setState({
                        history: [...history, {
                            phrase: input,
                            jokeId: newJoke.id,
                            totalJokes: totalRes
                        }],
                        jokeResults: filter,
                        joke: newJoke.joke
                    });
                } else {
                    alert(`No jokes about ${input} found`)
                }
            })
            .catch(e => {
                alert(e.message)
            });
    }

    render() {
        const {joke} = this.state
        return (<div>
            <Col col={12} className="p-4">
                <Row>
                    <Col lg={7} className="text-left">
                        <h3 className="pb-2">Input a phrase to generate Dad Joke.</h3>
                        <Form>
                            <Row>
                                <Col lg={7}>
                                    <Input onChange={e => {
                                        this.onChangeValue(e, "textInput")
                                    }} className=""/>
                                </Col>
                                <Col lg={5}>
                                    <Button onClick={this.search}>Go</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                    <Col lg={5}>
                        <h1>{joke}</h1>
                    </Col>
                </Row>
            </Col>

            <Col lg={12} className="p-5">
                <Row>
                    <Col lg={2} className="text-left">
                        <Link to={'/'}>
                            <Button block color="secondary">Back</Button>
                        </Link>
                    </Col>
                </Row>
            </Col>
        </div>)
    }

}

export default ClassName
