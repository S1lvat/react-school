import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AlunosContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`;

export const AlunosPicture = styled.div`
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
`;

export const AlunosCriar = styled(Link)`
  display: block;
  padding: 10px 0;
`;
