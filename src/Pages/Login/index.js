import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Form } from './styled';
import Loading from '../../Components/Loading';
import { Container } from '../../styles/globalStyles';
import * as actions from '../../store/modules/auth/actions';

export default function Login(props) {
  const dispach = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = false;

    if (!isEmail(email)) {
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
      toast.error('Digite um email valido!');
    }

    if (password.length < 3 || password.length > 255) {
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
      toast.error('Senha invalida!');
    }

    // eslint-disable-next-line no-useless-return
    if (formErrors) return;

    dispach(actions.loginRequest({ email, password, prevPath }));
  };

  return (
    <Container>
      <h1>Login</h1>

      <Loading isLoading={isLoading} />

      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Digite seu e-mail"
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Digite sua senha"
          />
        </label>

        <button type="submit">Acessar!</button>
      </Form>
    </Container>
  );
}
