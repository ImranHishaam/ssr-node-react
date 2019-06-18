export type FETCH_SEARCH = {
  type: "FETCH_SEARCH";
  searchText: string;
  pageNumber: number;
};

export type FETCH_SEARCH_ERROR = {
  type: "FETCH_SEARCH_ERROR";
  error: any;
};

export type FETCH_SEARCH_SUCCESS = {
  type: "FETCH_SEARCH_SUCCESS";
  data: any;
};

export type CLEAR_SEARCH = {
  type: "CLEAR_SEARCH"
}

export const FetchSearchAction = (searchText: string, pageNumber: number): FETCH_SEARCH => {
  return {
    type: "FETCH_SEARCH",
    searchText,
    pageNumber
  };
}

export const FetchSearchSuccessAction = (data: any): FETCH_SEARCH_SUCCESS => {
  return {
    type: "FETCH_SEARCH_SUCCESS",
    data
  };
}

export const FetchSearchErrorAction = (error: any): FETCH_SEARCH_ERROR => {
  return {
    type: "FETCH_SEARCH_ERROR",
    error
  };
}


export const ClearSearchAction = () => {
  return {
    type: "CLEAR_SEARCH"
  };
}
