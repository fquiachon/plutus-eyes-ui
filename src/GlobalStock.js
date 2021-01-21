import React from 'react';
import EntryLevel from './EntryLevel';

class GlobalStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: false,
            isGlobal: true
        }
      }

      componentDidMount() {
        this.setState({loading: false})
      }

      myReloadHandler = (event) => {
      this.setState({loading: true})
        setTimeout(function() { //Start the timer
            this.setState({loading: false}) //After 1 second, set render to true
          }.bind(this), 1000)
      }

    render() {
      return (
        <div>
            {this.state.loading 
            ? <div className="spinner-border text-primary" />
            :<div className='row'>
                  <div className="col-sm-12">
                      <EntryLevel isGlobal={true} />
                      <button onClick={this.myReloadHandler} type="button"> Reload </button>
                  </div>
              </div>
              }
        </div>
      )
    }
  }
  
export default GlobalStock;