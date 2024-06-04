import { Route, Routes } from "react-router-dom";
import APIClient from "./api/client";
import HomeContainer from "./containers/HomeContainer";

type Props = {
  apiClient: APIClient;
};

export default function AppRouter(props: Props): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomeContainer apiClient={props.apiClient} />} />
    </Routes>
  );
}
