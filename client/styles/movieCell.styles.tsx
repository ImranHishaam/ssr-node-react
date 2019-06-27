import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const LazyLoadImageContainer = styled(LazyLoadImage)`
    img {
        width: 100%;
    }
`;

export const CellFigure = styled.figure`
    max-height: 220px;
    overflow: hidden;
    border-top-left-radius: .5rem;
    border-top-right-radius: .5rem;
    position: relative;
`;

export const MovieTitle = styled.p`
    font-size: 1rem;
    line-height: 1.5;
    padding: 1rem .75rem;
    color: #666666;
`;