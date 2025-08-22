"use client";

import { useRef } from "react";

import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const login = useAuthStore((state) => state.login);
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
    <div>
      <h1>Signin Page</h1>
      <input type="email" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={handleSignin}>Signin</button>
    </div>
  );
}
