import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Quote,
  Rocket,
  Send,
  Sparkles,
  Twitter,
  X,
} from "lucide-react";
import {
  SiDocker,
  SiFlask,
  SiGit,
  SiJavascript,
  SiLinux,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import ToastContainer from "@/components/portfolio/Toast";
import type { ToastType } from "@/components/portfolio/Toast";
import { CircuitLines, HexBadge, SoftBlueprint } from "@/components/portfolio/Decor";
import { ArtworkSlot, HeroIllustration, MiniArtworkSlot } from "@/components/portfolio/HeroIllustration";
import { sendContact } from "@/server";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const floatingTech = {
  left: [
    { name: "React", icon: SiReact, tone: "text-[#00A8D8]" },
    { name: "TypeScript", icon: SiTypescript, tone: "text-[#3178C6]" },
    { name: "Python", icon: SiPython, tone: "text-[#3776AB]" },
    { name: "Flask", icon: SiFlask, tone: "text-[#111111]" },
  ],
  right: [
    { name: "PostgreSQL", icon: SiPostgresql, tone: "text-[#336791]" },
    { name: "AI", icon: BrainCircuit, tone: "text-[#0A67C7]" },
    { name: "Docker", icon: SiDocker, tone: "text-[#2496ED]" },
    { name: "Linux", icon: SiLinux, tone: "text-[#111111]" },
  ],
};

const skills = [
  { label: "Frontend", value: 80, icon: Code2 },
  { label: "Backend", value: 65, icon: Database },
  // { label: "AI / ML", value: 60, icon: BrainCircuit },
  { label: "Database", value: 85, icon: Database },
  // { label: "DevOps", value: 75, icon: Rocket },
  { label: "Tools", value: 90, icon: Sparkles },
];

const techStack: Array<{ name: string; icon: IconType | typeof BrainCircuit; tone: string }> = [
  { name: "React", icon: SiReact, tone: "text-[#00A8D8]" },
  { name: "TypeScript", icon: SiTypescript, tone: "text-[#3178C6]" },
  { name: "JavaScript", icon: SiJavascript, tone: "text-[#D6A900]" },
  { name: "Python", icon: SiPython, tone: "text-[#3776AB]" },
  { name: "Flask", icon: SiFlask, tone: "text-[#111111]" },
  { name: "PostgreSQL", icon: SiPostgresql, tone: "text-[#336791]" },
  { name: "Tailwind CSS", icon: SiTailwindcss, tone: "text-[#06B6D4]" },
  { name: "Node.js", icon: SiNodedotjs, tone: "text-[#5FA04E]" },
  { name: "Express.js", icon: Code2, tone: "text-[#111111]" },
  { name: "Git", icon: SiGit, tone: "text-[#F05032]" },
  { name: "Docker", icon: SiDocker, tone: "text-[#2496ED]" },
  { name: "Linux", icon: SiLinux, tone: "text-[#111111]" },
];

const SOCIAL_LINKS = {
  github: "https://github.com/vikasraj319",
  linkedin: "https://www.linkedin.com/in/vikas-tovi-8a87522a5",
  resume: "/resume.pdf",
  email: "mailto:vikastovi@gmail.com"
};

const projects = [
  {
    title: "AI Travel Planner",
    desc: "AI powered travel planner that creates personalized itineraries.",
    tags: ["React", "Node.js", "OpenAI"],
    image: "/images/AI-Travel Planner.png",
    featured: true,
    liveUrl: "https://ai-travel-planner-gamma-sooty.vercel.app/",
    githubUrl: "https://github.com/vikasraj319/ai-travel-planner",
  },
  {
    title: "Habit Tracker",
    desc: "A premium habit tracker with analytics and streaks.",
    tags: ["Flask", "PostgreSQL", "Chart.js"],
    image: "/images/Habit-Tracker.png",
    featured: true,
    liveUrl: "https://habit-tracker-9l14.onrender.com",
    githubUrl: "https://github.com/vikasraj319/ai-travel-planner",
  },
  {
    title: "Personal Portfolio",
    desc: "My personal portfolio built with modern UI and animations.",
    tags: ["React", "Tailwind CSS", "Vite"],
    image: "/images/MyPortfolio.png",
    featured: false,
    liveUrl: "",
    githubUrl: "https://github.com/vikasraj319/MyPortfolio",
  },
  {
    title: "Phishing URL Detection System",
    desc: "ML based system to detect phishing websites in real-time.",
    tags: ["Python", "Machine Learning", "Flask"],
    image: "/images/Phishing-Detector.png",
    featured: false,
    liveUrl: "",
    githubUrl: "",
  },
];

function PortfolioPage() {
  return (
    <div className="portfolio-shell">
      <Navbar />
      <main className="site-main">
        <Hero />
        <About />
        <SkillsAndStack />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;

      if (window.scrollY <= 10) {
        return;
      }

      if (navbarRef.current?.contains(target)) {
        return;
      }

      setShowNavbar((prev) => !prev);
      setMenuOpen(false);
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);


  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY;

      setMenuOpen(false);

      if (currentScrollY <= 20) {
        setShowNavbar(true);
      } else if (scrollingDown && currentScrollY > 120) {
        setShowNavbar(false);
      } else if (!scrollingDown) {
        setShowNavbar(true);
      }

      setScrolled(currentScrollY > 40);

      // Active section
      document.querySelectorAll<HTMLElement>("section[id]").forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.clientHeight;
        const id = section.getAttribute("id");

        if (
          currentScrollY >= top &&
          currentScrollY < top + height
        ) {
          const match = navLinks.find(
            (item) => item.href === `#${id}`
          );

          if (match) {
            setActive(match.label);
          }
        }
      });

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (label: string) => {
    setActive(label);
    setMenuOpen(false);
    setShowNavbar(true);
  };

  return (
    <motion.header
      ref={navbarRef}
      initial={false}
      animate={{
        width: scrolled ? "min(94%, 1240px)" : "100%",
        y: showNavbar ? 0 : -120,
        top: scrolled ? 10 : 0,
        borderRadius: scrolled ? 999 : 0,
      }}
      transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.8 }}
      className={`site-header ${scrolled ? "navbar-scrolled" : "navbar-top"
        }`}
    >
      <motion.div
        animate={{
          minHeight: scrolled ? 64 : 80,
          paddingInline: scrolled ? 32 : 20,
        }}
        transition={{ type: "spring", stiffness: 160, damping: 24 }}
        className="nav-container"
      >
        <motion.div animate={{ scale: scrolled ? 0.92 : 1 }} transition={{ duration: 0.4 }}>
          <a href="#home" className="brand-link" onClick={() => handleNavClick("Home")}>
            <HexBadge className="brand-mark" />
            <span className="brand-divider" />
            <span className="brand-name">Vikas Raj</span>
          </a>
        </motion.div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => handleNavClick(link.label)}
              className={`nav-link ${active === link.label ? "is-active" : ""}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="/Vikas-Resume.pdf" download className="resume-button">
            <span>Download Resume</span>
            <Download className="icon-sm" />
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.stopPropagation();
              setShowNavbar(true);
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? <X className="icon-md" /> : <Menu className="icon-md" />}
          </button>
        </div>
      </motion.div>

      <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => handleNavClick(link.label)}
            className={`mobile-nav-link ${active === link.label ? "is-active" : ""}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}

