import React, { FunctionComponent } from 'react';
import { Facebook } from 'react-content-loader';

export const LoadingComponent: FunctionComponent = () => {
  return (
    <ul>
      <li>
        <Facebook />
      </li>
      <li>
        <Facebook />
      </li>
      <li>
        <Facebook />
      </li>
    </ul>
  );
}
