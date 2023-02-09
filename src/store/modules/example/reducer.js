import * as types from '../types';

const initalState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = { initalState }, action) {
  switch (action.type) {
    case types.BOTAO_SUCCESS: {
      // eslint-disable-next-line
      console.log('Sucesso!');
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }
    case types.BOTAO_REQUEST: {
      // eslint-disable-next-line
      console.log('Estou fazendo a requisicao!');
      return state;
    }
    case types.BOTAO_FAILURE: {
      // eslint-disable-next-line
      console.log('Essa requisicao falhou!');
      return state;
    }
    default: {
      return state;
    }
  }
}