function Hero() {
  const allTech = [...floatingTech.left, ...floatingTech.right];

  return (
    <section id="home" className="section section-bordered hero-section">
      <SoftBlueprint className="decor decor-blueprint" />
      <CircuitLines className="decor decor-circuit decor-circuit--top" />
      <CircuitLines className="decor decor-circuit decor-circuit--bottom rotate-180" />
      <MiniArtworkSlot className="decor decor-mini-art" label="Future art" />

      <div className="container hero-grid">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="hero-copy">
          <p className="hero-kicker">Hi, I'm</p>
          <h1 className="hero-title">
            Vikas <span className="text-gold">Raj</span>
          </h1>
          {/* <div className="hero-role">Full Stack Developer | Cybersecurity Enthusiast</div> */}
          <div className="hero-role">
            <span>Full Stack Developer</span>&emsp;
            <span >|&nbsp;&nbsp;Cybersecurity Enthusiast</span>
          </div>
          <p className="hero-description">
            I build scalable web applications and AI powered solutions that solve real world problems.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="button button--primary">
              <span>View Projects</span>
              <ArrowRight className="icon-sm" />
            </a>
            <a href="#contact" className="button button--secondary">
              <span>Get In Touch</span>
              <MessageCircle className="icon-sm text-gold" />
            </a>
            {/* <IconButton href="#" label="GitHub">
              <Github className="icon-md" />
            </IconButton> */}
          </div>

          <div className="connect-row">
            <span>Let's connect</span>
            <div className="social-links">
              <IconButton href={SOCIAL_LINKS.github} label="GitHub profile" small>
                <Github className="icon-sm" />
              </IconButton>
              <IconButton href={SOCIAL_LINKS.linkedin} label="LinkedIn profile" small>
                <Linkedin className="icon-sm" />
              </IconButton>
              {/* <IconButton href="#" label="Twitter profile" small>
                <Twitter className="icon-sm" />
              </IconButton> */}
              <a
                href={SOCIAL_LINKS.email}
                aria-label="Email"
                className="icon-button icon-button--small"
              >
                <Mail className="icon-sm" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hero-visual"
        >
          <HeroIllustration />

          <div className="desktop-tech-grid">
            {/* Left Column */}
            <div className="tech-column tech-column-left">
              {floatingTech.left.map((tech, index) => (
                <FloatingTechCard
                  key={tech.name}
                  {...tech}
                  delay={index * 0.08}
                />
              ))}
            </div>

            {/* Right Column */}
            <div className="tech-column tech-column-right">
              {floatingTech.right.map((tech, index) => (
                <FloatingTechCard
                  key={tech.name}
                  {...tech}
                  delay={index * 0.08 + 0.25}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingTechCard({
  name,
  icon: Icon,
  tone,
  delay = 0,
}: {
  name: string;
  icon: IconType | typeof BrainCircuit;
  tone: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4 }}
      className="floating-tech-card"
    >
      <Icon className={`floating-tech-icon ${tone}`} />
      <span>{name}</span>
    </motion.div>
  );
}

function About() {
  return (
    <section id="about" className="section section-bordered about-section">
      <CircuitLines className="decor decor-about-circuit" />
      <div className="container about-grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="avatar-orbit"
          aria-hidden
        >
          <div className="avatar-orbit__outer" />
          <div className="avatar-orbit__inner" />
          <div className="avatar-orbit__portrait">
            <div className="bot-avatar">
              <div className="bot-avatar__head" />
              <div className="bot-avatar__body" />
              <div className="bot-avatar__eye bot-avatar__eye--left" />
              <div className="bot-avatar__eye bot-avatar__eye--right" />
              <div className="bot-avatar__mouth" />
              <Bot className="bot-avatar__icon" />
            </div>
          </div>
        </motion.div>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="about-copy">
          <SectionHeader icon={<HexBadge className="icon-xs" />} title="About Me" />
          <h2 className="section-title">
            Building <span className="text-gold">The Future</span>
            <br />
            With Code
          </h2>
          <p className="section-copy">
            I'm a Computer Science Engineering graduate passionate about building intelligent, secure, and scalable software.
            My interests span AI, full-stack development, backend engineering, and cybersecurity, with a focus on creating
            modern applications that solve real-world problems through clean code and innovative technology.
          </p>
          <div className="metrics-grid">
            <Metric value="5+" label="Projects" />
            {/* <Metric value="500+" label="GitHub Commits" /> */}
            <Metric value="10+" label="Tech Stack" />
            <Metric value="3+" label="Years Learning" />
          </div>
        </motion.div>

        <ArtworkSlot className="about-artwork" label="Future art" />
      </div>
    </section>
  );
}

function SkillsAndStack() {
  return (
    <section id="skills" className="skills-section">
      <img src="/images/Bumblebee-poster.png" alt="" className="decor-image decor-image--poster" />
      <img src="/images/chevorlet.png" alt="" className="decor-image decor-image--chevrolet" />

      <div className="skills-grid">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="panel"
        >
          <SectionHeader icon={<Sparkles className="icon-xs" />} title="My Skills" />
          <div className="skill-rings-grid">
            {skills.map((skill) => (
              <SkillRing key={skill.label} {...skill} />
            ))}
          </div>
        </motion.div>

        <motion.div
          id="tech-stack"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="panel panel-decorated"
        >
          <CircuitLines className="decor decor-panel-circuit" />
          <SectionHeader icon={<Code2 className="icon-xs" />} title="Tech Stack" />
          <div className="tech-grid">
            {techStack.map((tech) => (
              <TechCard key={tech.name} {...tech} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container projects-container">
        <div className="section-heading-row">
          <SectionHeader icon={<BriefcaseBusiness className="icon-xs" />} title="Featured Projects" />
          <a href="#projects" className="text-link">
            <span>View all Projects</span>
            <ArrowRight className="icon-sm text-gold" />
          </a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="projects-grid"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </motion.div>

        {/* <MiniArtworkSlot className="decor decor-project-art" label="Future art" /> */}
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    title?: string;
    type: ToastType;
    duration?: number;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const showToast = (
    type: ToastType,
    title: string,
    message: string,
    duration = 4000,
  ) => {
    setToast({
      type,
      title,
      message,
      duration,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    /*
     * ==========================
     * VALIDATION
     * ==========================
     */

    if (!formData.name.trim()) {
      showToast(
        "warning",
        "Name is required",
        "Please enter your name before sending the message.",
      );
      return;
    }

    if (!formData.email.trim()) {
      showToast(
        "warning",
        "Email is required",
        "Please enter your email address.",
      );
      return;
    }

    /*
     * Basic email validation
     */
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      showToast(
        "warning",
        "Invalid email address",
        "Please enter a valid email address.",
      );
      return;
    }

    if (!formData.message.trim()) {
      showToast(
        "warning",
        "Message is required",
        "Please enter a message before submitting the form.",
      );
      return;
    }

    /*
     * ==========================
     * SEND MESSAGE
     * ==========================
     */

    setLoading(true);

    try {
      await sendContact({
        data: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      });

      /*
       * Success toast
       */
      showToast(
        "success",
        "Message sent successfully!",
        "I'll get back to you as soon as possible.",
        4000,
      );

      /*
       * Reset form
       */
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(
        "Contact form error:",
        err,
      );

      /*
       * Error toast
       */
      showToast(
        "error",
        "Unable to send message",
        "Something went wrong. Please try again later.",
        5000,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="section contact-section"
      >
        <div className="container contact-grid">

          {/* =========================
              CONTACT INFORMATION
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="contact-card"
          >
            <div className="contact-info">

              <SectionHeader
                icon={
                  <Mail className="icon-xs" />
                }
                title="Let's Work Together"
              />

              <h2 className="contact-title">
                Have a project in mind?
              </h2>

              <p className="contact-copy">
                Let's build something amazing
                together.
              </p>

              <div className="contact-methods">

                <ContactRow
                  icon={
                    <Mail className="icon-xs" />
                  }
                  text={
                    import.meta.env
                      .VITE_DISPLAY_EMAIL
                  }
                />

                <ContactRow
                  icon={
                    <Phone className="icon-xs" />
                  }
                  text={
                    import.meta.env.VITE_PHONE
                  }
                />

                <ContactRow
                  icon={
                    <MapPin className="icon-xs" />
                  }
                  text={
                    import.meta.env.VITE_LOCATION
                  }
                />

              </div>

              <MiniArtworkSlot
                className="contact-mini-art"
                label="Future artwork"
              />

            </div>

            {/* =========================
                CONTACT FORM
            ========================== */}

            <div className="contact-form-panel">

              <SectionHeader
                icon={
                  <Send className="icon-xs" />
                }
                title="Send a Message"
              />

              <form
                onSubmit={handleSubmit}
                className="contact-form"
                noValidate
              >

                <div className="form-grid">

                  {/* NAME */}

                  <input
                    className="portfolio-input"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    autoComplete="name"
                    disabled={loading}
                  />

                  {/* EMAIL */}

                  <input
                    className="portfolio-input"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    autoComplete="email"
                    disabled={loading}
                  />

                </div>

                {/* MESSAGE */}

                <textarea
                  className="portfolio-input portfolio-textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  aria-label="Your Message"
                  disabled={loading}
                />

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="button button--primary form-submit"
                  disabled={loading}
                >
                  <span>
                    {loading
                      ? "Sending..."
                      : "Send Message"}
                  </span>

                  <Send className="icon-sm" />
                </button>

              </form>
            </div>
          </motion.div>

          {/* =========================
              QUOTE CARD
          ========================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
            }}
            className="quote-card"
          >

            <img
              src="/images/autobot-logo.png"
              alt=""
              className="quote-card__logo"
            />

            <Quote className="quote-card__icon" />

            <p className="quote-card__text">
              "Strength comes from working together."</p>

            <div className="quote-card__rule" />

            <p className="quote-card__author">
              - Bumblebee
            </p>

            <img
              src="/images/Bumblebee-qote.png"
              alt="Bumblebee"
              className="quote-card__image"
            />

          </motion.div>

        </div>
      </section>

      <ToastContainer
        toast={toast}
        onClose={() => setToast(null)}
      />
    </>
  );
}


function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <HexBadge className="footer-mark" />
          <p>(c) 2025 Vikas Raj. All rights reserved.</p>
        </div>
        <p>Still learning. Still building. Still looking beyond.</p>
      </div>
    </footer>
  );
}

function IconButton({
  href,
  label,
  small,
  children,
}: {
  href: string;
  label: string;
  small?: boolean;
  children: ReactNode;
}) {
  return (
    <a href={href} aria-label={label} className={`icon-button ${small ? "icon-button--small" : ""}`}>
      {children}
    </a>
  );
}

function SectionHeader({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="section-header">
      <span className="section-header__icon">{icon}</span>
      <span>{title}</span>
    </div>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric">
      <p>{value}</p>
      <span>{label}</span>
    </div>
  );
}

function SkillRing({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: typeof Code2;
}) {
  const size = 78;
  const stroke = 7;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="skill-ring">
      <div className="skill-ring__chart">
        <svg width={size} height={size} className="skill-ring__svg">
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#F1E8C7" strokeWidth={stroke} fill="none" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--gold)"
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="skill-ring__center">
          <Icon className="icon-sm text-gold" />
          <span>{value}%</span>
        </div>
      </div>
      <p>{label}</p>
      <span>{value}%</span>
    </div>
  );
}

function TechCard({
  name,
  icon: Icon,
  tone,
}: {
  name: string;
  icon: IconType | typeof Code2;
  tone: string;
}) {
  return (
    <motion.div whileHover={{ y: -5 }} className="tech-card">
      <Icon className={`tech-card__icon ${tone}`} />
      <span>{name}</span>
    </motion.div>
  );
}

function ProjectCard({
  title,
  desc,
  tags,
  image,
  featured,
  githubUrl,
  liveUrl,
}: {
  title: string;
  desc: string;
  tags: string[];
  image: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
}) {
  return (
    <motion.article variants={fadeUp} whileHover={{ y: -7 }} className="project-card">
      <div className="project-card__media">
        <img src={image} alt={`${title} project preview`} className="project-card__image" />
        {featured && <div className="project-card__badge">Featured</div>}
        <div className="project-card__overlay" />
      </div>
      <div className="project-card__body">
        <h3>{title}</h3>
        <p>{desc}</p>
        <div className="project-card__tags">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-card__links">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} source code`}
          >
            <Github className="icon-sm" />
          </a>

          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} live preview`}
          >
            <ExternalLink className="icon-sm" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function ContactRow({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="contact-row">
      <div className="contact-row__icon">
        {icon}
      </div>

      <span className="contact-row__text">
        {text}
      </span>
    </div>
  );
}
