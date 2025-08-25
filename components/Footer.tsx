"use client";

import { motion } from "framer-motion";
import { BsTwitterX } from "react-icons/bs";
import { FaGlobe, FaLinkedin } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-auto py-6 text-gray-500 text-sm flex flex-col items-center gap-3 border-t"
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
          href="mailto:sarnick.chakraborty@gmail.com"
          className="hover:text-gray-900 transition"
        >
          <FiMail className="w-5 h-5" />
        </a>
      </div>
    </motion.footer>
  );
}
