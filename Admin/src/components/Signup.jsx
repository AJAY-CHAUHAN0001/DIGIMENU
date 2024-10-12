import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const signUpApi = "https://digimenu-backend.onrender.com/register";

export const Signup = () => {
  const navigate = useNavigate();
  const [un, setUn] = useState("");
  const [em, setEm] = useState("");
  const [pwd, setPwd] = useState("");

  const [loading, setLoading] = useState(false);

  const usernameHandler = (e) => {
    setUn(e.target.value);
  };

  const emailHandler = (e) => {
    setEm(e.target.value);
  };

  const passwordHandler = (e) => {
    setPwd(e.target.value);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!un || !em || !pwd) {
      toast.error("Please fill out all fields");
      return;
    }
    let data = {
      name: un,
      email: em,
      password: pwd,
    };
    try {
      const response = await axios.post(signUpApi, data);
      setTimeout(() => {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/Menugroup");
        } else {
          toast(response.data.message);
        }
      }, 2000);
    } catch (error) {
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
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={signupHandler}
        className="shadow-xl flex flex-col gap-2 p-8 w-1/3 rounded-xl "
      >
        <div className="my-1">
          <h1 className="text-center font-medium text-2xl">SIGN UP</h1>
        </div>
        <div>
          <Label className="font-medium">Username</Label>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={usernameHandler}
            required
            className="focus-visible:ring-transparent my-2"
          />
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
            "SIGN UP NOW"
          )}
        </Button>
        <p className="text-center font-medium">
          Already have an account ?
          <Link
            className="mx-2 text-lg hover:text-blue-500 hover:underline transition duration-300 ease-in-out"
            to="/"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
