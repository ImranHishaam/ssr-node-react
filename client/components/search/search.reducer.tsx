import {
  FETCH_SEARCH,
  FETCH_SEARCH_SUCCESS,
  FETCH_SEARCH_ERROR,
  CLEAR_SEARCH,
  SEARCH_END
} from "./search.action";

type SearchState = {
  isLoading: boolean,
  error: boolean,
  errorMessage: string;
  result: Array<Object>,
  searchText: string,
  pageNumber: number,
  hasMore: boolean
}

const INITIAL_STATE: SearchState = {
  isLoading: false,
  error: false,
  errorMessage: "",
  result: [],
  searchText: "",
  pageNumber: 1,
  hasMore: true
};

export default (state = INITIAL_STATE, action: FETCH_SEARCH | FETCH_SEARCH_SUCCESS | FETCH_SEARCH_ERROR | CLEAR_SEARCH | SEARCH_END) => {
    switch (action.type) {
      case "FETCH_SEARCH":        
        return Object.assign({}, state, {
          isLoading: false,
          error: false,
          hasMore: true,
          searchText: action.searchText
        });
      case "FETCH_SEARCH_SUCCESS":
        let pageNumber = state.pageNumber;
        const result = [...state.result, ...action.data.data]
        return Object.assign({}, state, {
          isLoading: false,
          error: false,
          result: result,
          pageNumber: pageNumber + 1
        });
      case "FETCH_SEARCH_ERROR":
        return Object.assign({}, state, {
          isLoading: false,
          error: true,
          errorMessage: action.error.error.message
        });
      case "CLEAR_SEARCH":
        return Object.assign({}, state, {
          pageNumber: 1,
          result: []
        });
      case "SEARCH_END":
        return Object.assign({}, state, {
          hasMore: false
        });
      default:
        return state;
    }
};
