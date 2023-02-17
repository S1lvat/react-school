import React from 'react';
import { PropTypes } from 'prop-types';
import { Component } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return <> </>;
  return (
    <Component>
      <div />
      <span>Carregando...</span>
    </Component>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
