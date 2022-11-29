import React, { useState } from "react";

const SearchFormInterface = ({ users, setUsers }) => {
  const [search, setSearch] = useState("");
  const handleSearch = (evt) => {
    const value = evt.currentTarget.value;
    setSearch(value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newUsers = users.filter(
      (user) =>
        user.username.includes(search) ||
        user.firstName.includes(search) ||
        user.lastName.includes(search)
    );
    setUsers(newUsers);
  };
  return (
    <form
      className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400"
      onSubmit={handleSubmit}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
        <button
          onClick={handleSubmit}
          type="submit"
          className="p-1 focus:outline-none focus:shadow-none"
        >
          <svg
            className="w-6 h-6 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fillRule="nonzero"
              d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"
            />
          </svg>
        </button>
      </span>
      <input
        type="search"
        name="q"
        value={search}
        onChange={handleSearch}
        className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
        style={{ borderRadius: 25 }}
        placeholder="Search..."
        autoComplete="off"
      />
    </form>
  );
};

export default SearchFormInterface;
