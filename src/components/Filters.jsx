import React from 'react'
import SearchBar from './SearchBar'
import './styles/Filters.css'

export default function Filters(props) {
  return (
    <section className='filters'>
      <SearchBar 
        setSearchBarInput={props.setSearchBarInput}
      />
    </section>
  )
}
