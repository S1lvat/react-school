import styled from 'styled-components';

export const Component = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: bold;
  z-index: 1;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
  }

  span {
    z-index: 1;
  }
`;
