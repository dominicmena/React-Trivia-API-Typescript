import { useTheme } from "@emotion/react";
import Flex from "./Flex";

type Props = {
  children: JSX.Element;
};

export default function Layout(props: Props) {
  const theme = useTheme();

  return (
    <Flex direction="column" height="100%">
      <Flex
        color={theme.textInverted}
        backgroundColor={theme.primary}
        padding={theme.space_md}
        width="100%"
      >
        Trivia App
      </Flex>
      {props.children}
    </Flex>
  );
}
