import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroll-component';

export const SearchContainer = styled.main`
    text-align: center;
`;

export const SearchInputField = styled.input`
    margin:15px 0;
    padding:15px 10px;
    width:100%;
    outline:none;
    border:1px solid #bbb;
    border-radius:20px;
    display:inline-block;
    text-align: center;
    width: 50%;
`;

export const SearchResultContainer = styled.section`
    padding: 2rem;
`;

export const InfiniteScrollContainer = styled(InfiniteScroll)`
    ul {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        grid-gap: 1rem;
    }
  
    li {
        border: 1px solid #E2E2E2;
        border-radius: .5rem;
        list-style: none;
    }
`;