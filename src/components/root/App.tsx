import Container from "../shared/Container";
import { Router } from "~/components/router/Router";
import { Head } from "../shared/Head";

export const App = () => {
  return (
    <>
      {/* <Head title="Game" description="play game!" /> */}
      <Container>
        <Router />
      </Container></>
  )
};
