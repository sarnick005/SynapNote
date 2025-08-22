"use client";

import { useRef } from "react";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const login = useAuthStore((state: { login: any }) => state.login);

  const handleSignup = async () => {
    try {
      const response = await axios.post("/api/auth/signup", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });
      const { user, accessToken } = response.data;
      login(user, accessToken);
      router.push("/profile");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <input type="text" placeholder="Name" ref={nameRef} />
      <input type="email" placeholder="Email" ref={emailRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
