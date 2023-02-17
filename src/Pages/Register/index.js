/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';

import { Form } from './styled';
import { Container } from '../../styles/globalStyles';
import Loading from '../../Components/Loading';

import axios from '../../services/axios';
import history from '../../services/history';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsloading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsloading(true);
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('O nome deve ter entre 3 e 255 caracteres!');
    }

    if (!isEmail(email)) {
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
      toast.error('Digite um email valido!');
    }

    if (password.length < 3 || password.length > 255) {
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
      toast.error('A senha deve ter entre 6 e 50 caracteres!');
    }

    if (formErrors) return;

    try {
      await axios.post('/users/', {
        nome,
        email,
        password,
      });
      toast.success('Voce fez seu cadastro!');
      setIsloading(false);
      history.push('/login');
    } catch (err) {
      const errors = await get(err, 'response.data.Errors', []);

      errors.map((error) => toast.error(error));
      setIsloading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Crie sua conta!</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua nova senha"
          />
        </label>

        <button type="submit">Criar minha conta!</button>
      </Form>
    </Container>
  );
}
