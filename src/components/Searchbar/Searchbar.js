import React, { Component } from 'react'
import "./Searchbar.scss"
import { FiSearch } from "react-icons/fi";

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('')

  const handleSubmit = e => {
    e.preventDefault();

    if(query.trim() === "") {
      alert("Wpisz nazwę, aby wyszukać obrazy")
      return
    }
    onSubmit(query)
    setQuery("")
    ;
  }

  const handelInputChange  = e => {
    const {value} = e.currentTarget
    setQuery(value);
  };

  return (
    <>
      <header className="searchbar">
        <form className="form" onSubmit={handleSubmit} >
          <button type="submit" className="button">
             <FiSearch/>
          </button>

          <input
            value={query}
            name='value'
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handelInputChange}
          />
        </form>
      </header>
    </>
  )
}
