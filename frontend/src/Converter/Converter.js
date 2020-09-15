import React from 'react';

class Converter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            wordList: [],
            error: '',
        }
        this.updateNumber = this.updateNumber.bind(this)
        this.submitNumber = this.submitNumber.bind(this)
    }

    updateNumber(event) {
        this.setState({
            number: event.target.value,
        });
        console.log(this.state.number)
    }

    async submitNumber(event) {
        try {
            debugger
            let response = await fetch(`http://127.0.0.1:3001/converter?number=${this.state.number}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status === 400) {
                this.setState({
                    error: (await response.json()).reason,
                    wordList: []
                })
            } else {
                this.setState({
                    error: '',
                    wordList: (await response.json()).combinations
                })
            }
        } catch (error) {
            console.log(error)
        }
        event.preventDefault()
    }

    render() {
        return (
            <section className="converter">
                <p className="converter-title">Convert a number into a list of words</p>
                <form onSubmit={this.submitNumber} action="#">
                    <label>Insert your number:</label>
                    <input
                        className=""
                        type="number"
                        onChange={event => this.updateNumber(event)}
                        value={this.state.number}
                    />
                    <input type="submit" value="Submit"/>
                </form>
                {this.state.error.length > 0 ?
                    <p>
                        {this.state.error}
                    </p> : <p></p>}

                {this.state.wordList.map(word =>
                    <div key={word}>
                        <p>{word}</p>
                    </div>
                )}
            </section>
        );
    }
}

export default Converter;