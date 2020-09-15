import React from 'react';

class Converter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: null
        }
    }

    updateNumber(event) {
        this.setState({
            number: event.target.number,
        });
    }

    render() {
        return (
            <section className="converter">
                <p className="converter-title">Convert a number into a list of words</p>
                <form>
                    <label>Insert your number:</label>
                    <input
                        className=""
                        type="number"
                        onChange={e => this.updateNumber(e)}
                        value={this.state.number}/>
                </form>
            </section>
        );
    }
}

export default Converter;