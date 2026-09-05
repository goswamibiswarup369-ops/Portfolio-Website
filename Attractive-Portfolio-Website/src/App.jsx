import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profilePhoto from "./assets/Profile Picture.jpeg";

const projects = [
  {
    number: "01",
    name: "DailyPulse News",
    type: "React · News Web App",
    text: "A responsive news platform delivering categorized, up-to-date articles with a clean reading experience.",
    color: "blue",
    link: "https://github.com/goswamibiswarup369-ops/dailypulse-news-website",
  },
  {
    number: "02",
    name: "VidyaSetu AI",
    type: "React · TypeScript · Tailwind CSS",
    text: "An adaptive, multilingual education platform with a Socratic AI tutor, interactive STEM labs, and low-bandwidth support for inclusive learning.",
    color: "lime",
    link: "https://github.com/goswamibiswarup369-ops/vidyasetu-ai",
  },
  {
    number: "03",
    name: "Dashboard Final Version",
    type: "React · JavaScript · Data Visualization",
    text: "A YouTube channel and video analytics dashboard visualizing performance metrics, engagement trends, and content insights.",
    color: "coral",
    link: "https://github.com/goswamibiswarup369-ops/Dashboard-Final-Version",
  },
 {
    number: "04",
    name: "ShopSphere",
    type: "E-Commerce Frontend",
    text: "A capstone e-commerce frontend covering product browsing, cart flow, and checkout UI.",
    color: "coral",
    link: "https://github.com/goswamibiswarup369-ops/ecommerce-frontend-capstone",
  },
  {
    number: "05",
    name: "Google Homepage Clone",
    type: "HTML · CSS · JavaScript",
    text: "A pixel-close recreation of the Google homepage, focused on layout precision and detail.",
    color: "blue",
    link: "https://github.com/goswamibiswarup369-ops/google-homepage-clone",
  },
  {
    number: "06",
    name: "California Housing Price Prediction",
    type: "Python · Linear Regression",
    text: "A data analytics project using linear regression to model and predict California housing prices.",
    color: "lime",
    link: "https://github.com/goswamibiswarup369-ops/california-housing-linear-regression",
  },
  {
    number: "07",
    name: "Swad Ghar Restaurant",
    type: "Frontend · Restaurant Web App",
    text: "A restaurant website concept built around menu discovery, ambience, and easy customer engagement.",
    color: "blue",
    link: "https://github.com/goswamibiswarup369-ops/swad-ghar-restaurant-website-",
  },
  {
    number: "08",
    name: "Weather Forecast Dashboard",
    type: "JavaScript · API Integration",
    text: "A live weather dashboard that turns forecast data into a clear, glanceable interface.",
    color: "lime",
    link: "https://github.com/goswamibiswarup369-ops/weather-forecasting-dashboard",
  },
];

const internships = [
  ["Code Alpha", "Machine Learning", "2 months"], ["Cognifyz", "C / C++", "1.5 months"], ["Codec Technologies", "Artificial Intelligence", "2 months"], ["Codtech", "C / C++ programming", "1 month"], ["Eduskill", "Fortinet Cybersecurity", "1 month"], ["The Developer Arena", "Web development", "2 months"], ["Kodbud", "Web Development (HTML, CSS, JS)", "4 weeks"], ["Main Crafts Technology", "Artificial Intelligence & Machine Learning", "Internship"],
];

const certifications = [
  ["Fortinet Network Security Expert Level 3: Certified Associate", "Fortinet", "Oct 2025"],
  ["Fortinet Certified Fundamentals in Cybersecurity", "Fortinet", "Oct 2025"],
  ["HR Management Assessment", "LearnTube.ai", "Oct 2025"],
  ["Deloitte Data Analytics Job Simulation", "Forage", "Nov 2025"],
  ["TCS iON Career Edge \u2013 Young Professional", "Tata Group", "Dec 2025"],
  ["Google Android Developer Virtual Internship", "EduSkills Foundation\u00ae", "Mar 2026"],
  ["Walmart USA \u2013 Advanced Software Engineering Job Simulation", "Forage", "Dec 2025"],
  ["McKinsey Forward Certificate", "McKinsey & Company", "2026"],
];

