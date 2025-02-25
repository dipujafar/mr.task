import SignUpForm from "./SignUpForm";
import signImg from "../../assets/image/taskManagementSignUp.png";
import { Helmet } from "react-helmet-async";
import Container from "../../shared/Container";

const SignUp = () => {
  return (
    <div>
      <Helmet>
        <title>FarmEr | SignUp</title>
      </Helmet>
      <Container>
        <div className="min-h-screen w-full flex flex-col lg:flex-row gap-3 justify-center items-center">
          <div className="flex-1">
            <SignUpForm></SignUpForm>
          </div>
          <div className="flex-1">
            <img src={signImg} alt="Mr.TaskImg" className="w-full" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SignUp;
