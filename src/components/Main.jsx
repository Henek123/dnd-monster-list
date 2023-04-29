import React from 'react'
import MonsterCard from './MonsterCard'
import Filters from './Filters'
import './styles/Main.css'
import LoadingScreen from './LoadingScreen'

export default function Main() {

  const [monsterList, setMonsterList] = React.useState([]);
  const [filteredMonsterList, setFilteredMonsterList] = React.useState([])
  const [isExpired, setIsExpired] = React.useState(false);
  const [searchBarInput, setSearchBarInput] = React.useState('');
  const [loadedMonsters, setLoadedMonsters] = React.useState(0);
  const [crLimits, setCrLimits] = React.useState({
    currentLowerLimit: 0,
    currentUpperLimit: 30,
  });
  const [monsterType, setMonsterType] = React.useState('All types')
  const [monsterSize, setMonsterSize] = React.useState('All sizes')

  React.useEffect(() => {
    fetch(`http://www.dnd5eapi.co/api/monsters/`)
          .then(response => (response.json()))
          .then(data => {
            setMonsterList(data.results)
            setFilteredMonsterList(data.results)
          })
    if(localStorage.getItem('!expiration date monsters') === null){
      setIsExpired(true);
      setExpirationDate()
    }
  }, [])
  const list = filteredMonsterList.map(monster => (
    <MonsterCard
      key={monster.index} 
      index={monster.index} 
      isExpired={isExpired}
      addToLoadedMonsters={addToLoadedMonsters}
      crLimits={crLimits}
      monsterType={monsterType}
      monsterSize={monsterSize}
    />
  ))
  

  function addToLoadedMonsters(){
    setLoadedMonsters(prevState => prevState + 1);
  }

  //setting expiration date
  function setExpirationDate(){
    const expirationDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 30;
    localStorage.setItem('!expiration date monsters', JSON.stringify(expirationDate))
  }

  //getting date
  function getCurrentDate(){
    const currentDate = new Date().getTime()
    return currentDate
  }

  //checking if localStorage is expired
  React.useEffect(() => {
    let expirationDate = Number(localStorage.getItem('!expiration date monsters'))
    let currentDate = getCurrentDate();
    if(expirationDate === null || expirationDate <= currentDate){
      setIsExpired(true);
      setExpirationDate();
    }
  }, [])

  //searching by monster name
  React.useEffect(() => {
    if(searchBarInput !== ''){
      const filteredMonsters = monsterList.filter(monster => {
        return monster.name.toLowerCase().includes(searchBarInput)
      })
      setFilteredMonsterList(filteredMonsters);
    } else{
      setFilteredMonsterList(monsterList);
    }
  }, [searchBarInput])
  return (
    <section className='main'>
      {(loadedMonsters < monsterList.length * 2 && isExpired) && <LoadingScreen />}
      <Filters 
        setSearchBarInput={setSearchBarInput}
        setCrLimits={setCrLimits}
        setMonsterType={setMonsterType}
        setMonsterSize={setMonsterSize}
      />
      {filteredMonsterList.length > 0 && <>
        {list}
      </>}
    </section>
  )
}
