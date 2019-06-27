import axios from 'axios';
import { FetchSearchAction, FetchSearchSuccessAction, FetchSearchErrorAction } from "../actions/search.action";
import { SEARCH } from '../constants/API.constants';

export const fetchSearchApi = ({ searchText, pageNumber }) => {
    return async (dispatch: any) => {
        try {
            dispatch(FetchSearchAction(searchText, pageNumber))
            const data = await axios.get(
                `${window.location.origin}${SEARCH}?searchString=${searchText}&page=${pageNumber}`
            );
            dispatch(FetchSearchSuccessAction(data.data));
        } catch (error) {
            if (error.response === undefined) {
                dispatch(FetchSearchErrorAction({ success: false, error: { message: error.message } }));
            } else {
                dispatch(FetchSearchErrorAction(error.response.data));
            }
        }
    }
}