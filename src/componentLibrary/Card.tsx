import Box, { Props as BoxProps } from "./Box";
import styled from "@emotion/styled";

const _Card = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", // Ensure content stacks vertically
  color: theme.textColor,
  alignItems: "center",
  borderRadius: theme.borderRadius_3,
  backgroundColor: theme.cardBackground,
  padding: theme.space_sm, 
  boxShadow: `${theme.shadowDark}, ${theme.shadowLight}`,
}));

type Props<T> = BoxProps<T>;

export default function Card<T>({ children, ...props }: Props<T>): JSX.Element {
  return <_Card {...props}>{children}</_Card>;
}
