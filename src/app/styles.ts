import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: hsl(358deg 99% 44% /0.3);
  border: 1px solid white;
  opacity: 0.8;
  font-size: 1rem;
  text-shadow: 0.5px 0.5px 1px black;
  padding: 1rem;
  margin-top: 10rem;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  color: hsl(358deg 99% 44% /0.3);
  font-size: 1rem;
  text-shadow: 0.5px 0.5px 1px black;
  padding: 1rem;
`;

export const Button = styled.button`
  padding: 1rem;
  border: 0.5px solid white;
  border-radius: 50%;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  letter-spacing: 2px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  transform: scale(1.1);
  cursor: pointer;
  :hover {
    box-shadow: none;
    color: hsla(204deg 90% 66% / 0.9);
  }
`;

export const StyledForm = styled.form`
  padding: 1rem;
  font-size: 1rem;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  margin: 0.5rem;
  border: 0.5px solid white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  letter-spacing: 1px;
  row-gap: 16px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  transform: scale(1.1);
`;

export const Label = styled.label`
  margin-bottom: 8px;
  display: block;
`;

export const Input = styled.input`
  padding: 1rem;
  color: black;
  background: radial-gradient(
    hsl(358deg 99% 84% /0.3),
    hsl(358deg 99% 64% /0.3)
  );
  border-radius: 50%;
  letter-spacing: 2px;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  border: 0.5px solid black;
  font-weight: 600;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    color: hsla(204deg 90% 66% / 0.9);
  }
`;

export const Input2 = styled.input`
  display: block;
  font-family: inherit;
  width: 100%;
  padding: 4px;
  background-color: #d7ecf7;
  border: 0.5px solid black;
  border-radius: 4px;
  letter-spacing: 0.025rem;
`;
