import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import history from '../../../services/history';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);

    yield put(actions.loginSuccess({ ...response.data }));
    toast.success(`Bem-vindo ${response.data.user.nome}!`);

    axios.defaults.headers.authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Email ou senha incorretos!');

    yield put(actions.loginFailure());
  }
}

function loginRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');

  if (!token) return;

  axios.defaults.headers.authorization = `Bearer ${token}`;
}

// eslint-disable-next-line consistent-return
function* registerRequest({ payload }) {
  const { nome, email, password, id } = payload;
  try {
    if (id) {
      yield call(axios.put, '/users/', {
        nome,
        email,
        password: password || undefined,
      });

      toast.success(
        'Dados alterados com sucesso! Voce precisara logar novamente!'
      );
      yield put(actions.registerUpdatedSuccess({ nome, email }));
      yield put(actions.loginFailure());
      history.push('/login');
    } else {
      yield call(axios.post, '/users/', {
        nome,
        email,
        password,
      });

      toast.success('Conta criada com sucesso!');
      yield put(actions.registerCreatedSuccess());
      history.push('/login');
    }
  } catch (error) {
    const errors = get(error, 'response.data.errors', []);
    const status = get(error, 'response.status', 0);

    if (errors) {
      errors.map((err) => toast.error(err));
    } else {
      toast.error('Erro desconhecido!');
    }

    if (status === 401) {
      yield put(actions.loginFailure());
      return history.push('/login');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
  takeLatest(types.PERSIST_REHYDRATE, loginRehydrate),
]);
