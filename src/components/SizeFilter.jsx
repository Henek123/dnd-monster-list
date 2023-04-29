import React from 'react'
import './styles/SizeFilter.css'

export default function SizeFilter(props) {
  const [currentSize, setCurrentSize] = React.useState('All sizes')

  const sizesOfMonsters = ['All sizes', 'Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
  
  //mapping list of monster sizes
  const list = sizesOfMonsters.map(size => (
    <span 
      style={{
        backgroundColor: currentSize !== size ? 'transparent' : 'rgba(50, 59, 76, 0.4)',
        color: currentSize !== size ? 'black' : 'whitesmoke',
        borderColor: currentSize !== size ? 'grey' : 'black'
      }}  
      className='wrapper' 
      key={size}
    >
      <label htmlFor={size}>{size}</label>
      <input 
        id={size} 
        name='size of monster' 
        type='radio' 
        onChange={handleChange}
        checked={currentSize === size ? true : false}
      />
    </span>
  ));
  
  React.useEffect(() => {
    props.setMonsterSize(currentSize.toLowerCase());
  }, [currentSize]);

  function handleChange(event){
    setCurrentSize(event.target.id)
  };

  return (
    <div className='size-filter'>
      <p>Monster Size:</p>
      {list}
    </div>
  )
}