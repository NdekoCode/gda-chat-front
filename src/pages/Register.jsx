import React, { useState } from "react";
import FormFooter from "../components/FormFooter";
import FormInfos from "../components/FormInfos";
import FormSidebar from "../components/FormSidebar";
import ChatContext from "../data/AppContext";
import { register } from "../services/AuthApi";

const Register = () => {
  const { setUserIsAuthenticated } = ChatContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setFormData((state) => ({ ...state, [name]: value }));
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const loginData = { ...formData };
    // setFormData({ email: "", password: "" });
    register(loginData).then((res) => setUserIsAuthenticated(res));
  };

  return (
    <div className="flex min-h-screen">
      {/* Container */}
      <div className="flex flex-row w-full">
        {/* Sidebar */}
        <FormSidebar />
        {/* Sign up */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 relative pt-16">
          {/* Login box */}
          <form
            className="flex flex-1 flex-col  justify-center space-y-5 max-w-md mb-5"
            onSubmit={handleSubmit}
          >
            <FormInfos
              title="Create your account"
              description="Sign up or log in to place the order,no password require!"
            />
            <div className="flex flex-col max-w-md space-y-5">
              <div className="md:flex">
                <div className="w-full md:w-1/2 md:mr-2  mb-5 md:mb-0">
                  <input
                    type="text"
                    placeholder="Firstname..."
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-full"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full md:w-1/2 md:ml-2">
                  <input
                    type="text"
                    placeholder="Lastname.."
                    className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-full"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="Username..."
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-full"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-full"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-full"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="w-full">
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal w-full"
                  name="confpassword"
                  value={formData.confpassword}
                  onChange={handleChange}
                />
              </div>
              <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                Sign in
              </button>
            </div>
          </form>
          {/* Footer */}
          <FormFooter />
        </div>
      </div>
    </div>
  );
};

export default Register;
