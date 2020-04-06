import React, {Component} from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component{
  
  
  
  changeFilterClass = (e) => {
    let btns = document.getElementsByClassName('btn-filter');
    const {onChangeStateFilter, onChangeFilter} = this.props
    
    onChangeStateFilter(e.target.value);
    onChangeFilter();

    
    for(let i = 0; i< btns.length; i++) {
      btns[i].className = "btn btn-outline-secondary btn-filter"
    }
    
    e.target.className = "btn btn-info btn-filter";
  }
  
  
  render() {
      return (
        <div className="btn-group">
          <button type="button"
                  
                  className= 'btn btn-info btn-filter'
                  value="all" 
                  onClick={this.changeFilterClass}>All</button>
          <button type="button"
                  
                  className='btn btn-outline-secondary btn-filter'
                  value="active" 
                  onClick={this.changeFilterClass}>Active</button>
          <button type="button"
                   
                  className='btn btn-outline-secondary btn-filter'
                  value="done" 
                  onClick={this.changeFilterClass}>Done</button>
        </div>
      ); 
  }
}



