import React, { useState } from "react";
import { toast } from "react-toastify";
import FormFooter from "../components/auth/FormFooter";
import FormInfos from "../components/auth/FormInfos";
import FormSidebar from "../components/auth/FormSidebar";
import ChatContext from "../data/AppContext";
import { getDataStorage } from "../data/utilsFuns";
import { login, register } from "../services/AuthApi";

const Register = () => {
  const { setUserIsAuthenticated, setSettings, setUserData, setAlert } =
    ChatContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const [isLoading, setLoading] = useState(false);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setFormData((state) => ({ ...state, [name]: value }));
  };
  const handleSubmit = (evt) => {
    setLoading(true);
    evt.preventDefault();
    const loginData = { ...formData };
    (async () => {
      const [data, result] = await register(loginData, setAlert);
      try {
        console.log(result);
        if (result) {
          const [alert, resultLogin] = await login(data, setAlert);
          if (resultLogin) {
            setLoading(false);
            const dataStore = getDataStorage("userData");
            setUserData(dataStore);
            setSettings((setting) => ({
              ...setting,
              token: dataStore.token,
            }));
            toast.success(alert.message);
            return setUserIsAuthenticated(result);
          }

          return toast.error(alert.message);
        }

        return toast.error(data.message);
      } catch (error) {
        return toast.error(error.message);
      }
    })();
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
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-3 -ml-1 text-indigo-500 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx={12}
                        cy={12}
                        r={10}
                        stroke="currentColor"
                        strokeWidth={4}
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </>
                ) : (
                  "Register"
                )}
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
