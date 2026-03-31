/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  ArrowUpRight,
  Plus,
  Minus,
  Youtube,
  Facebook,
  Mail,
  ArrowRight,
} from "lucide-react";
import { cn } from "./lib/utils";

const heroBackgroundSrc = new URL("./aa.png", import.meta.url).href;

type SocialIconProps = {
  size?: number;
  className?: string;
};

const TiktokIcon = ({ size = 20, className }: SocialIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M14 3c.31 2.12 1.56 3.95 3.5 4.97V11c-1.38 0-2.72-.4-4-1.18V15a5 5 0 1 1-5-5c.34 0 .67.03 1 .1v3.14a2 2 0 1 0 1 1.76V3H14Z" />
  </svg>
);

const WhatsappIcon = ({ size = 20, className }: SocialIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.05 4.94A9.94 9.94 0 0 0 12 2C6.48 2 2 6.48 2 12c0 1.76.46 3.49 1.32 5.01L2 22l5.15-1.29A9.95 9.95 0 0 0 12 22c5.52 0 10-4.48 10-10 0-2.67-1.04-5.18-2.95-7.06Zm-7.05 15.3a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.06.77.82-2.98-.2-.31A8.21 8.21 0 0 1 3.75 12c0-4.55 3.7-8.25 8.25-8.25 2.2 0 4.27.86 5.82 2.42A8.18 8.18 0 0 1 20.25 12c0 4.55-3.7 8.24-8.25 8.24Zm4.53-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.57.12-.17.25-.65.8-.8.97-.15.17-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.37-.78-1.88-.2-.49-.41-.42-.57-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.04s.88 2.36 1 2.52c.12.17 1.72 2.62 4.16 3.68.58.25 1.03.4 1.39.51.58.19 1.11.16 1.52.1.46-.07 1.47-.6 1.68-1.17.21-.57.21-1.06.15-1.16-.06-.11-.23-.17-.48-.29Z" />
  </svg>
);

// --- Types ---
interface WorkItem {
  id: string;
  title: string;
  tag: string;
  description: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
}

interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: (props?: SocialIconProps) => ReactNode;
}

// --- Dummy Data ---
const SELECTED_WORK_ITEMS: WorkItem[] = [
  {
    id: "01",
    title: "AI Chatbots",
    tag: "Conversational AI",
    description:
      "Intelligent assistants for customer support, lead capture, bookings, and internal team workflows.",
  },
  {
    id: "02",
    title: "Blockchain Applications",
    tag: "Web3 Systems",
    description:
      "Decentralized applications built for secure transactions, smart contracts, token utilities, and transparent processes.",
  },
  {
    id: "03",
    title: "POS Systems",
    tag: "Business Operations",
    description:
      "Fast and reliable point-of-sale systems with billing, inventory tracking, reporting, and day-to-day staff workflows.",
  },
  {
    id: "04",
    title: "Web Applications",
    tag: "Custom Platforms",
    description:
      "Scalable web apps for dashboards, client portals, booking systems, and custom business tools.",
  },
  {
    id: "05",
    title: "Mini Games for Businesses",
    tag: "Interactive Campaigns",
    description:
      "Lightweight branded games designed to boost engagement, promotions, customer retention, and marketing campaigns.",
  },
  {
    id: "06",
    title: "Automation Tools",
    tag: "Internal Systems",
    description:
      "Custom automation and internal software that reduce manual work and improve speed, accuracy, and team efficiency.",
  },
];

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@V_Forge_official",
    icon: (props) => <Youtube {...props} />,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@vforge0?lang=en",
    icon: (props) => <TiktokIcon {...props} />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61575430430372",
    icon: (props) => <Facebook {...props} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+94743206849",
    icon: (props) => <WhatsappIcon {...props} />,
  },
];

const SERVICES: Service[] = [
  {
    id: "01",
    title: "Web Development",
    description:
      "Crafting high-performing websites that convert visitors into customers.",
  },
  {
    id: "02",
    title: "System development",
    description:
      "Designing intuitive digital products with a focus on user experience.",
  },
  {
    id: "03",
    title: "AI intergrations",
    description:
      "AI intergrations for your bussiness, AI chatbots, automations.",
  },
  {
    id: "04",
    title: "Blockchain development",
    description:
      "Building decentralized solutions to help businesses innovate and scale.",
  },
  {
    id: "05",
    title: "Game development",
    description:
      "Building immersive worlds that captivate and engage players effectively.",
  },
  {
    id: "06",
    title: "Video Editing",
    description:
      "Dynamic video content that captures attention and drives engagement.",
  },
];

