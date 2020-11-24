import React from 'react'
import { useMainContext } from 'context/main'

const Suggestion = () => {
  const {
    state,
    context: { suggestions = [], inputValue },
    actions: { doSearch },
  } = useMainContext()
  const isModalOpen = state.matches('open')

  if (!isModalOpen) return null

  return (
    <div className="search-page__suggestion-wrapper">
      <div className="search-page__suggestion-wrapper__row">
        <b>{inputValue}</b>
      </div>
      {suggestions.map((text, index) => {
        const handleClick = () => doSearch(text)
        const additionalText = text.substr(inputValue.length)
        return (
          <div key={index} className="search-page__suggestion-wrapper__row" onClick={handleClick}>
            <b>{inputValue}</b>
            {additionalText}
          </div>
        )
      })}
    </div>
  )
}

export default Suggestion
