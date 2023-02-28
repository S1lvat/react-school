import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  input {
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0 0 10px 0;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 0 0 25px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0px;
    color: #fff;
    background-color: ${colors.primaryColor};
    padding: 10px;
    border-radius: 50%;
  }
`;
