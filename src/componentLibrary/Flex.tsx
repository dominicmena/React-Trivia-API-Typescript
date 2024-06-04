import * as CSS from "csstype";
import Box, { Props as BoxProps } from "./Box";
import styled from "@emotion/styled";

type StyleProps = {
  alignItems?: CSS.Property.AlignItems;
  direction?: CSS.Property.FlexDirection;
  flexWrap?: CSS.Property.FlexWrap;
  justifyContent?: CSS.Property.JustifyContent;
};

const _Flex = styled(Box)<StyleProps>(
  ({ alignItems, direction, flexWrap, justifyContent }) => ({
    display: "flex",
    ...(alignItems && { alignItems }),
    ...(direction && { flexDirection: direction }),
    ...(flexWrap && { flexWrap: flexWrap }),
    ...(justifyContent && { justifyContent }),
  })
);

type Props<T> = BoxProps<T> & StyleProps;

export default function Flex<T>(props: Props<T>): JSX.Element {
  return <_Flex {...props} />;
}
