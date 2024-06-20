import { css, Global, useTheme } from "@emotion/react";

export default function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;400;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Slabo+27px&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;700;900&display=swap');

        html,
        #root {
          height: 100%;
        }

        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background: ${theme.backgroundColor};
          font-family: 'Montserrat', sans-serif; 
          height: 100%;
        }
      `}
    />
  );
}
