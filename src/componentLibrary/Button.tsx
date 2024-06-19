// button.tsx
import styled from "@emotion/styled";

type Props = {
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
  correct: boolean;
  answered: boolean;
};

const StyledButton = styled.button<{ selected: boolean; correct: boolean; answered: boolean }>(({ theme, selected, correct, answered }) => ({
  backgroundColor: answered
    ? correct
      ? theme.secondary // Green for correct answer
      : selected // Red for selected wrong answer
        ? theme.error // Red for selected wrong answer
        : theme.primary // Default background color
    : theme.primary, // Default background color
  color: selected ? theme.textInverted : theme.textColor,
  borderRadius: theme.borderRadius_2,
  padding: `${theme.space_md} ${theme.space_lg}`,
  fontSize: theme.h4_fontSize,
  boxShadow: "none",
  border: "none",
  cursor: "pointer",
  transition: "background-color 0.3s, color 0.3s",
}));

export default function Button({ children, onClick, selected, correct, answered }: Props) {
  return (
    <StyledButton
      onClick={onClick}
      selected={selected}
      correct={correct}
      answered={answered}
    >
      {children}
    </StyledButton>
  );
}
