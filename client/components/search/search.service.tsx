import axios from 'axios';
import { 
    fetchSearchAction, 
    fetchSearchSuccessAction, 
    fetchSearchErrorAction,
    searchEndAction
 } from "./search.action";
import { SEARCH } from './search.constants';

export const fetchSearchApi = ({ searchText, pageNumber }) => {
    return async (dispatch: any) => {
        try {
            dispatch(fetchSearchAction(searchText, pageNumber))
            const data = await axios.get(
                `${window.location.origin}${SEARCH}?searchString=${searchText}&page=${pageNumber}`
            );
            if (data.data.end !== undefined) {
                dispatch(searchEndAction());
            } else {
                dispatch(fetchSearchSuccessAction(data.data));
            } 
        } catch (error) {
            if (error.response === undefined) {
                dispatch(fetchSearchErrorAction({ success: false, error: { message: error.message } }));
            } else {
                dispatch(fetchSearchErrorAction(error.response.data));
            }
        }
    }
}