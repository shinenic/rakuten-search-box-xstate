import { createContext, useContext } from 'react'
import { useMachine } from '@xstate/react'
import { RakutenMallMobileSearchbox } from 'machine/searchBox'
import { isDevMode } from 'constants/base'

const MainContext = createContext()

export const useMainContext = () => useContext(MainContext)

const MainProvider = ({ children }) => {
  const [state, send] = useMachine(
    RakutenMallMobileSearchbox,
    // To enable chrome debug extension
    { devTools: true }
  )

  // For Debug
  if (isDevMode) {
    console.log('🚀Machine state')
    console.log(state)
    console.log(state.context)
  }

  const { searchMode } = state.context

  const actions = {
    openSearchBox: () => send('OPEN_SEARCH_BOX'),
    closeSearchBox: () => send('CANCEL_SEARCH'),
    changeSearchMode: (searchMode) => send({ type: 'CHANGE_SEARCH_MODE', searchMode }),
    toggleDeboucingInput: (keyword = '') => send({ type: 'TOGGLE_DEBOUCING_INPUT', keyword }),
    cleanInput: () => send('TOGGLE_CLEAN'),
    doSearch: (keyword = '', newFilter = { mode: searchMode }) =>
      send({ type: 'DO_SEARCH', keyword, newFilter }),
  }

  const getMainContext = () => {
    return {
      state,
      send,
      context: state.context,
      actions,
    }
  }

  return <MainContext.Provider value={getMainContext()}>{children}</MainContext.Provider>
}

export default MainProvider
