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
                    <p className="error">
                        {this.state.error}
                    </p> : <p></p>}

                {this.state.wordList.map(word =>
                    <div key={word}>
                        <p>{word}</p>
                    </div>
                )}
                <div className="converter-phone">
                    <div className="converter-phone-container">
                        <div className="converter-phone-container-screen">{this.state.number}</div>
                        <div className="converter-phone-numpad">
                            <button className="converter-phone-numpad-item">1
                                <div className="letters">&nbsp;</div>
                            </button>
                            <button className="converter-phone-numpad-item">2
                                <div className="letters">abc</div>
                            </button>
                            <button className="converter-phone-numpad-item">3
                                <div className="letters">def</div>
                            </button>
                            <button className="converter-phone-numpad-item">4
                                <div className="letters">ghi</div>
                            </button>
                            <button className="converter-phone-numpad-item">5
                                <div className="letters">jkl</div>
                            </button>
                            <button className="converter-phone-numpad-item">6
                                <div className="letters">mno</div>
                            </button>
                            <button className="converter-phone-numpad-item">7
                                <div className="letters">pqrs</div>
                            </button>
                            <button className="converter-phone-numpad-item">8
                                <div className="letters">tuv</div>
                            </button>
                            <button className="converter-phone-numpad-item">9
                                <div className="letters">wxyz</div>
                            </button>
                        </div>
                        <div className="converter-phone-container-actions">
                            <button className="converter-phone-container-actions-cancel">Cancel</button>
                            <button className="converter-phone-container-actions-submit">Submit</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Converter;