import { css, Global, useTheme } from "@emotion/react";

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        html,
        #root {
          height: 100%;
        }

        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background: ${theme.backgroundColor};
          font-family: Helvetica, Arial, sans-serif;
          height: 100%;
        }
      `}
    />
  );
}
