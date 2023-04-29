import React from 'react'
import {UnmountClosed} from 'react-collapse';import './styles/MonsterCard.css'


export default function MonsterCard(props) {
  const [monster, setMonster] = React.useState({})
  const [isVisible, setIsVisible] = React.useState(false)
  React.useEffect(() => {
      if(props.isExpired || localStorage.getItem(props.index) === null){
        fetch(`http://www.dnd5eapi.co/api/monsters/${props.index}`)
          .then(response => (response.json()))
          .then(data => {
            setMonster(data)
            localStorage.setItem(props.index, JSON.stringify(data));
            props.addToLoadedMonsters();
          })
        } else{
          setMonster(JSON.parse(localStorage.getItem(props.index)));
          props.addToLoadedMonsters();
        }
  }, [props.index, props.isExpired])


  function capitalizeFirstLetter(string){
    let result = string.split(" ")
    result = result.map((element) => {
      return element.charAt(0).toUpperCase() + element.slice(1)
    })
      result = result.join(" ")
      return result;
  }

  //getting armor 
  function getArmorDescription(arr){
    let result = arr.map(element => element.name.toLowerCase());
    return result.join(", ")
  }

  //getting speed
  function getSpeed(obj){
    let arr = Object.keys(obj);
    arr = arr.map(element => {
      return `${obj[element]} ${element}`
    })
    return arr.join(", ");
  }

  //getting ability modifier
  function getAbilityModifier(value){
    value = Number(value)
    value = Math.floor((value - 10) / 2)
    if(value > -1) return `+${value}`
    return value;
  }

  //getting saving throws proficiency
  function getSavingThrows(arr){
    let result = arr.filter((element) => element.proficiency.index.includes("saving"));
    result = result.map((element) => {
      return `${element.proficiency.name.split(" ")[2]} +${element.value}`
    })
    return result.join(", ")
  }

  //getting skills proficiency
  function getSkills(arr){
    let result = arr.filter((element) => element.proficiency.index.includes("skill"));
    result = result.map((element) => {
      let temp = element.proficiency.name.split(" ")
      temp.shift()
      temp.join(" ")
      return `${temp} +${element.value}`
    })
    return result.join(", ");
  }

  //getting damage resistances, immunities and vulnerabilities
  function getDamageStatus(arr){
    let result = arr.map(element => capitalizeFirstLetter(element))
    return result.join(", ")
  }

  //getting condition immunities
  function getConditionImmunities(arr){
    let result = arr.map(element => element.name);
    return result.join(", ")
  }

  //getting senses
  function getSenses(obj){
    let arr = Object.keys(obj);
    arr = arr.map(element => {
      let temp = element.split("_")
      temp = temp.map(element => capitalizeFirstLetter(element))
      temp = temp.join(" ");
      temp = `${temp} ${obj[element]}`
      return temp;
    })
    return arr.join(", ");
  }

  //getting special abilities
  function getSpecialAbilities(arr){
    let result = arr.map(element => {
      return(
        <p className='pre-wrap' key={element.name}>
          <span className='property'>
            {element.name}: {element.usage && `(${element.usage.times} ${element.usage.type})`} 
          </span>
          {element.desc}
        </p>
      )
    })
    return result
  }

  //getting actions
  function getActions(arr){
    let result = arr.map(element => {
      return(
        <p className='pre-wrap' key={element.name}>
          <span className='property'>{element.name}: </span>{element.desc}
        </p>
      )
    })
    return result
  }
  
  function decideIfRenders(){
    if(monster.name === undefined) return false;
    if(monster.challenge_rating < props.crLimits.currentLowerLimit) return false;
    if(monster.challenge_rating > props.crLimits.currentUpperLimit) return false;
    return true;
  }
  return (
    <>
      {decideIfRenders() &&
        <div className='monster-card '>
          <div className="monster-name">
            <h1>{monster.name}</h1>
            <p className='cursive'>
              {`${capitalizeFirstLetter(monster.size)} 
                ${capitalizeFirstLetter(monster.type)} 
                ${capitalizeFirstLetter(monster.alignment)}`}
              <button className='expander' onClick={() => setIsVisible(prevState => !prevState)}>
                {isVisible ? "Shrink" : "Expand"}
              </button>
            </p>
            {isVisible && <hr/>}
          </div>
          <UnmountClosed isOpened={isVisible}>
            <div className='monster-details'>
              <div className="monster-basic-stats">
                <p>
                  <span className='property'>Armor Class: </span> 
                  {monster.armor_class[0].value} 
                  {monster.armor_class[0].type === "natural" ? " (natural)" :
                    monster.armor_class[0].type === "dex" ? "" :
                    monster.armor_class[0].desc ? ` (${monster.armor_class[0].desc})`:
                    ` (${getArmorDescription(monster.armor_class[0].armor)})`
                  }
                </p>
                <p>
                  <span className='property'>Hit Points: </span> 
                  {monster.hit_points} ({monster.hit_points_roll})
                </p>
                <p>
                  <span className='property'>Speed: </span> 
                  {getSpeed(monster.speed)}
                </p>
                <hr/>
                <div className='stats'>
                  <div>
                    <p className='property'>STR</p>
                    <p>{`${monster.strength} (${getAbilityModifier(monster.strength)})`}</p>
                  </div>
                  <div>
                    <p className='property'>DEX</p>
                    <p>{`${monster.dexterity} (${getAbilityModifier(monster.dexterity)})`}</p>
                  </div>
                  <div>
                    <p className='property'>CON</p>
                    <p>{`${monster.constitution} (${getAbilityModifier(monster.constitution)})`}</p>
                  </div>
                  <div>
                    <p className='property'>INT</p>
                    <p>{`${monster.intelligence} (${getAbilityModifier(monster.intelligence)})`}</p>
                  </div>
                  <div>
                    <p className='property'>WIS</p>
                    <p>{`${monster.wisdom} (${getAbilityModifier(monster.wisdom)})`}</p>
                  </div>
                  <div>
                    <p className='property'>CHA</p>
                    <p>{`${monster.charisma} (${getAbilityModifier(monster.charisma)})`}</p>
                  </div>
                </div>
                <hr/>
                {getSavingThrows(monster.proficiencies) &&
                  <p><span className='property'>Saving Throws: </span> 
                  {getSavingThrows(monster.proficiencies)}
                </p>
                }
                {getSkills(monster.proficiencies) && 
                  <p>
                    <span className='property'>Skills: </span> 
                    {getSkills(monster.proficiencies)}
                  </p>
                }
                {monster.damage_vulnerabilities.length !== 0 &&
                  <p>
                    <span className='property'>Damage Vulnerabilities: </span> 
                    {getDamageStatus(monster.damage_vulnerabilities)}
                  </p>
                }
                {monster.damage_resistances.length !== 0 &&
                  <p><span className='property'>Damage Resistances: </span> 
                  {getDamageStatus(monster.damage_resistances)}
                </p>
                }
                {monster.damage_immunities.length !== 0 && 
                  <p><span className='property'>Damage Immunities: </span> 
                  {getDamageStatus(monster.damage_immunities)}
                </p>
                }
                {monster.condition_immunities.length !== 0 &&
                  <p><span className='property'>Condition Immunities: </span>
                  {getConditionImmunities(monster.condition_immunities)}
                </p>
                }
                <p><span className='property'>Senses: </span>{getSenses(monster.senses)}</p>
                {monster.languages && 
                  <p><span className='property'>Languages: </span>
                  {monster.languages}
                  </p>
                }
                <p>
                  <span className='property'>Challenge: </span>
                  {`${monster.challenge_rating} (${monster.xp} XP)`}
                </p>
                {monster.special_abilities.length !== 0 && <hr/>}
                {getSpecialAbilities(monster.special_abilities)}
              </div>

              {monster.actions.length !== 0 && 
                <div className='monster-actions'>
                  <h2>Actions</h2>
                  <hr/>
                  {getActions(monster.actions)}
                </div>
              }

              {monster.legendary_actions.length !== 0 && 
                <div className='monster-legendary-actions'>
                  <h2>Legendary Actions</h2>
                  <hr/>
                  <p>The {`${monster.name}`} can take 3 legendary actions, choosing from the options below.
                    Only one legendary action option can be used at a time and only at the end of another creature`s turn.
                    The {`${monster.name}`} regains spent legendary actions at the start of its turn.</p>
                  {getActions(monster.legendary_actions)}
                </div>
              }
            </div>
          </UnmountClosed>
        </div>
      }
    </>
  )
}