/* eslint-disable @typescript-eslint/ban-types */

import * as CSS from "csstype";
import React, {
  ComponentProps,
  DetailedHTMLProps,
  ElementType,
  HTMLAttributes,
} from "react";
import styled from "@emotion/styled";

export type Position = "absolute" | "fixed" | "relative" | "unset";

export type StyleProps = {
  alignSelf?: CSS.Property.AlignSelf;
  animation?: CSS.Property.Animation;
  backgroundColor?: CSS.Property.BackgroundColor;
  backgroundColorOnHover?: CSS.Property.BackgroundColor;
  border?: string;
  borderBottom?: string;
  borderBottomLeftRadius?: string;
  borderBottomRightRadius?: string;
  borderLeft?: string;
  borderRadius?: string;
  borderRight?: string;
  borderTop?: string;
  borderTopLeftRadius?: string;
  borderTopRightRadius?: string;
  bottom?: CSS.Property.Bottom;
  boxShadow?: string;
  cursor?: string;
  display?: CSS.Property.Display;
  flex?: CSS.Property.Flex;
  flexGrow?: number;
  fontSize?: string | number;
  fontWeight?: string | number;
  height?: number | string;
  key?: string | number;
  left?: CSS.Property.Left;
  lineHeight?: CSS.Property.LineHeight;
  margin?: number | string;
  marginBottom?: number | string;
  marginHorizontal?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  marginTop?: number | string;
  marginVertical?: number | string;
  maxHeight?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  minWidth?: number | string;
  opacity?: CSS.Property.Opacity;
  overflow?: string;
  overflowWrap?: CSS.Property.OverflowWrap;
  overflowX?: CSS.Property.OverflowX;
  overflowY?: CSS.Property.OverflowY;
  padding?: number | string;
  paddingBottom?: number | string;
  paddingHorizontal?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
  paddingTop?: number | string;
  paddingVertical?: number | string;
  pointerEvents?: CSS.Property.PointerEvents;
  position?: Position;
  right?: CSS.Property.Right;
  scrollable?: boolean;
  top?: CSS.Property.Top;
  transform?: CSS.Property.Transform;
  transition?: CSS.Property.Transition;
  width?: number | string;
  zIndex?: number;
};

const BOX = styled("div")<StyleProps>(
  ({
    alignSelf,
    animation,
    backgroundColor,
    backgroundColorOnHover,
    border,
    borderBottom,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderLeft,
    borderRadius,
    borderRight,
    borderTop,
    borderTopLeftRadius,
    borderTopRightRadius,
    bottom,
    boxShadow,
    color,
    cursor,
    display,
    flex,
    flexGrow,
    fontSize,
    fontWeight,
    height,
    key,
    left,
    lineHeight,
    margin,
    marginBottom,
    marginHorizontal,
    marginLeft,
    marginRight,
    marginTop,
    marginVertical,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    opacity,
    overflow,
    overflowWrap,
    overflowX,
    overflowY,
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    pointerEvents,
    position,
    right,
    scrollable,
    top,
    transform,
    transition,
    width,
    zIndex,
  }) => ({
    ...(alignSelf && { alignSelf }),
    ...(animation && { animation }),
    ...(backgroundColor && { backgroundColor }),
    ...(border && { border }),
    ...(borderBottom && { borderBottom }),
    ...(borderBottomLeftRadius && { borderBottomLeftRadius }),
    ...(borderBottomRightRadius && { borderBottomRightRadius }),
    ...(borderLeft && { borderLeft }),
    ...(borderRadius && { borderRadius }),
    ...(borderRight && { borderRight }),
    ...(borderTop && { borderTop }),
    ...(borderTopLeftRadius && { borderTopLeftRadius }),
    ...(borderTopRightRadius && { borderTopRightRadius }),
    ...(bottom !== undefined && { bottom }),
    ...(boxShadow && { boxShadow }),
    ...(color && { color }),
    ...(cursor && { cursor }),
    ...(display && { display }),
    ...(flex && { flex }),
    ...(flexGrow && { flexGrow }),
    ...(fontSize && { fontSize }),
    ...(fontWeight && { fontWeight }),
    ...(height !== undefined && { height }),
    ...(key && { key }),
    ...(left !== undefined && { left }),
    ...(lineHeight !== undefined && { lineHeight }),
    ...(margin && { margin }),
    ...(marginBottom && { marginBottom }),
    ...(marginHorizontal && {
      marginLeft: marginHorizontal,
      marginRight: marginHorizontal,
    }),
    ...(marginLeft && { marginLeft }),
    ...(marginRight && { marginRight }),
    ...(marginTop && { marginTop }),
    ...(marginVertical && {
      marginBottom: marginVertical,
      marginTop: marginVertical,
    }),
    ...(maxHeight && { maxHeight }),
    ...(maxWidth && { maxWidth }),
    ...(minHeight !== undefined && { minHeight }),
    ...(minWidth !== undefined && { minWidth }),
    ...(opacity !== undefined && { opacity }),
    ...(overflow && { overflow }),
    ...(overflowWrap && { overflowWrap }),
    ...(overflowX && { overflowX }),
    ...(overflowY && { overflowY }),
    ...(padding && { padding }),
    ...(paddingBottom && { paddingBottom }),
    ...(paddingHorizontal && {
      paddingLeft: paddingHorizontal,
      paddingRight: paddingHorizontal,
    }),
    ...(paddingLeft && { paddingLeft }),
    ...(paddingRight && { paddingRight }),
    ...(paddingTop && { paddingTop }),
    ...(paddingVertical && {
      paddingBottom: paddingVertical,
      paddingTop: paddingVertical,
    }),
    ...(pointerEvents && { pointerEvents }),
    ...(position && { position }),
    ...(right !== undefined && { right }),
    ...(scrollable && { overflow: "auto" }),
    ...(top !== undefined && { top }),
    ...(transform && { transform }),
    ...(transition && { transition }),
    ...(width !== undefined && { width }),
    ...(zIndex && { zIndex }),

    "&:hover": {
      ...(backgroundColorOnHover && {
        backgroundColor: backgroundColorOnHover,
      }),
    },
  })
);

type GetPolyComonentProps<T> = T extends ElementType ? ComponentProps<T> : {};

export type Props<T> = {
  as?: T;
  innerRef?: React.ForwardedRef<HTMLDivElement>;
} & StyleProps &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> &
  GetPolyComonentProps<T>;

export default function Box<T>({ innerRef, ...props }: Props<T>): JSX.Element {
  return <BOX {...props} ref={innerRef} />;
}
