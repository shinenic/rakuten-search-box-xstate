import { assign, Machine, send, actions } from 'xstate'
import { makeid } from 'utils/base'
import { random } from 'lodash'

const { cancel } = actions

const DELAY_TIME = 1000

const fetchSuggestion = ({ inputValue }, { keyword }) => {
  return new Promise((reslove) => {
    setTimeout(() => {
      let result = []
      for (let i = 0; i < 7; i++) {
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
    TOGGLE_DEBOUCING_INPUT: [
      {
        cond: 'withKeywordEventValue',
        target: '.deboucingInput',
        actions: ['cancelSearch', 'sendSearchEventAfterDelay', 'setInputValue'],
      },
      { target: '.idle', actions: ['cancelSearch', 'cleanSuggestion', 'setInputValue'] },
    ],
    TOGGLE_CLEAN: { actions: ['cleanSuggestion', 'cleanInputValue'] },
    CHANGE_SEARCH_MODE: { actions: 'setSearchMode' },
    CANCEL_SEARCH: { target: 'close' },
    DO_SEARCH: { target: 'close', actions: ['setKeyword', 'setFilter'] },
  },
  states: {
    idle: {},
    deboucingInput: {
      entry: 'cleanSuggestion',
    },
    fetching: {
      entry: 'cleanSuggestionError',
      invoke: {
        id: 'fetch-suggestion',
        src: 'fetchSuggestion',
        onDone: [
          { cond: 'withInputValue', target: 'idle', actions: 'setSuggestions' },
          { target: 'idle' },
        ],
        onError: { target: 'error', actions: ['setSuggestionError'] },
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
      exit: 'cleanSuggestion',
      entry: ['resetInputValue', 'resetSearchMode'],
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
  suggestionError: null,
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
      cleanSuggestionError: assign({ suggestionError: null }),

      // set actions
      setKeyword: assign({ keyword: (_, { keyword }) => keyword || '' }),
      setFilter: assign({ filter: ({ filter }, { newFilter = {} }) => ({ ...filter, ...newFilter }) }),
      setInputValue: assign({ inputValue: (_, { keyword }) => keyword }),
      setSuggestions: assign({ suggestions: (_, e) => e?.data ?? [] }),
      setSearchMode: assign({ searchMode: (_, { searchMode }) => searchMode }),
      setResult: assign({ result: (_, { result }) => result }),
      setSuggestionError: assign({ suggestionError: (_, e) => e?.data }),

      // reset actions
      resetInputValue: assign({ inputValue: ({ keyword }) => keyword }),
      resetSearchMode: assign({ searchMode: SEARCH_MODE.MALL }),

      // debounce actions
      sendSearchEventAfterDelay: send('GET_SUGGESTIONS', {
        delay: DELAY_TIME,
        id: 'debounced-fetch',
      }),
      cancelSearch: cancel('debounced-fetch'),
    },
    guards: {
      withInputValue: ({ inputValue }) => Boolean(inputValue),
      withKeyword: ({ keyword }) => Boolean(keyword),
      withKeywordEventValue: (_, { keyword }) => Boolean(keyword),
    },
    services: {
      fetchSuggestion: fetchSuggestion,
    },
  }
)
