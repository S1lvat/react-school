import React, { useEffect, useState } from 'react';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';
import { get } from 'lodash';

import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import history from '../../services/history';
import { AlunosContainer, AlunosPicture } from './styled';
import { Container } from '../../styles/globalStyles';
import axios from '../../services/axios';
import Loading from '../../Components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsloading(true);
      try {
        const response = await axios.get('/alunos');
        setAlunos(response.data);
      } catch (error) {
        setIsloading(false);
      }

      setIsloading(false);
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;

    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const response = await axios.delete(`alunos/${id}`);
      toast.success(response.data);
      const newAlunos = await axios.get('/alunos');
      setAlunos(newAlunos.data);
      setIsloading(false);
    } catch (error) {
      const errors = get(error, 'response.data.errors', []);
      const status = get(error, 'response.status', 0);
      errors.map((err) => toast.error(err));

      if (status === 401) {
        history.push('/login');
      }
    }
    setIsloading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Alunos</h1>

      <AlunosContainer>
        {alunos.map((aluno) => (
          <div key={String(aluno.id)}>
            <AlunosPicture>
              {get(aluno, 'Fotos[0].url', false) ? (
                <img src={aluno.Fotos[0].url} alt="" />
              ) : (
                <FaUserCircle size={35} />
              )}
            </AlunosPicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>
            <Link to={`aluno/${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link to={`/aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} onClick={handleDeleteAsk} />
              <FaExclamation
                size={16}
                display="none"
                onClick={(e) => handleDelete(e, aluno.id)}
              />
            </Link>
          </div>
        ))}
      </AlunosContainer>
    </Container>
  );
}
