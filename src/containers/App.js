import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import { setSearchField, requestRobots } from './actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  } 
}

function App(props) {

  const { searchField, onSearchChange, store, robots, isPending } = props;
  const [count, setCount] = useState(0);

  console.log(count);
  useEffect(() => {
    props.onRequestRobots();
  }, [])

    const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <button onClick={() => setCount(count+1)}>Click Me!</button>
          <SearchBox searchChange={(e) => onSearchChange(e)}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);

//There is two function in connect. MapStateToProps and mapDispatchToProps
//Map State to props receives "State" as a parameter;
//return a object(?) that will be used in our component. this object(?) takes "state.searchField";