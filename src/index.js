import React from 'react'
import ReactDOM from 'react-dom'
import SearchPage from './components/SearchPage'
import 'styles/index.scss'
import MainProvider from 'context/main'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <MainProvider>
      <SearchPage />
    </MainProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
