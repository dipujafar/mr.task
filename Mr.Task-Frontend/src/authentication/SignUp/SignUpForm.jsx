import React, { useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdPeopleAlt } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import logoImg from "../../assets/image/taskManagerLogo.png";

const SignUpForm = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { name, image, email, password, confirmPassword } = data || {};
    console.log(name, image, email, password, confirmPassword);
  };

  return (
    <div>
      <div className=" mt-2 lg:w-3/4 bg-black  bg-opacity-20  mx-auto border  rounded-2xl shadow-lg shadow-gray-300 p-5 ">
        <Link
          to="/"
          className="text-3xl font-bold text-sky-500 flex justify-center items-center"
        >
          <img src={logoImg} alt="logo_image" className="w-16" />
          <span className="text-sky-800">Mr.</span> Task{" "}
        </Link>
        <h1 className="text-3xl font-serif mb-5 uppercase text-center">
          Register
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name input */}
          <div className="flex items-center mb-5 ">
            <label>
              <MdPeopleAlt className="text-2xl"></MdPeopleAlt>
            </label>
            <input
              type="text"
              name="name"
              {...register("name", { required: true })}
              id=""
              placeholder="Your Name"
              className="w-3/4 mx-auto py-1 px-2 text-white bg-blue-950 rounded "
            />
          </div>
          {errors.name?.type === "required" && (
            <span className="text-red-600 ml-10">Name is required</span>
          )}

          {/* Email image */}
          <div className="flex items-center mb-5 ">
            <label>
              <AiOutlineMail className="text-2xl"></AiOutlineMail>
            </label>
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              id=""
              placeholder="Your Email"
              className="w-3/4 mx-auto py-1 px-2 text-white  bg-blue-950 rounded"
            />
          </div>
          {errors.email?.type === "required" && (
            <span className="text-red-600 ml-10">Email is required</span>
          )}

          {/* Password input */}
          <div className="flex items-center mb-5 relative">
            <label>
              <RiLockPasswordLine className="text-2xl"></RiLockPasswordLine>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              id=""
              placeholder="Password"
              className="w-3/4 mx-auto py-1 px-2 text-white bg-blue-950  rounded"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-8 lg:right-12"
            >
              {show ? (
                <AiOutlineEye className="text-2xl"></AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible className="text-2xl"></AiOutlineEyeInvisible>
              )}
            </span>
          </div>
          {errors.password?.type === "required" && (
            <span className="text-red-600 ml-10">Password is required</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="text-red-600 ml-10">
              Password must be 6 character.
            </span>
          )}
          {errors.password?.type === "maxLength" && (
            <span className="text-red-600 ml-10">
              Password must less then 20 character.
            </span>
          )}

          {/* confirm password */}
          <div className="flex items-center mb-5 relative">
            <label>
              <RiLockPasswordLine className="text-2xl"></RiLockPasswordLine>
            </label>
            <input
              type={show ? "text" : "password"}
              name="confirmPassword"
              {...register("confirmPassword", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
              id=""
              placeholder="Confirm Password"
              className="w-3/4 mx-auto py-1 px-2 text-white bg-blue-950  rounded"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-8 lg:right-12"
            >
              {show ? (
                <AiOutlineEye className="text-2xl"></AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible className="text-2xl"></AiOutlineEyeInvisible>
              )}
            </span>
          </div>
          {errors.confirmPassword?.type === "required" && (
            <span className="text-red-600 ml-10">
              Confirm password is required
            </span>
          )}

          {/* profile image */}
          <div className="mb-5">
            <label className="flex gap-2 items-center mb-2">
              <FaCamera className="text-2xl" />
              Select Profile:
            </label>
            <input
              type="file"
              name="image"
              {...register("image", { required: true })}
              id=""
              accept="image/*"
            />
          </div>
          {errors.image?.type === "required" && (
            <span className="text-red-600 ml-10">Image is required</span>
          )}

          <input
            type="submit"
            value="Register"
            className="w-full btn bg-blue-100 btn-sm"
          />

          <p className="mt-2">
            Already have account?{" "}
            <Link to="/login">
              <span className="text-blue-600 font-semibold">Login</span>
            </Link>
          </p>
          <p className="text-xl text-red-700">{error}</p>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
