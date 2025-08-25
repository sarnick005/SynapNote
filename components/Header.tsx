"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="w-full py-6 border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-black"
        >
          SynapNote
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <Button
            variant="outline"
            className="border-gray-400 text-gray-700 hover:bg-gray-100 px-6 py-2"
            onClick={() => router.push("/signin")}
          >
            Signin
          </Button>
        </motion.div>
      </div>
    </header>
  );
}
