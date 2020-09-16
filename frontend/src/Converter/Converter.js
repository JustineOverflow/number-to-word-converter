import React from 'react';

class Converter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: '',
            wordList: [],
            error: '',
            filter: false,
        }
        this.updateNumber = this.updateNumber.bind(this)
        this.submitNumber = this.submitNumber.bind(this)
        this.cancelNumber = this.cancelNumber.bind(this)
        this.updateFilter = this.updateFilter.bind(this)
    }

    updateNumber(event) {
        const newNumber = this.state.number + event;
        this.setState({
            number: newNumber,
        });
    }

    cancelNumber() {
        this.setState({
            number: '',
        });
    }

    updateFilter() {
        this.setState({
            filter: !this.state.filter
        });
    }

    async submitNumber(event) {
        try {
            let response = await fetch(`http://127.0.0.1:3001/converter?number=${this.state.number}&filter=${this.state.filter}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.status === 400) {
                this.setState({
                    error: (await response.json()).reason,
                    number: '',
                    wordList: []
                })
            } else {
                this.setState({
                    error: '',
                    number: '',
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
                <div>
                    <p className="converter-title">Insert a number</p>
                    {this.state.error.length > 0 ?
                        <p className="error">
                            {this.state.error}
                        </p> : <p></p>}
                    <div className="converter-phone">
                        <div className="converter-phone-container">
                            <div className=""></div>
                            <div className="converter-phone-container-screen">{this.state.number}</div>
                            <div className="converter-phone-numpad">
                                <button onClick={() => this.updateNumber(1)} className="converter-phone-numpad-item">1
                                    <div className="letters">&nbsp;</div>
                                </button>
                                <button onClick={() => this.updateNumber(2)} className="converter-phone-numpad-item">2
                                    <div className="letters">abc</div>
                                </button>
                                <button onClick={() => this.updateNumber(3)} className="converter-phone-numpad-item">3
                                    <div className="letters">def</div>
                                </button>
                                <button onClick={() => this.updateNumber(4)} className="converter-phone-numpad-item">4
                                    <div className="letters">ghi</div>
                                </button>
                                <button onClick={() => this.updateNumber(5)} className="converter-phone-numpad-item">5
                                    <div className="letters">jkl</div>
                                </button>
                                <button onClick={() => this.updateNumber(6)} className="converter-phone-numpad-item">6
                                    <div className="letters">mno</div>
                                </button>
                                <button onClick={() => this.updateNumber(7)} className="converter-phone-numpad-item">7
                                    <div className="letters">pqrs</div>
                                </button>
                                <button onClick={() => this.updateNumber(8)} className="converter-phone-numpad-item">8
                                    <div className="letters">tuv</div>
                                </button>
                                <button onClick={() => this.updateNumber(9)} className="converter-phone-numpad-item">9
                                    <div className="letters">wxyz</div>
                                </button>
                            </div>
                            <div className="converter-phone-container-actions">
                                <button onClick={this.cancelNumber}
                                        className="converter-phone-container-actions-cancel">Cancel
                                </button>
                                <button onClick={this.submitNumber}
                                        className="converter-phone-container-actions-submit">Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="converter-title">Convert into words</p>

                    <p className="converter-subtitle">Do you want to filter only english words?</p>
                    <label>Filter<input
                        type="checkbox"
                        onChange={this.updateFilter}
                        checked={this.state.filter}>
                    </input></label>

                    {this.state.wordList.map(word =>
                        <div key={word}>
                            <p>{word}</p>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

export default Converter;