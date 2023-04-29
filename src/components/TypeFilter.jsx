import React from 'react'
import './styles/TypeFilter.css'

export default function TypeFilter(props) {
  const [currentType, setCurrentType] = React.useState('All types')

  const typesOfMonsters = ['All types', 'Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon',
   'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead'];
  
  //mapping list of monster types
  const list = typesOfMonsters.map(type => (
    <span 
      className='wrapper' 
      key={type}
      style={{
        backgroundColor: currentType !== type ? 'transparent' : 'rgba(50, 59, 76, 0.4)',
        color: currentType !== type ? 'black' : 'whitesmoke',
        borderColor: currentType !== type ? 'grey' : 'black'
      }}  
    >
      <label htmlFor={type}>{type}</label>
      <input 
        id={type} 
        name='type of monster' 
        type='radio' 
        onChange={handleChange}
        checked={currentType === type ? true : false}
      />
    </span>
  ));
  
  React.useEffect(() => {
    props.setMonsterType(currentType.toLowerCase());
  }, [currentType]);

  function handleChange(event){
    setCurrentType(event.target.id)
  };

  return (
    <div className='type-filter'>
      <p>Monster Type:</p>
      {list}
    </div>
  )
}