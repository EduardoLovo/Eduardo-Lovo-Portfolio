import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { personal, socials } from "@/data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  whatsapp: <FaWhatsapp />,
  email: <HiOutlineMail />,
};

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {personal.name}. Feito com Next.js &
          Tailwind.
        </p>
        <div className="flex items-center gap-5 text-xl text-muted">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="transition-colors hover:text-accent"
            >
              {iconMap[s.icon]}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
