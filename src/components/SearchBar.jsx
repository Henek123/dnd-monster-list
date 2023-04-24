import React from 'react'
import './styles/SearchBar.css'

export default function SearchBar(props) {
    const [searchInput, setSearchInput] = React.useState("")
    function handleChange(event){
        setSearchInput(event.target.value)
    }
    // React.useEffect(() => {
    //     props.setSearched(searchInput.toLowerCase());
    // },[searchInput])
    return (
        <section className='search-section'>
            <div className="search-bar-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='search-icon'>
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5
                        32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1
                        416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0
                        0-288 144 144 0 1 0 0 288z"/>
                </svg>
                <input
                    className="search-bar"
                    type="text"
                    name="search bar"
                    placeholder="Search..."
                    onChange={handleChange}
                    value={searchInput}
                />
                <p className='search-clear-btn' onClick={() => setSearchInput("")}>X</p>
            </div>
        </section>
  )
}