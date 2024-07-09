import Container from "../../shared/Container";
import LoginForm from "./LoginForm";
import loginImg from "../../assets/image/taskManagementLogin.png";
import { Helmet } from "react-helmet-async";

const Login = () => {
  return (
    <div>
      <Helmet>
        <title>FarmEr | Login</title>
      </Helmet>
      <Container>
        <div className="min-h-screen w-full flex flex-col lg:flex-row gap-3 justify-center items-center">
          <div className="flex-1">
            <LoginForm></LoginForm>
          </div>
          <div className="flex-1">
            <img src={loginImg} alt="farmerImg" className="w-full" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
