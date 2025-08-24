"use client";

import { useRef } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiHome } from "react-icons/fi";
import { toast } from "react-toastify";

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
      toast.success("Signed in successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Signin failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-5xl shadow-lg rounded-xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex flex-1 relative"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1725290965609-c555ccc87e00?q=80&w=1074&auto=format&fit=crop"
            alt="Signin Illustration"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex flex-col justify-center p-6 md:p-12  mt-[-30px] md:mt-0 z-[9999]"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
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
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="mt-6 flex items-center gap-2"
          >
            <FiHome className="text-lg" />
            Back to Home
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
