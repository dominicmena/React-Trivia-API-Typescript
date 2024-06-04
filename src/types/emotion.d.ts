import { Theme as DefaultTheme } from "../theme/darkTheme";

declare module "@emotion/react" {
  export interface Theme extends DefaultTheme {}
}
