import styled, { createGlobalStyle } from 'styled-components';
import * as colors from '../config/colors';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
}

body {
  font-family: sans-serif;
  background-color: ${colors.primaryDarkColor};
  color: ${colors.primaryDarkColor};
}

html, body, #root {
  height: 100%;
}

button {
  cursor: pointer;
  background-color: ${colors.primaryColor};
  padding: 10px 20px;
  border-radius: 4px;
  color: #fff;
  border: none;
  font-weight: 700;
  transition: all 300ms;
}

button:hover {
  filter: brightness(70%);
}

a {
  text-decoration: none;
  color: ${colors.primaryColor};
}

ul {
  list-style: none;
}

.Toastify__toast-theme--light.Toastify__toast--success .Toastify__toast-icon > svg {
  fill: ${colors.successColor}
}

.Toastify__progress-bar-theme--light.Toastify__progress-bar--success {
  background: ${colors.successColor};
}

.Toastify__toast-theme--light.Toastify__toast--error .Toastify__toast-icon > svg {
  fill: ${colors.errorColor}
}

.Toastify__progress-bar-theme--light.Toastify__progress-bar--error {
  background: ${colors.errorColor};
}
`;

export const Container = styled.section`
  max-width: 520px;
  background-color: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
