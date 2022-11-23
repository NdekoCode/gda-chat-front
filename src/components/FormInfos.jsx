import React from "react";

const FormInfos = ({ title, description }) => {
  return (
    <div className="flex flex-col space-y-2 text-center">
      <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
      <p className="text-md md:text-xl">{description}</p>
    </div>
  );
};

export default FormInfos;
