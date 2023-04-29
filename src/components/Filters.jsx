import React from 'react'
import SearchBar from './SearchBar'
import CrFilter from './CrFilter';
import TypeFilter from './TypeFilter';
import SizeFilter from './SizeFilter';
import './styles/Filters.css'

export default function Filters(props) {
  return (
    <section className='filters'>
      <CrFilter setCrLimits={props.setCrLimits}/>
      <SizeFilter setMonsterSize={props.setMonsterSize} />
      <TypeFilter setMonsterType={props.setMonsterType} />
      <SearchBar 
        setSearchBarInput={props.setSearchBarInput}
      />
    </section>
  )
}
