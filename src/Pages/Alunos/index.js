import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEdit, FaWindowClose } from 'react-icons/fa';
import { get } from 'lodash';

import { Link } from 'react-router-dom';
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
      const response = await axios.get('/alunos');

      setAlunos(response.data);
      setIsloading(false);
    }

    getData();
  }, []);

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
            <Link to={`aluno/${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>
          </div>
        ))}
      </AlunosContainer>
    </Container>
  );
}
