import styled, { css } from "styled-components";

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 8px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &:last-child {
    border-bottom: none;
  }

  ${({ active }) =>
    active &&
    css`
      background-color: #f5f5f5;
    `}
`;
