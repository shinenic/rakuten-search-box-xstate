import React from 'react'
import { useMainContext } from 'context/main'
import { SEARCH_TYPE } from 'machine/searchBox'
import { toPairs } from 'lodash'

const SearchBoxTabs = () => {
  const {
    state,
    context: { searchType },
    actions: { changeSearchType },
  } = useMainContext()
  const isModalOpen = state.matches('open')

  if (!isModalOpen) return null

  return (
    <div className="search-page__search-tabs">
      {toPairs(SEARCH_TYPE).map(([key, tabName]) => {
        const isSameType = searchType === tabName
        const handleClick = () => !isSameType && changeSearchType(SEARCH_TYPE[key])
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
