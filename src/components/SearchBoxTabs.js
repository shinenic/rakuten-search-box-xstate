import React from 'react'
import { useMainContext } from 'context/main'
import { SEARCH_MODE } from 'machine/searchBox'
import { toPairs } from 'lodash'

const SearchBoxTabs = () => {
  const {
    state,
    context: { searchMode },
    actions: { changeSearchMode },
  } = useMainContext()
  const isModalOpen = state.matches('open')

  if (!isModalOpen) return null

  return (
    <div className="search-page__search-tabs">
      {toPairs(SEARCH_MODE).map(([key, tabName]) => {
        const isSameType = searchMode === tabName
        const handleClick = () => !isSameType && changeSearchMode(SEARCH_MODE[key])
        const classes = isSameType
          ? 'search-page__search-tabs__tab search-page__search-tabs__tab--active'
          : 'search-page__search-tabs__tab'

        return (
          <div key={key} className={classes} onClick={handleClick}>
            {tabName}
          </div>
        )
      })}
    </div>
  )
}

export default SearchBoxTabs
