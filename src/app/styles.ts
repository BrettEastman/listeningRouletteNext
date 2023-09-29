import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #f02127;
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
  color: #f02127;
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
  font-size: 1rem;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  padding: 0.5rem;
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
  row-gap: 8px;
  box-shadow: 0 2px 4px hsl(358deg 99% 24% /0.3);
  transform: scale(1.1);
`;

export const Input = styled.input`
  color: black;
  background-color: hsl(358deg 99% 44% /0.3);
  border-radius: 8px;
  letter-spacing: 3px;
  text-shadow: 0.5px 0.5px hsla(204deg 70% 66% / 0.9);
  border: 0.5px solid black;
  padding: 8px;
  font-weight: 700;
  margin-top: 8px;
  cursor: pointer;
  &:hover {
    color: hsla(204deg 90% 66% / 0.9);
  }
`;
