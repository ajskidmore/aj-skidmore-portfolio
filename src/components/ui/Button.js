import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.space[2]} ${theme.space[4]}`};
  background: ${({ variant, theme }) => 
    variant === 'outline' ? 'transparent' : theme.colors.primary};
  color: ${({ variant, theme }) => 
    variant === 'outline' ? theme.colors.primary : 'white'};
  border: ${({ variant, theme }) => 
    variant === 'outline' ? `2px solid ${theme.colors.primary}` : 'none'};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  height: 45px;
  
  &:hover {
    background: ${({ variant, theme }) => 
      variant === 'outline' ? 'rgba(66, 153, 225, 0.1)' : '#3182ce'};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  ...rest 
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      disabled={disabled}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;