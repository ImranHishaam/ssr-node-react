import React, { FunctionComponent } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
      <figure>
        <LazyLoadImage
          alt={Title}
          src={Poster}
          effect="blur"
          visibleByDefault={true}
          />
      </figure>
      <p>{Title}</p>
    </li>
  );
}


