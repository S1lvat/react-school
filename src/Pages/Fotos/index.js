import React, { useEffect } from 'react';
import { get } from 'lodash';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import { Form } from './styled';
import { Container } from '../../styles/globalStyles';

import axios from '../../services/axios';
import history from '../../services/history';
import Loading from '../../Components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const [foto, setFoto] = React.useState('');
  const [loading, setIsLoading] = React.useState(false);
  const { id } = get(match, 'params');

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get(`/alunos/${id}`);
        const Foto = get(response, 'data.Fotos[0].url', '');

        setFoto(Foto);
      } catch {
        toast.error('Erro ao obter imagem!');
        setIsLoading(false);
        history.push('/');
      }
      setIsLoading(false);
    }

    getData();
  }, [id]);

  const handleChange = async (e) => {
    // eslint-disable-next-line no-shadow
    const foto = e.target.files[0];
    const fotoURL = URL.createObjectURL(foto);
    setFoto(fotoURL);

    const formData = new FormData();

    formData.append('aluno_id', id);
    formData.append('foto', foto);

    try {
      setIsLoading(true);
      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso!');
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      const { status } = get(err, 'response', '');

      setIsLoading(false);

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={loading} />
      <h1>Fotos</h1>

      <Form enctype="multipart/form-data">
        <label htmlFor="Foto">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar foto!'}
          <input type="file" name="Foto" id="Foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
