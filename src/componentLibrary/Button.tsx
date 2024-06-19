// button.tsx
import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  selected?: boolean;
  correct?: boolean;
};

const StyledButton = styled.button<{ selected: boolean; correct: boolean }>(({ theme, selected, correct }) => ({
  backgroundColor: selected ? (correct ? "green" : "red") : theme.primary,
  borderRadius: theme.borderRadius_2,
  color: theme.textColor,
  padding: `${theme.space_md} ${theme.space_lg}`,
  fontSize: theme.h4_fontSize,
  boxShadow: "none",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s",
}));

export default function Button(props: Props) {
  return (
    <StyledButton disabled={props.disabled} onClick={props.onClick} selected={!!props.selected} correct={!!props.correct}>
      {props.children}
    </StyledButton>
  );
}
