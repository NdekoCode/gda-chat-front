import React from "react";
import { Link } from "react-router-dom";

const FormSidebar = ({
  authQuestion = "Do you have an account?",
  authBtn = " Login here",
}) => {
  return (
    <div className="hidden lg:flex flex-col justify-between  bg-gradient-to-r from-white via-gray-100 to-white lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
      <div className="flex items-center justify-start space-x-3">
        <span className="bg-black rounded-full w-8 h-8" />
        <a href="#" className="font-medium text-xl">
          NdekoTchat
        </a>
      </div>
      <div className="space-y-5">
        <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">
          Enter your account and discover new experiences
        </h1>
        <p className="text-lg">{authQuestion} ?</p>
        <Link
          to="/login"
          className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
        >
          {authBtn}
        </Link>
      </div>
      <p className="font-medium">© 2022 Ndekocode</p>
    </div>
  );
};

export default FormSidebar;
