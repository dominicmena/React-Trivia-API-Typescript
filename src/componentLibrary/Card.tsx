import Box, { Props as BoxProps } from "./Box";
import styled from "@emotion/styled";

const _Card = styled(Box)(({ theme }) => ({
  display: "flex",
  color: theme.textColor,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: theme.borderRadius_3,
  backgroundColor: theme.cardBackground,
  padding: theme.space_lg,
  boxShadow: `${theme.shadowDark}, ${theme.shadowLight}`,
}));

type Props<T> = BoxProps<T>;

export default function Card<T>(props: Props<T>): JSX.Element {
  return <_Card {...props} />;
}
