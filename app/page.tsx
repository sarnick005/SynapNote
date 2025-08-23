"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { BsTwitterX } from "react-icons/bs";
import { FaGlobe, FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { FiMail } from "react-icons/fi";

export default function Home() {
  const router = useRouter();

return (
  <div className="min-h-screen flex flex-col bg-white text-gray-900">
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row items-center gap-10 px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to <span className="text-gray-700">SynapNote</span>
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
    </div>

    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-auto py-6 text-gray-500 text-sm flex flex-col items-center gap-3"
    >
      <p>
        © {new Date().getFullYear()} SynapNote by{" "}
        <span className="font-medium">Sarnick Chakraborty</span>.
      </p>
      <div className="flex gap-5">
        <a
          href="https://x.com/Sarnick_Ch"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition"
        >
          <BsTwitterX className="w-5 h-5" />
        </a>
        <a
          href="https://github.com/sarnick005"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition"
        >
          <SiGithub className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/sarnick-chakraborty-16828423a/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition"
        >
          <FaLinkedin className="w-5 h-5" />
        </a>
        <a
          href="https://sarnick.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition"
        >
          <FaGlobe className="w-5 h-5" />
        </a>
        <a
          href="mailto:your@email.com"
          className="hover:text-gray-900 transition"
        >
          <FiMail className="w-5 h-5" />
        </a>
      </div>
    </motion.footer>
  </div>
);
}
