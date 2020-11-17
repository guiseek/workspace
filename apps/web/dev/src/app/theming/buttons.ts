import * as Type from './type';
import * as Colors from './colors';

export const primitive = `
  font-family: ${Type.fontFamily};
`;

export const primary = `
  ${primitive};
  font-size: 16px;
  font-weight: ${Type.fontWeights.medium};
  border-radius: 6px;
  padding: 0 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 300ms ease;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${Colors.blue30};
  }
`;
