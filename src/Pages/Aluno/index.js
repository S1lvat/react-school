import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FaEdit, FaUserCircle } from 'react-icons/fa';

import { get } from 'lodash';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { Link } from 'react-router-dom';
import { Form, ProfilePicture } from './styled';
import { Container } from '../../styles/globalStyles';
import Loading from '../../Components/Loading/index';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const { id } = get(match, 'params', 0);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [foto, setFoto] = useState('');
  const [altura, setAltura] = useState('');

  useEffect(() => {
    if (!id) return;

    // eslint-disable-next-line no-shadow
    async function getData(id) {
      try {
        setIsLoading(true);
        const response = await axios.get(`/alunos/${id}`);
        const Foto = get(response, 'data.Fotos[0].url', '');
        setFoto(Foto);

        setNome(response.data.nome);
        setSobrenome(response.data.sobrenome);
        setEmail(response.data.email);
        setIdade(response.data.idade);
        setPeso(response.data.peso);
        setAltura(response.data.altura);
      } catch (e) {
        const error = get(e, 'response.data.errors', []);

        error.map((err) => toast.error(err));

        history.push('/');
      }
    }

    getData(id);
    setIsLoading(false);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let hasErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('O nome deve conter entre 3 e 255 caracteres!');
      hasErrors = true;
    }
    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('O sobrenome deve conter entre 3 e 255 caracteres!');
      hasErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('Digite um email valido!');
      hasErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Sua idade deve ser um numero inteiro!');
      hasErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso invalido!');
      hasErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura invalida!');
      hasErrors = true;
    }

    if (hasErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso!');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);
      const status = get(err, 'response.status', 0);

      errors.map((error) => toast.error(error));

      if (status === 401) dispatch(actions.loginFailure());
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno!' : 'Novo aluno!'}</h1>

      {id && (
        <ProfilePicture>
          {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size={180} />}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={40} />
          </Link>
        </ProfilePicture>
      )}

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu Email!"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Salvar!</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
