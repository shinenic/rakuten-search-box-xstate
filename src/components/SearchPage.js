import React from 'react'
import { useMainContext } from 'context/main'

import SearchBox from './SearchBox'

const SearchPage = () => {
  const {
    context: { keyword, filter },
  } = useMainContext()

  const searchModeName = filter?.mode ?? ''

  return (
    <div className="search-page">
      <div className="search-page__title">Search Page</div>
      <SearchBox />
      <div className="search-page__content">
        <div>搜尋模式：{searchModeName}</div>
        <div>搜尋結果：{keyword}</div>
      </div>
    </div>
  )
}

export default SearchPage
