import React from 'react'
import { useMainContext } from 'context/main'
import { isEmpty } from 'lodash'

import SearchBoxTabs from './SearchBoxTabs'
import Suggestion from './Suggestion'

const SearchBox = () => {
  const {
    state,
    context: { keyword, inputValue },
    actions: { openSearchBox, closeSearchBox, toggleDeboucingInput, cleanInput, doSearch },
  } = useMainContext()

  const isModalOpen = state.matches('open')

  const handleInputClick = () => {
    if (!isModalOpen) {
      openSearchBox()
    }
  }

  const handleSearchBtnClick = () => {
    if (!isModalOpen) {
      openSearchBox()
    } else {
      doSearch(inputValue)
    }
  }

  const headerClasses = isModalOpen
    ? 'search-page__search-box search-page__search-box--open'
    : 'search-page__search-box'

  const inputText = isModalOpen ? inputValue : keyword

  const handleInputChange = (e) => {
    toggleDeboucingInput(e.target.value)
  }

  const showCleanBtn = isModalOpen && !isEmpty(inputValue)

  return (
    <div className={headerClasses}>
      <div className="search-page__input-row">
        <input
          onClick={handleInputClick}
          onChange={handleInputChange}
          value={inputText}
          className="search-page__input-row__input"
          placeholder="keywords..."
        />
        {showCleanBtn && (
          <div onClick={cleanInput} className="search-page__input-row__clean">
            X
          </div>
        )}
        <div
          onClick={handleSearchBtnClick}
          className="search-page__input-row__button search-page__input-row__button--search"
        >
          Search
        </div>
        {isModalOpen && (
          <div className="search-page__input-row__button" onClick={closeSearchBox}>
            Cancel
          </div>
        )}
      </div>
      <SearchBoxTabs />
      <Suggestion />
    </div>
  )
}

export default SearchBox
