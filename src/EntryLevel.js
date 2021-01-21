import React from 'react';
import Support from './Support';
import Resistance from './Resistance';
import Volume from './Volume';

class EntryLevel extends React.Component {
    constructor(props) {
        super(props);
	    this.state = { 
			ticker_data: [],
			support_data: [],
			resistance_data: [],
			volume_data: [],
			loading: true,
			buttons_loading: true,
			currentTick: ''
		}
	}

	getVolume = (myRequest, tick) => {
		let volumeReq = myRequest + 'support/' + tick
		fetch(volumeReq)
		.then(volume_data => volume_data.json())
		.then(volume_data => this.setState({volume_data: volume_data}))
	}

	getResistance = (myRequest, tick) => {
		let resistanceReq = myRequest + 'resistance/' + tick
		fetch(resistanceReq)
		.then(resistance_data => resistance_data.json())
		.then(resistance_data => this.setState({resistance_data: resistance_data}))
	}

	getSupport = (myRequest, tick) => {
		let supportReq = myRequest + 'support/' + tick
		fetch(supportReq)
		.then(support_data => support_data.json())
		.then(support_data => this.setState({support_data: support_data}))
	}

	tickerHandler = (event) => {
        event.preventDefault();
		this.setState({loading: true, currentTick: event.target.innerHTML})
		console.log(event.target.innerHTML)
		
		const myRequest = this.props.isGlobal 
		? 'https://kubernetes.docker.internal:8888/v1/global/'
		: 'https://kubernetes.docker.internal:8888/v1/pse/' 

		this.getSupport(myRequest, event.target.innerHTML)
		this.getResistance(myRequest, event.target.innerHTML)
		this.getVolume(myRequest, event.target.innerHTML)

        setTimeout(function() { //Start the timer
            this.setState({loading: false}) //After 1 second, set render to true
		  }.bind(this), 1000)
		  
		
	}

	populateButtons = product => {
		return (
			<button onClick={this.tickerHandler} type="button" className="btn btn-primary">{product.ticker}</button>
		)
	}

	componentDidUpdate() {
		console.log("The component just updated")
		console.log('componentDidUpdate: ito ba ay global' + this.props.isGlobal)
  	}
  
  componentDidMount() {
	console.log('componentDidMount: ito ba ay global' + this.props.isGlobal)
	const myRequest = this.props.isGlobal 
	? 'https://kubernetes.docker.internal:8888/v1/global/'
	: 'https://kubernetes.docker.internal:8888/v1/pse/' 

	fetch(myRequest + 'support')
	.then(ticker_data => ticker_data.json())
	.then(ticker_data => this.setState({ticker_data: ticker_data}))

	this.setState({buttons_loading: false, loading: true})
  }
  

    render() {
      return (
		<div> 
          {this.state.buttons_loading 
			? <div className="spinner-border text-secondary" />
			:
			<div className='row p-3 my-3' > 
				<div className='col-sm-2 btn-group-vertical'>
					{ this.state.ticker_data.map(this.populateButtons) }
				</div>
				{this.state.loading 
				? 	<div />
				:
					<div class="card bg-info col-sm-3 ml-4">
						<Support info={this.state.support_data} ticker={this.state.currentTick} />
					</div>
				}
				{this.state.loading 
				? <br />
				:
					<div class="card bg-warning col-sm-3 ml-4">
						<Resistance info={this.state.resistance_data} ticker={this.state.currentTick} />
					</div>
				}
				{this.state.loading 
				? <br />
				:
					<div class="card bg-info col-sm-3 ml-4">
						<Volume info={this.state.volume_data} ticker={this.state.currentTick} />
					</div>
				}
			</div>
			}

		</div>
      )
    }
  }
  
export default EntryLevel;