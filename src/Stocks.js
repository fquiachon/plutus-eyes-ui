import React from 'react';
import GlobalStock from './GlobalStock'
import PSEStock from './PSEStock'
import './App.css';
import pseLogo from './images/pse-logo.png';
import globalLogo from './images/global-logo.png';
import add_btn from './images/add.jpg';

class Stocks extends React.Component {

	state = { 
		isGlobal: true,
        loading: false,
        ticker: ''
	}
  
	toggleOpenClosed = () => {
		this.setState(prevState => ({
            isGlobal: !prevState.isGlobal,
		}))
	}

    updateInput = (event) => {
        event.preventDefault();
        this.setState({ticker : event.target.value})
    }

    mySubmitHandler = (event) => {
        const myRequest = this.state.isGlobal 
        ? 'https://kubernetes.docker.internal:8888/v1/global'
        : 'https://kubernetes.docker.internal:8888/v1/pse' 

        this.setState({loading: true})
        event.preventDefault()

        const requestOptions = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
             body: JSON.stringify({ tickers: this.state.ticker })
            }

        fetch(myRequest + '/support', requestOptions)
        fetch(myRequest + '/resistance', requestOptions)

        setTimeout(function() { // Timout timer
          this.setState({loading: false}) //After 1 second, set loading to true
        }.bind(this), 1000)
        document.getElementById("myForm").reset()
      }

    render() {
        return (
            <div>
                <div className="container-fluid p-3 my-3 bg-primary text-white">
                    <img src={this.state.isGlobal ? globalLogo : pseLogo } alt='not found' height={150} />
                    <button onClick={this.toggleOpenClosed}>Go to <img src={this.state.isGlobal ? pseLogo : globalLogo} alt='not found' height={20} /> </button>
                    {this.state.isGlobal ? <h1>You're in Global Stock</h1> : <h1>You're in PSE Stock</h1> }
                    <form id="myForm">
                        <input type='text'  id="tickerText" placeholder="Eneter Stock Symbol" onChange={this.updateInput} /> 
                        <button onClick={this.mySubmitHandler} type="button"> <img src={add_btn} alt="logo" height={10} /> </button>
                    </form>
                </div>
                {this.state.loading 
                    ? <div className="spinner-border text-primary" />
                    : this.state.isGlobal ? <GlobalStock ticker={this.state.ticker} /> : <PSEStock ticker={this.state.ticker} />
                }
            </div>
        )
    }
  }
  
export default Stocks;