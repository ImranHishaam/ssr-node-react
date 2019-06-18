import { FETCH_SEARCH, FETCH_SEARCH_SUCCESS, FETCH_SEARCH_ERROR, CLEAR_SEARCH } from "../actions/searchAction";

type SearchState = {
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  result: Array<Object>,
  searchText: string,
  pageNumber: number
}

const INITIAL_STATE: SearchState = {
  isLoading: false,
  error: false,
  errorMessage: "",
  result: [],
  searchText: "",
  pageNumber: 1
};

export default (state = INITIAL_STATE, action: FETCH_SEARCH | FETCH_SEARCH_SUCCESS | FETCH_SEARCH_ERROR | CLEAR_SEARCH) => {
  switch (action.type) {
    case "FETCH_SEARCH":
      return {
        ...state,
        isLoading: true,
        error: false,
        searchText: action.searchText
      };
    case "FETCH_SEARCH_SUCCESS":
      let pageNumber = state.pageNumber;
      const result = [...state.result, ...action.data.data]
      return {
        ...state,
        isLoading: false,
        result: result,
        pageNumber: pageNumber + 1
      };
    case "FETCH_SEARCH_ERROR":
        return {
          ...state,
          isLoading: false,
          error: true,
          errorMessage: action.error.message
        };
      case "CLEAR_SEARCH":
          return {
            ...state,
            pageNumber: 1,
            result: []
          };
    default:
      return state;
  }
};
