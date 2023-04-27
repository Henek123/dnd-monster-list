import React from 'react'
import SearchBar from './SearchBar'
import './styles/Filters.css'

export default function Filters(props) {
  const upperLimit = 30;
  const lowerLimit = 0;
  const [crLimitInput, setCrLimitInput] = React.useState({
    currentLowerLimit: 0,
    currentUpperLimit: 30,
  });

  //TODO: user cant type upper limit smaller than lower limit and vice versa
  function handleChange(event){
    const name = event.target.name;
    const value = event.target.value;
    if(name === 'currentLowerLimit' && value < 0) event.target.value = 0;
    if(name === 'currentUpperLimit' && value > 30) event.target.value = 30;
    setCrLimitInput(prevState => ({
      ...prevState,
      [name]: Number(value),
    }));
    props.setCrLimits(prevState => ({
      ...prevState,
      [name]: Number(value),
    }))
  }
  return (
    <section className='filters'>
      <input 
        type='number' 
        name='currentLowerLimit' 
        min={lowerLimit} 
        max={crLimitInput.currentUpperLimit} 
        value={crLimitInput.currentLowerLimit}
        onChange={handleChange}
      />
      <input 
        type='number' 
        name='currentUpperLimit' 
        min={crLimitInput.currentLowerLimit} 
        max={upperLimit} 
        value={crLimitInput.currentUpperLimit}
        onChange={handleChange}
      />
      <SearchBar 
        setSearchBarInput={props.setSearchBarInput}
      />
    </section>
  )
}
