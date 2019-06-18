import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchSearchApi } from "../apis/movieSearchApi";
import { ClearSearchAction } from '../actions/searchAction';

import { MovieCell } from './movieCellComponent';
import { LoadingComponent } from './loadingComponent';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { Offline } from "react-detect-offline";

type Props = {
  fetchSearchApi: ({ searchText: string, pageNumber: number });
  debounceEvent: Function;
  isLoading: boolean;
  error: boolean;
  errorMessage: string;
  pageNumber: number;
  result: Array<Object>;
  searchText: string;
  ClearSearchAction: ({});
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
      props.ClearSearchAction();
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
        <main className="wrapper">
          <input
              placeholder="Search Movies"
              onChange={debounceEvent(handleTextChange, 500)} />

          <section className="breweries" id="breweries">
          <Offline>You're offline right now. Check your connection.</Offline>
            {props.error ? props.errorMessage : null}
            <InfiniteScroll
              dataLength={props.result.length}
              next={loadMore}
              hasMore={true}
              loader={<LoadingComponent />}
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
            </InfiniteScroll>
          </section>
        </main>

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
  searchText: state.search.searchText
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchSearchApi: ({ searchText, pageNumber }) => dispatch(fetchSearchApi({ searchText, pageNumber })),
  ClearSearchAction: () => dispatch(ClearSearchAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchComponent);
