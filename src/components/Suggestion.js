import React from 'react'
import { useMainContext } from 'context/main'

const LoadingHint = () => {
  const { state } = useMainContext()

  const isFetching = state.matches('open.fetching')
  const isDebouncingInput = state.matches('open.deboucingInput')

  if (isDebouncingInput)
    return (
      <div className="search-page__suggestion-wrapper__progress">
        <b>Debouncing</b> ⇢ Fetching ⇢ Finish
      </div>
    )

  if (isFetching)
    return (
      <div className="search-page__suggestion-wrapper__progress">
        Debouncing ⇢ <b>Fetching</b> ⇢ Finish
      </div>
    )

  return (
    <div className="search-page__suggestion-wrapper__progress">
      Debouncing ⇢ Fetching ⇢ <b>Finish</b>
    </div>
  )
}

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
      <LoadingHint />
    </div>
  )
}

export default Suggestion
