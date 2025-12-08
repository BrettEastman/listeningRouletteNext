import styled from "styled-components";

export const Subtitle = styled.div`
  font-size: var(--font-size-2xl);
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-md);
  letter-spacing: 0.025em;
  font-weight: 600;
`;

export const Paragraph = styled.p<{
  size?: string;
  color?: string;
  padding?: string;
}>`
  font-size: ${(props) => props.size || "var(--font-size-base)"};
  color: ${(props) => props.color || "var(--color-text-primary)"};
  padding: ${(props) => props.padding || "0rem"};
  line-height: 1.6;
`;

export const Container = styled.div<{
  $flexDirection?: string;
  $justifyContent?: string;
  $gap?: string;
  $alignItems?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || "row"};
  justify-content: ${(props) => props.$justifyContent || "space-around"};
  align-items: ${(props) => props.$alignItems || "center"};
  gap: ${(props) => props.$gap || "var(--spacing-md)"};
`;

export const Stack = styled.div<{
  $justifyContent?: string;
  $flexDirection?: string;
  $gap?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.$flexDirection || "column"};
  justify-content: ${(props) => props.$justifyContent || "flex-start"};
  gap: ${(props) => props.$gap || "var(--spacing-xl)"};
`;

export const StyledWrapper = styled.div<{
  $justifyContent?: string;
  $gap?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.$justifyContent || "flex-start"};
  align-items: center;
  color: var(--color-accent);
  padding: var(--spacing-md);
  width: 24rem;
  gap: ${(props) => props.$gap || "0rem"};
`;

export const Button = styled.button`
  padding: var(--spacing-sm) var(--spacing-lg);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-pill);
  background: var(--color-primary);
  letter-spacing: 0.025em;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }
  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

export const Form = styled.form`
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  min-height: 10.5rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  &:focus-within {
    border-color: var(--color-primary);
    box-shadow: var(--shadow-md);
  }
`;

export const Label = styled.label`
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-sm);
  display: block;
  width: 100%;
  font-weight: 500;
  font-size: var(--font-size-sm);
`;

export const Input = styled.input`
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background: var(--color-surface);
  letter-spacing: 0.025em;
  box-shadow: var(--shadow-sm);
  margin-top: var(--spacing-sm);
  transition: all 0.2s ease;
  cursor: pointer;
  &:hover {
    border-color: var(--color-primary-light);
    box-shadow: var(--shadow-md);
  }
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
    background: var(--color-surface-elevated);
  }
  &[type="submit"] {
    background: var(--color-primary);
    color: var(--color-text-inverse);
    border-color: var(--color-primary);
    &:hover {
      background: var(--color-primary-dark);
      border-color: var(--color-primary-dark);
    }
  }
`;

export const InputRectangle = styled.input`
  display: block;
  font-family: inherit;
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  letter-spacing: 0.025em;
  color: var(--color-text-primary);
  transition: all 0.2s ease;
  &:hover {
    border-color: var(--color-primary-light);
  }
  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
    background: var(--color-surface-elevated);
  }
`;

export const BorderStack = styled.div`
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  overflow: auto;
  background: var(--color-surface);
  padding: var(--spacing-md);
  transition: border-color 0.2s ease;
  &:hover {
    border-color: var(--color-primary-light);
  }
`;

export const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 36rem;
`;
