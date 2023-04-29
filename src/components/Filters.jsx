import React from 'react'
import SearchBar from './SearchBar'
import CrFilter from './CrFilter';
import './styles/Filters.css'

export default function Filters(props) {
  return (
    <section className='filters'>
      <CrFilter setCrLimits={props.setCrLimits}/>
      <SearchBar 
        setSearchBarInput={props.setSearchBarInput}
      />
    </section>
  )
}
