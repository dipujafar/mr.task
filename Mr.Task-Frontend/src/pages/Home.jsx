import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import Container from "../shared/Container";

const Home = () => {
  return (
    <Container>
      <Helmet>
        <title>Mr.Task | Home</title>
      </Helmet>
      <Banner></Banner>
    </Container>
  );
};

export default Home;
