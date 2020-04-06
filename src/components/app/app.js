import React, {Component} from 'react';


import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from '../add-item/';

import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: ''// active Done all
  };

  createTodoItem(label) {
    return {
      label: label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  deleteItem = (id) => {
    this.setState(({todoData}) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray
      }
      
    })
    
  };
  addItem = (text) => {
    
    const newItem = this.createTodoItem(text);
  

    this.setState(({todoData}) => {
     
      const newArray = [
        ...todoData,
        newItem
      ]
      
      return {
        todoData: newArray
      }
      
    })
}
  toggleProperty(arr, id, propName) {
    
      const idx = arr.findIndex((el) => el.id === id)
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};
      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ];
  }
  onToggleImportant = (id) => {
    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      }
    });
    
  };
  onToggleDone = (id) => {
    this.setState(({todoData}) => {

      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      }
    });
    
  };
  onChangeValue = (term) => {
    this.setState({term})   
  }
  searchItem = (items, term) => {
    
    if(term.length === 0) {
      return items;
    }
    
    return items.filter((item) => {
      return item.label.toLowerCase()
      .indexOf(term.toLowerCase()) > -1
    });
    
    
    
    
      
    }
  changeStateFilter = (filter) => {
    this.setState({filter});
  }
  changeFilter = (items, filter) => {
    switch(filter) {
      case 'all': 
      return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done)
        default:
          return items;
    }
  }

  render() {
    const {todoData, term, filter} = this.state;

    let visibleItems = this.changeFilter(this.searchItem(todoData, term), filter)
          
    const doneCount = todoData
                                .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
          onChangeValue={this.onChangeValue}/>
          <ItemStatusFilter
          onChangeStateFilter = {this.changeStateFilter}
          onChangeFilter = {this.changeFilter}/>
        </div>
  
        <TodoList todos={visibleItems} 
        onDeleted={this.deleteItem}
        onToggleImportant={this.onToggleImportant}
        onToggleDone={this.onToggleDone} />
        <AddItem 
        onAdded = {this.addItem}/>
      </div>
    );
  }

  
};
