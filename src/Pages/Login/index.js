import React from 'react';
import { useDispatch } from 'react-redux';

import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/globalStyles';
import * as exampleActions from '../../store/modules/example/actions';

export default function Login() {
  const dispatch = useDispatch();

  function handleClick(e) {
    e.preventDefault();

    dispatch(exampleActions.clicaBotaoRequest());
  }

  return (
    <Container>
      <Title>
        Login
        <small>Qualquer coisa!</small>
      </Title>
      <Paragrafo>Outra coisa no paragrafo</Paragrafo>
      <button type="button" onClick={handleClick}>
        Login!
      </button>
    </Container>
  );
}
