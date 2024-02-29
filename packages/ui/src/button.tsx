"use client";

import React from "react";
import {styled} from "styled-components";

const ButtonWrapper = styled.button<{disabled?: boolean}>`
    height: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    
    padding: 8px;
    border-radius: 2px;
    border: 1px solid gray;
    color: ${props => props.disabled && 'gray'};
    
    &:hover {
        ${props => !props.disabled && 'background: rgba(0, 0, 0, 0.08)'};
    }
`

type ButtonProps = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<'button'>

const Button: React.FC<ButtonProps> = ({children, ...props}) => {

  return <ButtonWrapper disabled={props.disabled} {...props}>
    {children}
  </ButtonWrapper>
}
export default Button
