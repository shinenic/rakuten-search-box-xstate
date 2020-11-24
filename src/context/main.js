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

  const actions = {
    openSearchBox: () => send('OPEN_SEARCH_BOX'),
    closeSearchBox: () => send('CANCEL_SEARCH'),
    changeSearchType: (searchType) => send({ type: 'CHANGE_SEARCH_TYPE', searchType }),
    changeInput: (keyword = '') => send({ type: 'CHANGE_INPUT', keyword }),
    cleanInput: () => send('TOGGLE_CLEAN'),
    doSearch: (keyword = '') => send({ type: 'DO_SEARCH', keyword }),
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
