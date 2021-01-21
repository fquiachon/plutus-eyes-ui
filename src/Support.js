import React from 'react';

class Support extends React.Component {
	constructor(props) {
        super(props);
		this.state = { 
			loading: false,
		}
	}
  
	componentDidUpdate() {
		console.log("The component just updated")
  	}
  
	componentDidMount() {
		console.log("The component just mount")

	}
  
    render() {
      return (
        <div class="bg-info">
			<h4 class="card-title">{this.props.ticker} Support</h4>
			{ this.props.info.map(product => {
					let isSell = product.s1_diff < 1
					return (
					<div class="card-body">
						<h4 class={product.candle === 'bull' ? "card-title bg-success": "card-title bg-danger"} >
							{product.current_date} | {product.current_price}
						</h4>
						<div className='row'>
							<div className='col-sm'>
								<h3>{product.s1_price}<br />{product.s1_date}</h3>
							</div>
							<div className='col-sm'><h1>{product.s1_diff} %</h1></div>
						</div>
						<br />
						<h4><mark class='bg-danger'>{ isSell ? 'BUY' : 'HOLD'} </mark></h4>
					</div>
					) 
				} ) 
			}
			</div>
      )
    }
  }
  
export default Support;