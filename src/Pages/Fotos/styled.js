import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 180px;
    background-color: #ccc;
    border-radius: 50%;
    border: 5px dashed ${colors.primaryColor};
    cursor: pointer;
    overflow: hidden;
  }

  input {
    display: none;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;
