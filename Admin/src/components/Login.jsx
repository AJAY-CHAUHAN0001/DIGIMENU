import { toast } from "sonner";
import { Label } from "../components/ui/label";
import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spinner } from "react-bootstrap";

// const loginApi = "https://digimenu-backend.onrender.com";

export const Login = () => {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [em, setEm] = useState("");

  const [loading, setLoading] = useState(false);

  const passwordHandler = (e) => {
    setPwd(e.target.value);
  };
  const emailHandler = (e) => {
    setEm(e.target.value);
  };

  const LoginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!em || !pwd) {
      toast.error("Please fill out all fields");
      return;
    }
    let data = {
      email: em,
      password: pwd,
    };
    try {
      const response = await axios.post("https://digimenu-backend.onrender.com/login", data);
      setTimeout(() => {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/Menugroup");
        } else if (response.data.status == 400) {
          toast(response.data.message);
        }
      },2000);
    } 
    catch (error) {
      console.log(error);
      setTimeout(()=>{
        toast.error(error.message);
      },2000)
    } finally {
      setTimeout(()=>{
        setLoading(false);
      },2000)
    }
  };

  return (
    <>
      <div className="flex items-center w-screen h-screen justify-center">
        <form
          onSubmit={LoginHandler}
          className="shadow-xl flex flex-col gap-2 p-8 w-1/3 rounded-xl "
        >
          <div className="my-1">
            <h1 className="text-center font-medium text-2xl">LOG IN</h1>
          </div>
          <div>
            <Label className="font-medium">Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={emailHandler}
              required
              className="focus-visible:ring-transparent my-2"
            />
          </div>
          <div>
            <Label className="font-medium">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={passwordHandler}
              required
              className="focus-visible:ring-transparent my-2"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className="me-2"
                />
                Please wait...
              </>
            ) : (
              "LOG IN NOW"
            )}
          </Button>
          <p className="text-center font-medium">
            Don't have an account ?
            <Link
              className="mx-2 text-lg hover:text-blue-500 hover:underline transition duration-300"
              to="/signup"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      <style></style>
    </>
  );
};
