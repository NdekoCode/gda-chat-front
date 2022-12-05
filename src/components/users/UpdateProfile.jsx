import React, { useState } from "react";
import ChatContext from "../../data/AppContext";

const UpdateProfile = ({ userData, handleVisible }) => {
  const { setSettings, setUserData, handleUpdateForm } = ChatContext();
  const { firstName, lastName, username, email } = userData;
  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
  });
  const handleVisibleUpdate = () => {
    handleVisible();
  };
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
      const [data, result] = await register(loginData);
      try {
        if (result) {
          setLoading(false);
          toast.success(data.message);
          const [alert, resultLogin] = await login(data);
          if (resultLogin) {
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
    <section className="fixed inset-0 z-50 bg-gray-900/80 min-h-screen flex justify-center items-center">
      <div
        className="fadeIn w-full h-auto mx-3 block  right-0 flex flex-col p-2 pb-10 bg-white border shodow-md border-gray-300 xl:block"
        style={{ minWidth: "10rem", minHeight: "250px" }}
      >
        <div className="flex items-center justify-between w-full p-3">
          <button
            onClick={handleVisibleUpdate}
            className="p-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-200"
          >
            <svg
              className="w-6 h-6 text-gray-600 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fillRule="nonzero"
                d="M5.20970461,5.38710056 L5.29289322,5.29289322 C5.65337718,4.93240926 6.22060824,4.90467972 6.61289944,5.20970461 L6.70710678,5.29289322 L12,10.585 L17.2928932,5.29289322 C17.6834175,4.90236893 18.3165825,4.90236893 18.7071068,5.29289322 C19.0976311,5.68341751 19.0976311,6.31658249 18.7071068,6.70710678 L13.415,12 L18.7071068,17.2928932 C19.0675907,17.6533772 19.0953203,18.2206082 18.7902954,18.6128994 L18.7071068,18.7071068 C18.3466228,19.0675907 17.7793918,19.0953203 17.3871006,18.7902954 L17.2928932,18.7071068 L12,13.415 L6.70710678,18.7071068 C6.31658249,19.0976311 5.68341751,19.0976311 5.29289322,18.7071068 C4.90236893,18.3165825 4.90236893,17.6834175 5.29289322,17.2928932 L10.585,12 L5.29289322,6.70710678 C4.93240926,6.34662282 4.90467972,5.77939176 5.20970461,5.38710056 L5.29289322,5.29289322 L5.20970461,5.38710056 Z"
              />
            </svg>
          </button>
        </div>
        <div className="flex justify-center items-center flex-col">
          <form
            className="flex flex-1 flex-col  justify-center space-y-5 max-w-md mb-5 w-full p-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col max-w-md space-y-5">
              <div className="md:flex">
                <div className="w-full md:w-1/2 md:mr-2  mb-5 md:mb-0">
                  <input
                    type="text"
                    placeholder="Firstname..."
                    className="flex px-3 py-2 md:px-4 md:py-3 border-t shadow transition-all  rounded-lg font-medium placeholder:font-normal w-full text-gray-600 "
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full md:w-1/2 md:ml-2">
                  <input
                    type="text"
                    placeholder="Lastname.."
                    className="flex px-3 py-2 md:px-4 md:py-3 border-t shadow transition-all  rounded-lg font-medium placeholder:font-normal w-full text-gray-600 "
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
                  className="flex px-3 py-2 md:px-4 md:py-3 border-t shadow transition-all  rounded-lg font-medium placeholder:font-normal w-full text-gray-600 "
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex px-3 py-2 md:px-4 md:py-3 border-t shadow transition-all  rounded-lg font-medium placeholder:font-normal w-full text-gray-600 "
                  name="email"
                  value={formData.email}
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
                  "Update profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProfile;