const Arrow = () => <span aria-hidden="true" className="arrow">↗</span>;

function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(dotY, { stiffness: 300, damping: 28, mass: 0.5 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const move = (e) => { dotX.set(e.clientX); dotY.set(e.clientY); };
    const over = (e) => setHovering(!!e.target.closest("a, button, .project-card"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [reducedMotion, dotX, dotY]);

  if (reducedMotion) return null;
  return <>
    <motion.div className="cursor-dot" style={{ x: dotX, y: dotY, scale: hovering ? 0 : 1 }} />
    <motion.div className="cursor-ring" style={{ x: ringX, y: ringY, scale: hovering ? 1.7 : 1 }} />
  </>;
}

function ProjectCard({ project, index, reducedMotion }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const onMove = (e) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -10, ry: px * 10 });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <motion.article
      className={`project-card ${project.color} reveal`}
      whileHover={reducedMotion ? {} : { y: -7 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: tilt.rx, rotateY: tilt.ry, transformPerspective: 800 }}
    >
      <div className="project-meta"><span>{project.number}</span><span>{project.type}</span></div>
      <div className="project-art"><div className={`project-shape shape-${index % 3}`}></div><span>{project.name.slice(0, 1)}</span></div>
      <div className="project-copy">
        <h3>{project.name}</h3>
        <p>{project.text}</p>
        <a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.name} on GitHub`}>
          View on GitHub <Arrow />
        </a>
      </div>
    </motion.article>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const reducedMotion = useReducedMotion();
  const root = useRef(null);

  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);
  useEffect(() => {
    if (reducedMotion || !root.current) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(element, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } });
      });
      gsap.to(".orb-a", { y: -55, x: 28, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 } });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  const fadeUp = { hidden: { opacity: 0, y: reducedMotion ? 0 : 20 }, visible: { opacity: 1, y: 0 } };

  return <div ref={root} className="site-shell">
    <CustomCursor />
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="nav-wrap">
      <button className="wordmark" onClick={() => go("top")} aria-label="Back to top">BG<span>.</span></button>
      <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Main navigation">
        {[["About", "about"], ["Work", "work"], ["Experience", "experience"], ["Certifications", "certifications"], ["Contact", "contact"]].map(([label, id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
      </nav>
      <div className="nav-actions"><button className="theme-button" onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? "◐" : "◑"}</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle menu"><i></i><i></i></button></div>
    </header>

    <main id="main">
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true"></div><div className="orb orb-a" aria-hidden="true"></div><div className="orb orb-b" aria-hidden="true"></div>
        <motion.div className="eyebrow hero-eyebrow" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>Available for internships & opportunities <span className="status-dot"></span></motion.div>
        <div className="hero-copy"><motion.p className="intro" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6, delay: 0.08 }}>Hi, I’m Biswarup.</motion.p><motion.h1 initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.8, delay: 0.14 }}>Building<br/><em>useful</em> things<br/>for the web.</motion.h1><motion.div className="hero-bottom" initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.7, delay: 0.28 }}><p>Computer Science student exploring the space between <strong>full-stack development, Android, AI, and data analytics.</strong></p><button className="round-link" onClick={() => go("work")}>Explore work <Arrow /></button></motion.div></div>
        <div className="scroll-cue" aria-hidden="true"><span></span>Scroll to explore</div>
      </section>

      <section id="about" className="section about-section"><div className="section-kicker reveal"><span>01 / About me</span><span>Kalna,Dhatrigram, India</span></div><div className="about-layout"><div className="portrait reveal"><div className="portrait-frame"><img className="portrait-img" src={profilePhoto} alt="Portrait of Biswarup Goswami" /></div><div className="portrait-tag"><span>Biswarup Goswami</span><span>Kalna, West Bengal</span></div><div className="portrait-spark">+</div></div><div className="about-copy reveal"><p className="large-copy">I’m a B.Tech CSE student at <em>JIS College of Engineering</em>, motivated by thoughtful systems and real-world problem-solving.</p><p>My hands-on experience spans Python, C/C++, JavaScript, React, Node.js, Express.js, Kotlin, data structures, machine learning, and data analytics with Pandas, NumPy, Seaborn, and Matplotlib. I'm also a former Campus Ambassador at IIT Bhubaneswar. I like taking an idea from an unclear brief to a clear, usable experience.</p><a className="text-link" href="https://github.com/goswamibiswarup369-ops" target="_blank" rel="noreferrer">Visit GitHub <Arrow /></a></div></div></section>

      <section id="work" className="section work-section">
        <div className="section-kicker reveal"><span>02 / Selected direction</span><span>2026</span></div>
        <div className="section-heading reveal"><h2>Made to work<br/><em>beautifully.</em></h2><p>Not a gallery of claims—an evolving record of the problems I am learning to solve with code.</p></div>
        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} reducedMotion={reducedMotion} key={project.number} />
          ))}
        </div>
      </section>


      <section className="section capability-section"><div className="section-kicker reveal"><span>03 / Toolkit</span><span>Always learning</span></div><div className="capability-grid">{[["Frontend", "HTML · CSS · JavaScript · React · Responsive design"], ["Backend", "Node.js · Express.js · REST APIs · Server-side logic"], ["Mobile", "Kotlin · Android Studio · Material Design"], ["Data Analytics", "Python · Pandas · NumPy · Seaborn · Matplotlib"], ["UI/UX Design", "Interface design · Usability · Design systems"], ["Intelligence", "Python · Generative AI · ML foundations"], ["Core", "C · C++ · DSA · OOP · Git/GitHub"]].map(([title, desc], index) => <div className="capability reveal" key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{desc}</p></div>)}</div></section>

      <section id="experience" className="section experience-section"><div className="section-kicker reveal"><span>04 / Experience</span><span>8+ internships</span></div><h2 className="experience-title reveal">Learning by<br/><em>building.</em></h2><div className="experience-list">{internships.map(([company, domain, duration], index) => <div className="experience-row reveal" key={company}><span>{String(index + 1).padStart(2, "0")}</span><h3>{company}</h3><p>{domain}</p><time>{duration}</time></div>)}</div></section>

      <section id="certifications" className="section experience-section">
        <div className="section-kicker reveal"><span>05 / Certifications</span><span>{certifications.length}+ credentials</span></div>
        <h2 className="experience-title reveal">Verified by<br/><em>practice.</em></h2>
        <div className="experience-list">
          {certifications.map(([title, issuer, date], index) => (
            <div className="experience-row reveal" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{issuer}</p>
              <time>{date}</time>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section"><div className="contact-glow" aria-hidden="true"></div><div className="contact-inner reveal"><p className="eyebrow">06 / Let’s connect</p><h2>Have an idea?<br/><em>Let’s make it real.</em></h2><div className="contact-actions">
  <a className="contact-card lime" href="mailto:goswamibiswarup369@gmail.com">
    <span className="contact-card-label">Gmail :-</span>
    <span className="contact-card-value">goswamibiswarup369@gmail.com</span>
    <Arrow />
  </a>
  <a className="contact-card blue" href="tel:+918918413701">
    <span className="contact-card-label">Phone :-</span>
    <span className="contact-card-value">+91 89184 13701</span>
    <Arrow />
  </a>
  <a className="contact-card coral" href="https://www.linkedin.com/in/biswarup-goswami-27881b2b9" target="_blank" rel="noreferrer">
    <span className="contact-card-label">LinkedIn :-</span>
    <span className="contact-card-value">Connect with me</span>
    <Arrow />
  </a>
</div></div></section>
    </main>
    <footer><span>© {new Date().getFullYear()} Biswarup Goswami</span><span>Designed with intent · Built with care</span><a href="#top">Back to top ↑</a></footer>
  </div>;
}