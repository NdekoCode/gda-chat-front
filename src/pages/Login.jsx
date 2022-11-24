import React, { useState } from "react";
import FormFooter from "../components/FormFooter";
import FormInfos from "../components/FormInfos";
import FormSidebar from "../components/FormSidebar";
import ChatContext from "../data/AppContext";
import { login } from "../services/AuthApi";

const Login = () => {
  const { setUserIsAuthenticated } = ChatContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setFormData((state) => ({ ...state, [name]: value }));
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const loginData = { ...formData };
    // setFormData({ email: "", password: "" });
    login(loginData).then((res) => setUserIsAuthenticated(res));
  };

  return (
    <div className="flex min-h-screen">
      {/* Container */}
      <div className="flex flex-row w-full">
        {/* Sidebar */}

        <FormSidebar
          authQuestion="You do not have an account?"
          authBtn="Create account here"
          path="/register"
        />
        {/* Login */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 relative mt-12">
          {JSON.stringify(formData)}
          {/* Login box */}
          <form
            className="flex flex-1 flex-col  justify-center space-y-5 max-w-md"
            method="POST"
            onSubmit={handleSubmit}
          >
            <FormInfos
              title="Sign in to your account"
              description="Sign up or log in to place the order,no password require!"
            />
            <div className="flex flex-col max-w-md space-y-5">
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
              <button className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
                Login
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

export default Login;
