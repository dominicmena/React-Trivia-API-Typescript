import { createBoard } from "@wixc3/react-board";
import Card from "../../../componentLibrary/Card";

export default createBoard({
  name: "Card",
  Board: () => <Card />,
  isSnippet: true,
});
