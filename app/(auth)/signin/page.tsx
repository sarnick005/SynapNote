"use client";

import { useRef } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SigninPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const login = useAuthStore((state: any) => state.login);
  const router = useRouter();

  const handleSignin = async () => {
    try {
      const response = await axios.post("/api/auth/signin", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      const { user, accessToken } = response.data;
      login(user, accessToken);
      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-5xl shadow-lg rounded-xl overflow-hidden">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-1 relative"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1725290965609-c555ccc87e00?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Signin Illustration"
            className="object-cover"
          />
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center p-8 md:p-12 bg-white"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Welcome Back
          </h1>
          <div className="flex flex-col space-y-4">
            <Input type="email" placeholder="Email" ref={emailRef} />
            <Input type="password" placeholder="Password" ref={passwordRef} />
            <Button
              onClick={handleSignin}
              className="bg-gray-900 text-white hover:bg-gray-700 w-full rounded-xl"
            >
              Signin
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/signup")}
              className="text-gray-900 font-medium cursor-pointer hover:underline"
            >
              Signup
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
