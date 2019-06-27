import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";

import { fetchSearchApi } from "./search.service";
import { clearSearchAction } from './search.action';

import { MovieCell } from '../generic/movieCell.component';
import { LoadingComponent } from '../generic/loading.component';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import {
  SearchContainer,
  SearchInputField,
  SearchResultContainer,
  InfiniteScrollContainer
} from './search.style';

type Props = {
  fetchSearchApi: ({ searchText: string, pageNumber: number });
  debounceEvent: Function;
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  pageNumber: number;
  result: Array<Object>;
  searchText: string;
  clearSearchAction: ({});
  hasMore: boolean;
};

const SearchComponent = (props: Props) => {

  const debounceEvent = (...args: any) => {
    this.debouncedEvent = debounce(...args);
    return e => {
      e.persist();
      return this.debouncedEvent(e);
    };
  }

  const handleTextChange = (e: any) => {
    const searchText = e.target.value;
    if (searchText.length >= 3) {
      props.clearSearchAction();
      props.fetchSearchApi({ searchText: e.target.value, pageNumber: 1 });
    }
  };

  const loadMore = () => {
    props.fetchSearchApi({ searchText: props.searchText, pageNumber: props.pageNumber });
  }

  useEffect(() => {
    return () => {
      this.debouncedEvent.cancel();
    }
  });

  return (
    <div>
      <div>
        <SearchContainer>
          <SearchInputField
              placeholder="Search Movies"
              onChange={debounceEvent(handleTextChange, 500)} />

          <SearchResultContainer id="breweries">
            
            {props.error ? props.errorMessage : null}
            <InfiniteScrollContainer
              dataLength={props.result.length}
              next={loadMore}
              hasMore={props.hasMore}
              loader={<LoadingComponent />}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              <ul>
                <Fragment>
                  {props.result.length !== 0 ? (
                    props.result.map((i, index: number) => {

                      return (
                        <LazyLoadComponent key={index}>
                          <MovieCell {...i} />
                        </LazyLoadComponent>
                      );
                    })
                  ) : null}
                </Fragment>
              </ul>
            </InfiniteScrollContainer>
          </SearchResultContainer>
        </SearchContainer>

      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoading: state.search.isLoading,
  error: state.search.error,
  errorMessage: state.search.errorMessage,
  pageNumber: state.search.pageNumber,
  result: state.search.result,
  searchText: state.search.searchText,
  hasMore: state.search.hasMore
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchSearchApi: ({ searchText, pageNumber }) => dispatch(fetchSearchApi({ searchText, pageNumber })),
  clearSearchAction: () => dispatch(clearSearchAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
