import axios from 'axios';
import { FetchSearchAction, FetchSearchSuccessAction, FetchSearchErrorAction } from "../actions/searchAction";
import BoomerangCache from 'boomerang-cache';

import { SEARCH } from '../constants/API';

const boomerang = BoomerangCache.create('movieBucker', {storage: 'local', encrypt: false});

export const fetchSearchApi = ({searchText, pageNumber}) => {

    return async (dispatch: any) => {

        const cacheData = boomerang.get(`${searchText}-${pageNumber}`);

        if (cacheData !== null) {
            dispatch(FetchSearchSuccessAction(cacheData));
        } else {
            try {
                dispatch(FetchSearchAction(searchText, pageNumber))
                const data = await axios.get(`${window.location.origin}${SEARCH}?searchString=${searchText}&page=${pageNumber}`);
                boomerang.set(`${searchText}-${pageNumber}`, data.data, 30)
                dispatch(FetchSearchSuccessAction(data.data));
            } catch(error) {
                dispatch(FetchSearchErrorAction(error.response.data));
            } 
        }
    }
}