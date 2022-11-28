import React, { useState } from "react";
import { toast } from "react-toastify";
import FormFooter from "../components/auth/FormFooter";
import FormInfos from "../components/auth/FormInfos";
import FormSidebar from "../components/auth/FormSidebar";
import ChatContext from "../data/AppContext";
import { getDataStorage } from "../data/utilsFuns";
import { login } from "../services/AuthApi";

const Login = () => {
  const { setUserIsAuthenticated, setUserData, setSettings, setAlert } =
    ChatContext();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setLoading] = useState(false);
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setFormData((state) => ({ ...state, [name]: value }));
  };
  const handleSubmit = (evt) => {
    setLoading(true);
    evt.preventDefault();
    const loginData = { ...formData };
    // setFormData({ email: "", password: "" });
    login(loginData, setAlert)
      .then(([alert, result]) => {
        console.log(alert, result);
        if (result) {
          const dataStore = getDataStorage("userData");
          setUserData(dataStore);
          setSettings((setting) => ({
            ...setting,
            token: "Bearer " + dataStore.token,
          }));
          toast.success(alert.message);
          return setUserIsAuthenticated(result);
        }
        setLoading(false);
        toast.error(alert.message);
        return result;
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex min-h-screen">
      {/* Container */}
      <div className="flex flex-row w-full bg-gray-50">
        {/* Sidebar */}

        <FormSidebar
          authQuestion="You do not have an account?"
          authBtn="Create account here"
          path="/register"
        />
        {/* Login */}
        <div className="flex flex-1 flex-col items-center justify-center px-10 relative mt-12">
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
                  "Login"
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

export default Login;
