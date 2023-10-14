import styled from "styled-components";

export const Subtitle = styled.div`
  font-size: 2rem;
  color: var(--text-color-light);
  margin-bottom: 1rem;
  letter-spacing: 1px;
`;

export const Paragraph = styled.p<{
  size?: string;
  color?: string;
  padding?: string;
}>`
  font-size: ${(props) => props.size || "1rem"};
  color: ${(props) => props.color || "inherit"};
  padding: ${(props) => props.padding || "0rem"};
`;

export const Container = styled.div<{
  flexDirection?: string;
  justifyContent?: string;
  gap?: string;
  alignItems?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "row"};
  justify-content: ${(props) => props.justifyContent || "space-around"};
  align-items: ${(props) => props.alignItems || "center"};
  gap: ${(props) => props.gap || "1rem"};
`;

export const Stack = styled.div<{
  justifyContent?: string;
  flexDirection?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || "column"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  gap: ${(props) => props.gap || "2rem"};
`;

export const StyledWrapper = styled.div<{
  justifyContent?: string;
  gap?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: center;
  color: #a7393d;
  padding: 1rem;
  width: 24rem;
  gap: ${(props) => props.gap || "0rem"};
`;

export const Button = styled.button`
  padding: 1rem;
  color: var(--text-color-light);
  border: 0.5px solid white;
  border-radius: 50%;
  background: transparent;
  letter-spacing: 2px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  cursor: pointer;
  transition: 0.2s all;
  :hover {
    box-shadow: none;
    color: hsla(204deg 90% 66% / 0.9);
    background: radial-gradient(
      hsl(358deg 99% 84% /0.3),
      hsl(358deg 99% 64% /0.3)
    );
  }
`;

export const Form = styled.form`
  padding: 1rem;
  border: 0.5px solid white;
  border-radius: 8px;
  letter-spacing: 1px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  min-height: 10.5rem;
`;

export const Label = styled.label`
  color: var(--text-color-light);
  margin-bottom: 8px;
  display: block;
  width: 100%;
`;

export const Input = styled.input`
  padding: 1rem;
  color: var(--text-color-light);
  border: 0.5px solid white;
  border-radius: 50%;
  background: transparent;
  letter-spacing: 2px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  margin-top: 8px;
  transition: 0.2s all;
  cursor: pointer;
  &:hover {
    box-shadow: none;
    color: hsla(204deg 90% 66% / 0.9);
    background: radial-gradient(
      hsl(358deg 99% 84% /0.3),
      hsl(358deg 99% 64% /0.3)
    );
  }
`;

export const InputRectangle = styled.input`
  display: block;
  font-family: inherit;
  width: 100%;
  padding: 4px;
  background-color: #d7ecf7;
  border: 0.5px solid black;
  border-radius: 4px;
  letter-spacing: 0.025rem;
`;
