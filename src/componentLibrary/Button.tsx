import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const StyledButton = styled.button(({ theme }) => ({
  backgroundColor: theme.primary,
  borderRadius: theme.borderRadius_2,
  color: theme.textColor,
  padding: `${theme.space_md} ${theme.space_lg}`,
  fontSize: theme.h4_fontSize,
  boxShadow: "none",
  border: "none",
}));

export default function Button(props: Props) {
  return (
    <StyledButton disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
}
