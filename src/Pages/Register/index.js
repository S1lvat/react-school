/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';

import { Form } from './styled';
import { Container } from '../../styles/globalStyles';
import Loading from '../../Components/Loading';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user?.id);
  const nomeStored = useSelector((state) => state.auth.user?.nome);
  const emailStored = useSelector((state) => state.auth.user?.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [id, nomeStored, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();
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

    if (!id && (password.length < 3 || password.length > 255)) {
      // eslint-disable-next-line no-unused-vars
      formErrors = true;
      toast.error('A senha deve ter entre 6 e 50 caracteres!');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ nome, email, password, id }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{!id ? 'Crie sua conta!' : 'Edite seus dados!'}</h1>
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

        <button type="submit">{!id ? 'Criar minha conta!' : 'Salvar!'}</button>
      </Form>
    </Container>
  );
}
