import React from 'react'
import { useMainContext } from 'context/main'

import SearchBox from './SearchBox'

const SearchPage = () => {
  const {
    context: { keyword, searchType },
  } = useMainContext()

  return (
    <div className="search-page">
      <div className="search-page__title">Search Page</div>
      <SearchBox />
      <div className="search-page__content">
        <div>搜尋種類：{searchType}</div>
        <div>搜尋結果：{keyword}</div>
      </div>
    </div>
  )
}

export default SearchPage
