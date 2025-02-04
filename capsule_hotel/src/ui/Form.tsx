import styled, { css } from "styled-components";

interface FormProps {
  type: "modal" | "";
}

const Form = styled.form<FormProps>`
  ${(props) =>
    props.type === "regular" &&
    css`
      background-color: var(--color-grey-0);
      padding: 2.4rem 4rem;
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
