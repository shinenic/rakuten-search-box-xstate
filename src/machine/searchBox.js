import { assign, send, actions, Machine } from 'xstate'
import { makeid } from 'utils/base'
import { random } from 'lodash'

const { cancel } = actions

const DELAY_TIME = 800

const fetchSuggestion = ({ inputValue }, { keyword }) => {
  return new Promise((reslove) => {
    setTimeout(() => {
      let result = []
      for (let i = 0; i < 10; i++) {
        result.push(`${inputValue}${makeid(random(3, 10))}`)
      }
      reslove(result)
    }, DELAY_TIME)
  })
}

const suggestionState = {
  initial: 'idle',
  on: {
    GET_SUGGESTIONS: { target: '.fetching' },
    CHANGE_INPUT: { target: '.deboucing', actions: 'setInputValue' },
    TOGGLE_CLEAN: { actions: ['cleanSuggestion', 'cleanInputValue'] },
    CHANGE_SEARCH_MODE: { actions: 'setSearchMode' },
    CANCEL_SEARCH: { target: 'close' },
    DO_SEARCH: { cond: 'withInputValue', target: 'close', actions: ['setKeyword', 'setFilter'] },
  },
  states: {
    idle: {},
    deboucing: {
      entry: ['cancelSearch', 'sendSearchEventAfterDelay'],
    },
    fetching: {
      entry: 'setNoError',
      invoke: {
        id: 'fetch-suggestion',
        src: 'fetchSuggestion',
        onDone: [
          { cond: 'withInputValue', target: 'idle', actions: 'setSuggestions' },
          { target: 'idle' },
        ],
        onError: { target: 'error', actions: ['setError', 'cleanSuggestion'] },
      },
    },
    error: {},
  },
}

const searchBoxState = {
  initial: 'close',
  id: 'search-box-modal',
  states: {
    open: {
      entry: ['initInputValue', 'initSearchMode'],
      exit: 'cleanSuggestion',
      ...suggestionState,
    },
    close: {
      on: {
        OPEN_SEARCH_BOX: [{ cond: 'withKeyword', target: 'open.fetching' }, { target: 'open.idle' }],
      },
    },
  },
}

export const SEARCH_MODE = {
  MALL: '全站',
  JAPAN: '日本購物/旅遊',
  BOOK: '書籍/電子書',
}

const initialContext = {
  keyword: '',
  filter: {
    mode: '',
  },
  inputValue: '',
  result: '',
  searchMode: SEARCH_MODE.MALL,
  suggestions: [],
  loading: false,
  error: null,
}

export const RakutenMallMobileSearchbox = Machine(
  {
    id: 'RakutenMallMobileSearchbox',
    context: initialContext,
    ...searchBoxState,
  },
  {
    actions: {
      // clean actions
      cleanSuggestion: assign({ suggestions: [] }),
      cleanInputValue: assign({ inputValue: '' }),

      // set actions
      setKeyword: assign({ keyword: (_, { keyword }) => keyword || '' }),
      setFilter: assign({ filter: ({ filter }, { newFilter = {} }) => ({ ...filter, ...newFilter }) }),
      setInputValue: assign({ inputValue: (_, { keyword }) => keyword }),
      setSuggestions: assign({ suggestions: (_, e) => e?.data ?? [] }),
      setSearchMode: assign({ searchMode: (_, { searchMode }) => searchMode }),
      setResult: assign({ result: (_, { result }) => result }),
      setNoError: assign({ error: null }),
      setError: assign({ error: (_, e) => e.data || true }),

      initInputValue: assign({ inputValue: ({ keyword }) => keyword }),
      initSearchMode: assign({ searchMode: SEARCH_MODE.MALL }),

      // deboucing actions
      sendSearchEventAfterDelay: send('GET_SUGGESTIONS', {
        delay: DELAY_TIME,
        id: 'debounced-search',
      }),
      cancelSearch: cancel('debounced-search'),
    },
    guards: {
      withInputValue: ({ inputValue }) => Boolean(inputValue),
      withKeyword: ({ keyword }) => Boolean(keyword),
    },
    services: {
      fetchSuggestion: fetchSuggestion,
    },
  }
)