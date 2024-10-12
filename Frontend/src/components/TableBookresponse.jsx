import React from "react";
import { Link } from 'react-router-dom'

export const TableBookresponse = () => {
  return (
    <>
      <div className="flex items-center w-screen h-screen justify-center">
        <h1 className="font-medium text-2xl">
        Your booking request was sent. We will call back or send <br /> <span className="mx-4">an
        Email to confirm your reservation. Thank you!&#x1F642;</span>
        </h1>
        <div className="flex position-absolute mt-20  font-large text-xl">
          <Link to="/">
            <p className="bi bi-arrow-left mt-20">Back to Home</p>
          </Link>
        </div>
      </div>
    </>
  );
};