const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Freelance Software Engineer",
    company: "",
    period: "2022 - Present",
  },
  { id: 2, role: "Software Engineer", company: "", period: "2024-2026" },
  {
    id: 4,
    role: "Entrepreneur",
    company: "V-Forge",
    period: "2026 - present",
  },
];

const FAQS: FAQ[] = [
  {
    id: 1,
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary depending on complexity, but most small web design projects take 1-4 weeks from discovery to launch.",
  },
  {
    id: 2,
    question: "What is your design process?",
    answer:
      "My process is strategy-first. We start with discovery, move to wireframing, then visual design, and finally development or handoff.",
  },
  {
    id: 3,
    question: "Do you offer ongoing support?",
    answer:
      "Yes, I offer maintenance and support packages for all web projects to ensure everything stays up to date and performing well.",
  },
];

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-6 md:px-12",
        scrolled ? "bg-bg/80 backdrop-blur-md py-4" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="text-xl font-display uppercase tracking-tighter">
          Vimukthi Kulasekara
        </a>
        <div className="hidden md:flex gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#work" className="hover:text-accent transition-colors">
            Work
          </a>
          <a href="#about" className="hover:text-accent transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-accent transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-accent transition-colors">
            Contact
          </a>
        </div>
        <a
          href="#contact"
          className="bg-ink text-bg px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-ink transition-all"
        >
          Let's Talk
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/40 to-bg z-10" />
        <img
          src={heroBackgroundSrc}
          alt="Hero Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover grayscale opacity-40"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-[15vw] md:text-[12vw] font-display leading-[0.8] uppercase tracking-tighter mb-12">
            VIMUKTHI <br /> KULASEKARA
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <p className="text-lg md:text-2xl text-muted max-w-xl leading-relaxed mb-8">
              High performing developer. Creative individual. I turn ideas into
              realities that people can see, use, and connect with. Based in
              SriLanka.
            </p>
            {/*
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest border border-ink/20 px-8 py-4 rounded-full hover:bg-ink hover:text-bg transition-all"
            >
              View Selected Work{" "}
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
            */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col gap-6 md:items-end"
          >
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  whileHover={{ y: -5, color: "var(--color-accent)" }}
                  className="w-12 h-12 rounded-full border border-ink/20 flex items-center justify-center cursor-pointer transition-colors"
                >
                  {social.icon({ size: 20 })}
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
                Scroll to explore
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-px h-12 bg-accent/40"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section
      id="services"
      className="py-32 px-6 md:px-12 border-t border-ink/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <h2 className="text-5xl md:text-7xl font-display uppercase leading-none">
            What I do <br /> best?
          </h2>
          <p className="text-muted max-w-sm font-mono text-sm uppercase tracking-wider">
            I work with founders, product teams, companies and brands based on
            strategy and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink/10 border border-ink/10">
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ backgroundColor: "rgba(242, 125, 38, 0.05)" }}
              className="bg-bg p-10 flex flex-col gap-8 group transition-all"
            >
              <span className="text-xs font-mono text-accent">
                {service.id}
              </span>
              <h3 className="text-3xl font-display uppercase group-hover:translate-x-2 transition-transform">
                {service.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SelectedWork = () => {
  return (
    <section
      id="work"
      className="py-32 px-6 md:px-12 bg-ink text-bg border-t border-bg/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 items-end mb-20">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-accent">
              Selected Work
            </span>
            <h2 className="text-5xl md:text-7xl font-display uppercase leading-none mt-6">
              Software I <br /> build
            </h2>
          </div>
          <p className="max-w-md text-sm font-mono uppercase tracking-wider text-bg/60">
            A focused look at the digital products and business systems I build
            for modern brands, founders, and growing teams.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-px bg-bg/10 border border-bg/10">
          {SELECTED_WORK_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{
                y: -4,
                backgroundColor: "rgba(242, 125, 38, 0.06)",
              }}
              className="bg-ink p-8 md:p-10 min-h-[280px] flex flex-col justify-between gap-12 group transition-all"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-4">
                  <span className="text-xs font-mono text-accent">
                    {item.id}
                  </span>
                  <span className="inline-flex w-fit rounded-full border border-bg/15 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-bg/55">
                    {item.tag}
                  </span>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-bg/35 transition-all group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </div>

              <div>
                <h3 className="text-3xl font-display uppercase leading-tight mb-4">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-bg/70">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section className="py-32 px-6 md:px-12 border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-display uppercase mb-20">
          Work <br /> Experience
        </h2>

        <div className="flex flex-col">
          {EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="grid md:grid-cols-[1fr_2fr_1fr] py-10 border-b border-ink/10 items-center group hover:bg-ink/5 transition-colors px-4"
            >
              <span className="text-xs font-mono text-muted uppercase tracking-widest mb-2 md:mb-0">
                {exp.period}
              </span>
              <h3 className="text-2xl md:text-4xl font-display uppercase">
                {exp.role}
              </h3>
              <p className="text-muted md:text-right font-mono text-sm uppercase tracking-wider">
                {exp.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ faq }: { faq: FAQ }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-ink/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-center text-left group"
      >
        <span className="text-xl md:text-3xl font-display uppercase group-hover:text-accent transition-colors">
          {faq.question}
        </span>
        <div
          className={cn(
            "w-10 h-10 rounded-full border border-ink/20 flex items-center justify-center transition-all",
            isOpen
              ? "bg-accent border-accent text-bg"
              : "group-hover:border-accent"
          )}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-muted max-w-2xl leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  return (
    <section className="py-32 px-6 md:px-12 border-t border-ink/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-20">
          <div>
            <h2 className="text-5xl font-display uppercase mb-6">
              Frequently <br /> Asked <br /> Questions
            </h2>
            <p className="text-muted font-mono text-sm uppercase tracking-wider">
              Everything you need to know about working with me.
            </p>
          </div>
          <div className="flex flex-col">
            {FAQS.map((faq) => (
              <div key={faq.id}>
                <FAQItem faq={faq} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="bg-bg text-ink pt-32 pb-12 overflow-hidden">
      <div className="marquee border-y border-ink/10 py-12 mb-32">
        <div className="marquee-content">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-6xl md:text-9xl font-display uppercase whitespace-nowrap">
                Let's work together
              </span>
              <span className="text-6xl md:text-9xl text-accent">✱</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-32">
          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted">
              Contact
            </h4>
            <a
              href="mailto:vforge72@gmail.com"
              className="text-2xl font-display uppercase hover:text-accent transition-colors"
            >
              vforge72@gmail.com{" "}
            </a>
            {/* <p className="text-muted text-sm">Skopje, Macedonia</p> */}
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted">
              Socials
            </h4>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm uppercase tracking-widest hover:text-accent transition-colors"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="#work"
                className="text-sm uppercase tracking-widest hover:text-accent transition-colors"
              >
                Work
              </a>
              <a
                href="#about"
                className="text-sm uppercase tracking-widest hover:text-accent transition-colors"
              >
                About
              </a>
              <a
                href="#services"
                className="text-sm uppercase tracking-widest hover:text-accent transition-colors"
              >
                Services
              </a>
              <a
                href="#contact"
                className="text-sm uppercase tracking-widest hover:text-accent transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* <div className="flex flex-col gap-8 items-start">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted">
              Newsletter
            </h4>
            <div className="w-full relative">
              <input
                type="email"
                placeholder="YOUR EMAIL"
                className="w-full bg-transparent border-b border-ink/20 py-4 text-sm focus:outline-none focus:border-accent transition-colors uppercase tracking-widest"
              />
              <button className="absolute right-0 bottom-4 text-accent hover:translate-x-1 transition-transform">
                <ArrowRight size={20} />
              </button>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-ink/10 text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
          <p>© 2026 Vimukthi Kulasekara. All rights reserved.</p>
          <p>Designed with passion</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-ink transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SelectedWork />
        <Experience />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
