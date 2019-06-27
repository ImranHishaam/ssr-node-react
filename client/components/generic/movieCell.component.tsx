import React, { FunctionComponent } from 'react';

import {
  CellFigure,
  MovieTitle,
  LazyLoadImageContainer
} from '../../styles/movieCell.style';

export interface MovieCellProps {
  Title: string
  Poster: string
  Type: string
  Year: string
  imdbID: string
};

export const MovieCell: FunctionComponent<MovieCellProps> = ({ Poster, Title }) => {
  return (
    <li>
      <CellFigure>
        <LazyLoadImageContainer
          alt={Title}
          src={Poster}
          effect="blur"
          visibleByDefault={true}
          />
      </CellFigure>
      <MovieTitle>{Title}</MovieTitle>
    </li>
  );
}


