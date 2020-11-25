import { assign, Machine } from 'xstate'
import { makeid } from 'utils/base'
import { random } from 'lodash'

const DELAY_TIME = 1000

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
    TOGGLE_DEBOUCING_INPUT: { target: '.deboucingInput', internal: false, actions: 'setInputValue' },
    TOGGLE_CLEAN: { actions: ['cleanSuggestion', 'cleanInputValue'] },
    CHANGE_SEARCH_MODE: { actions: 'setSearchMode' },
    CANCEL_SEARCH: { target: 'close' },
    DO_SEARCH: { cond: 'withInputValue', target: 'close', actions: ['setKeyword', 'setFilter'] },
  },
  states: {
    idle: {},
    deboucingInput: {
      after: {
        [DELAY_TIME]: 'fetching',
      },
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
      ...suggestionState,
    },
    close: {
      on: {
        OPEN_SEARCH_BOX: [
          {
            cond: 'withKeyword',
            target: 'open.fetching',
            actions: ['resetInputValue', 'resetSearchMode'],
          },
          { target: 'open.idle', actions: ['resetInputValue', 'resetSearchMode'] },
        ],
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
