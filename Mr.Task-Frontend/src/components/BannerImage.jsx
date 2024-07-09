import taskManagement from "../assets/image/TaskmanagementImage.png";

const BannerImage = () => {
  return (
    <div className="bg-gradient-to-r from-sky-300 to-sky-500 w-2/3 min-h-screen flex justify-center items-center rounded-br-">
      <img src={taskManagement} alt="task_management_image" />
    </div>
  );
};

export default BannerImage;
