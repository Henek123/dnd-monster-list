import React from 'react'
import MonsterCard from './MonsterCard'
import Filters from './Filters'
import './styles/Main.css'

export default function Main() {

  const [monsterList, setMonsterList] = React.useState([])
  React.useEffect(() => {
    fetch(`http://www.dnd5eapi.co/api/monsters/`)
          .then(response => (response.json()))
          .then(data => setMonsterList(data.results))
  }, [])
  const list = monsterList.map(monster => (
    <MonsterCard key={monster.index} index={monster.index} />
    ))

  return (
    <section className='main'>
      <Filters />
      {/* {list} */}
      <MonsterCard index="goblin" />
      <MonsterCard index="mummy-lord" />
      <MonsterCard index="ape" />
    </section>
  )
}
