import { useEffect } from "react";
import taskManagement from "../assets/image/TaskmanagementImage.png";
import Aos from "aos";

const BannerImage = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="bg-gradient-to-r from-sky-200 to-sky-400 w-full lg:w-2/3 min-h-screen flex justify-center items-center rounded-br-full">
      <img
        src={taskManagement}
        alt="task_management_image"
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="1500"
      />
    </div>
  );
};

export default BannerImage;
