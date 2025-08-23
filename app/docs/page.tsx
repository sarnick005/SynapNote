"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaGlobe, FaHome, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { BsTwitterX } from "react-icons/bs";

export default function DocsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="w-full py-6 border-b border-gray-200">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-black"
          >
            How to use
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-black hover:bg-gray-100"
            >
              Home
            </Button>
          </motion.div>
        </div>
      </header>
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-1">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* <h2 className="text-4xl font-bold text-black">User Guide</h2> */}
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: "Step 1: Account Setup",
                desc: "First, you need to create an account or sign in to access SynapNote features. Click the signup or signin button to get started.",
              },
              {
                title: "Step 2: Create Your Notes",
                desc: (
                  <>
                    <p className="text-gray-700 mb-4">
                      Once signed in, start building your knowledge base:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Add new notes with your content</li>
                      <li>• Include relevant information and context</li>
                      <li>• Add links and references as necessary</li>
                      <li>• Organize your thoughts and ideas</li>
                    </ul>
                  </>
                ),
              },
              {
                title: "Step 3: Generate AI Summaries",
                desc: (
                  <p className="text-gray-700">
                    After creating your notes, click the{" "}
                    <strong>AI Summary</strong> button to automatically generate
                    intelligent summaries of your content.
                  </p>
                ),
              },
              {
                title: "Step 4: Chat with Your Notes",
                desc: (
                  <>
                    <p className="text-gray-700 mb-4">
                      Interact with your knowledge base using AI:
                    </p>
                    <ul className="space-y-2 text-gray-600">
                      <li>
                        • Click the <strong>Chat</strong> button to open the
                        chat panel
                      </li>
                      <li>• Ask questions related to your notes only</li>
                      <li>• Get answers based on your stored content</li>
                      <li>
                        • The AI only responds about information in your notes
                      </li>
                    </ul>
                  </>
                ),
              },
            ].map((step, index) => (
              <motion.section
                key={index}
                className="border border-gray-200 p-6 bg-white rounded-2xl shadow-sm"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold text-black mb-3">
                  {step.title}
                </h3>
                <div>{step.desc}</div>
              </motion.section>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-gray-200">
        <motion.div
          className="max-w-4xl mx-auto px-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm text-gray-500 mb-4">
            © {new Date().getFullYear()} SynapNote by Sarnick Chakraborty
          </p>
          <div className="flex justify-center gap-6">
            {[
              {
                href: "https://x.com/Sarnick_Ch",
                icon: <BsTwitterX className="w-5 h-5" />,
              },
              {
                href: "https://github.com/sarnick005",
                icon: <SiGithub className="w-5 h-5" />,
              },
              {
                href: "https://www.linkedin.com/in/sarnick-chakraborty-16828423a/",
                icon: <FaLinkedin className="w-5 h-5" />,
              },
              {
                href: "https://sarnick.vercel.app",
                icon: <FaGlobe className="w-5 h-5" />,
              },
              {
                href: "mailto:your@email.com",
                icon: <FiMail className="w-5 h-5" />,
              },
            ].map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-black transition"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
