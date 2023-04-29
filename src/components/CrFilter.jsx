import React from 'react'
import './styles/CrFilter.css'

export default function CrFilter(props) {
  const upperLimit = 30;
  const lowerLimit = 0;
  const [crLimitInput, setCrLimitInput] = React.useState({
    currentLowerLimit: 0,
    currentUpperLimit: 30,
  });

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

  function displayOptions(min, max){
    let arr =[];
    for(let i = min; i <= max; i++){
      arr.push(<option value={i}>{i}</option>)
    }
    return arr;
  }
  return (
    <div className='cr-filter'>
      <p>Challenge Rating</p>
      <label for='currentLowerLimit'>From </label>
      <select 
        name='currentLowerLimit' 
        onChange={handleChange} 
        value={crLimitInput.currentLowerLimit}
      >
        {displayOptions(lowerLimit, crLimitInput.currentUpperLimit)}
      </select>
      <label for='currentLowerLimit'>To </label>
      <select 
        name='currentUpperLimit' 
        onChange={handleChange} 
        value={crLimitInput.currentUpperLimit}
      >
        {displayOptions(crLimitInput.currentLowerLimit, upperLimit)}
      </select>
    </div>
  )
}
