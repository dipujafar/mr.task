import { Link } from "react-router-dom";
import logoImg from "../assets/image/taskManagerLogo.png";
import manageTaskImg from "../assets/image/ManageTasks.jpg";
import Typewriter from "typewriter-effect";
import BannerImage from "./BannerImage";

const Banner = () => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      <div className=" flex-1 mt-10 space-y-5 lg:space-y-10">
        {/* logo  */}
        <Link
          to="/"
          className="text-4xl font-bold text-sky-500 flex items-center"
        >
          <img src={logoImg} alt="logo_image" className="w-20" />
          <span className="text-sky-800">Mr.</span> Task{" "}
        </Link>
        {/* Heading Text  */}
        <div className="space-y-5">
          <h1 className=" text-4xl md:text-7xl font-light">
            {" "}
            <span className=" text-sky-500 flex gap-5 items-center">
              ONLINE{" "}
              <img
                src={manageTaskImg}
                alt="task_manageImg"
                className="w-40 h-20 rounded-full"
              />
            </span>
            TASK MANAGER
          </h1>
          <h1 className="text-3xl md:text-6xl font-medium">
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 50,
                strings: [
                  "Organize your Work.",
                  "Organize your Life.",
                  "Manage your Team.",
                ],
              }}
            ></Typewriter>
          </h1>
          <p className="max-w-xl text-center text-xl text-gray-700">
            Simplify life for both you and your team. Mr.Task task management
            tool packing more capabilities than you can imagine.
          </p>
        </div>
        {/* action button  */}
        <Link
          to="/login"
          className="btn btn-lg bg-gradient-to-r from-sky-800 to-sky-500 px-20  rounded-full text-white text-xl"
        >
          Get Start
        </Link>
      </div>
      <div className="flex-1 flex justify-center ">
        <BannerImage></BannerImage>
      </div>
    </div>
  );
};

export default Banner;
