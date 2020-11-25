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

  const handleClick = (text) => () => doSearch(text)

  return (
    <div className="search-page__suggestion-wrapper">
      <div className="search-page__suggestion-wrapper__row" onClick={handleClick(inputValue)}>
        <b>{inputValue}</b>
      </div>
      {suggestions.map((text, index) => {
        const additionalText = text.substr(inputValue.length)
        return (
          <div key={index} className="search-page__suggestion-wrapper__row" onClick={handleClick(text)}>
            <b>{inputValue}</b>
            {additionalText}
          </div>
        )
      })}
    </div>
  )
}

export default Suggestion
