import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const SOCIAL_LINKS = [
  { Icon: Github, href: "https://github.com" },
  { Icon: Twitter, href: "https://twitter.com" },
  { Icon: Linkedin, href: "https://linkedin.com" },
  { Icon: Instagram, href: "https://instagram.com" },
];

export default function Socials() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed left-10 bottom-0 hidden lg:block z-50"
    >
      <div className="flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-slate-400 after:mt-4">
        {SOCIAL_LINKS.map(({ Icon, href }, i) => (
          <a key={i} href={href} target="_blank" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all">
            <Icon size={20} />
          </a>
        ))}
      </div>
    </motion.div>
  );
}