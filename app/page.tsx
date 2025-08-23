"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900">
      <div className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to <span className="text-gray-700">Brain2Note</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            An AI integrated minimal, clean platform to store your important
            notes & links
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Button
              className="bg-gray-900 text-white hover:bg-gray-700 px-6 py-2 rounded-xl"
              onClick={() => router.push("/signup")}
            >
              Signup
            </Button>
            <Button
              variant="outline"
              className="border-gray-400 text-gray-700 hover:bg-gray-100 px-6 py-2 rounded-xl"
              onClick={() => router.push("/signin")}
            >
              Signin
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-full max-w-md h-72 md:h-96">
            <img
              src="https://plus.unsplash.com/premium_photo-1725290965609-c555ccc87e00?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Landing Hero"
              className="object-cover rounded-2xl shadow-lg"
            />
          </div>
        </motion.div>
      </div>
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-gray-500 text-sm"
      >
        © {new Date().getFullYear()} Your App. All rights reserved.
      </motion.footer>
    </div>
  );
}
