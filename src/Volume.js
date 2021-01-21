import React from 'react';

class Volume extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            loading: false
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
						<h4 class="card-title">{this.props.ticker} Volume</h4>
						{ this.props.info.map(product => {
								return (
								<div class="card-body">
									<h4 class={product.candle === 'bull' ? "card-title bg-success": "card-title bg-danger"} >
										{product.current_date} | {product.current_price}
									</h4>
									<p class="card-text"><mark>In Progress</mark></p>
								</div>
								) 
							} ) 
						}
					</div>
      )
    }
  }
  
export default Volume;