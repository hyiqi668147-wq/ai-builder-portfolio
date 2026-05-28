import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDown, ArrowUpRight, Github, Mail, Menu, Sparkle, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  ["01", "ProofMe", "#proofme"],
  ["02", "AI Workflow", "#workflow"],
  ["03", "Build Process", "#process"],
  ["04", "Proof of Work", "#proof"],
  ["05", "Contact", "#contact"],
];

const asset = (path) => `${import.meta.env.BASE_URL}${path}`;

const processSteps = [
  ["01", "岗位拆解", "把目标岗位拆成能力词、任务场景、作品证据要求，避免只写泛泛经历。"],
  ["02", "产品定义", "将 ProofMe 定义为求职能力证明生成器，而不是普通简历工具。"],
  ["03", "Prompt 流程设计", "设计输入约束、能力标签、结构化证明、面试表达等多段提示链。"],
  ["04", "AI 生成", "用 AI 完成初稿生成、表达变体和内容重组，再进入人工判断。"],
  ["05", "人工校验", "检查事实、语气、岗位匹配度和证据可信度，保留人的判断。"],
  ["06", "前端实现", "用 React / Vite / Tailwind 把概念做成可交互、可展示的页面。"],
  ["07", "GitHub Pages 部署", "完成可访问链接、构建验证和作品展示闭环。"],
];

const workflowTools = [
  ["ChatGPT", "需求拆解与表达优化"],
  ["Claude", "前端重构与代码协作"],
  ["DeepSeek", "中文逻辑与产品表达"],
  ["Codex", "代码生成与局部实现"],
  ["Trae", "Vibe Coding 快速搭建"],
  ["GitHub", "版本管理与部署"],
  ["React / Vite / Tailwind", "前端实现"],
  ["GSAP / Framer Motion", "动效增强"],
];

const proofCards = [
  ["Online Demo", "可打开、可浏览、可解释的前端作品，而不是停在想法文档。"],
  ["GitHub 仓库", "保留构建记录、代码结构和版本路径，方便面试时复盘。"],
  ["页面构建记录", "从内容策展、结构设计到交互落地都有明确过程。"],
  ["产品表达", "把岗位需求翻译成用户问题、输入输出和功能边界。"],
  ["Prompt 流程", "围绕岗位拆解、经历转译和证明生成设计工作流。"],
  ["页面实现", "负责信息架构、前端实现、视觉呈现和响应式适配。"],
  ["测试与部署", "完成本地 build、交互检查和部署路径验证。"],
];

const caseStats = [
  ["Role", "Product sense / Prompt design / Frontend"],
  ["Stack", "React · Vite · Tailwind · GSAP"],
  ["Status", "Deployed on GitHub Pages"],
  ["Output", "Demo · Repository · Build record"],
];

const evidenceModules = [
  { year: "Problem", type: "定位", name: "求职表达常常缺少可验证证据，AI 输出又容易变成空泛包装。", tone: "dark" },
  { year: "Insight", type: "洞察", name: "真正有价值的是把真实经历转成岗位可读、可追问、可展示的能力证明。", tone: "light" },
  { year: "Concept", type: "产品概念", name: "ProofMe 输入岗位目标和真实经历，输出证明、简历、面试、投递表达。", tone: "visual" },
  { year: "Workflow", type: "流程", name: "岗位拆解 / 能力标签 / 结构化证明 / 人工校验 / 前端展示。", tone: "light" },
  { year: "Prompt", type: "设计", name: "把 AI 提示词拆成明确角色、输入字段、输出格式、校验规则。", tone: "dark" },
  { year: "Frontend", type: "实现", name: "用 React + Vite + Tailwind 把工作流做成能被 HR 直接理解的界面。", tone: "visual" },
  { year: "Deploy", type: "交付", name: "用 GitHub Pages 部署，让作品从本地 demo 变成可访问结果。", tone: "light" },
  { year: "Role Fit", type: "匹配", name: "AI Builder / AI 产品运营 / AI 应用落地岗位需要的正是这条链路。", tone: "dark" },
];

function splitChars(text) {
  return text.split("").map((char, index) => (
    <span className="char" style={{ "--char-index": index }} key={`${char}-${index}`}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

function Header({ menuOpen, setMenuOpen }) {
  return (
    <header className="site-header">
      <nav className="container-edge nav">
        <a className="identity-mark" href="#top" aria-label="Back to top">
          <span className="asterisk" aria-hidden="true">
            ✳
          </span>
          <span>
            Open for AI Builder
            <br />
            and product operation roles
          </span>
        </a>
        <a className="logo-word menu-hover" href="#top" aria-label="黄一奇 Portfolio">
          黄一奇<sup>AI</sup>
        </a>
        <div className="folio-label hide-mobile">
          <span>Portfolio</span>
          <span>Vol.1 —</span>
        </div>
        <button
          className="burger show-mobile"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}

function BottomMenu() {
  return (
    <nav className="bottom-menu hide-mobile" aria-label="Portfolio sections">
      <ul className="container-edge">
        {navItems.map(([num, label, href]) => (
          <li key={label}>
            <a href={href} className="menu-link menu-hover">
              <span className="menu-number">{num}</span>
              <span className="menu-copy">
                <span className="menu-original">{splitChars(label)}</span>
                <span className="menu-clone">{splitChars(label)}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileMenu({ open, setOpen }) {
  return (
    <aside className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="container-edge mobile-menu-inner">
        <div className="mobile-links">
          {navItems.map(([num, label, href]) => (
            <a href={href} key={label} onClick={() => setOpen(false)}>
              <span>{num}</span>
              <strong>
                <em>{label.slice(0, 1)}</em>
                {label.slice(1)}
              </strong>
            </a>
          ))}
        </div>
        <div className="mobile-credit">
          <p>Credit</p>
          <p>
            Strategy / Prompt / Frontend
            <br />
            黄一奇
          </p>
          <p>
            Tools
            <br />
            AI Workflow + React
          </p>
        </div>
      </div>
    </aside>
  );
}

function TransitionLayer() {
  return (
    <div className="transition-layer" aria-hidden="true">
      <span className="transition-word">
        <em>P</em>roofMe
      </span>
    </div>
  );
}

function SignalStrip() {
  const words = ["ProofMe", "AI Workflow", "Build Process", "Proof of Work", "Portfolio Vol.1"];

  return (
    <div className="signal-strip" aria-hidden="true">
      <div className="signal-track">
        {[...words, ...words, ...words].map((word, index) => (
          <span key={`${word}-${index}`}>
            {word}
            <i>✳</i>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-block" id="top">
      <div className="hero-kicker reveal">
        <span>黄一奇</span>
        <span>AI Builder</span>
        <span>Portfolio</span>
      </div>
      <h1 className="hero-title">
        <span className="serif-italic reveal">我用 AI</span>
        <span className="reveal">把想法变成</span>
        <span className="reveal">可运行的产品作品</span>
      </h1>
      <p className="hero-sub reveal">
        ProofMe 是我的第一个完整案例：从岗位拆解、Prompt 流程、AI 生成、人工校验，到前端实现和 GitHub Pages 部署。
      </p>
      <div className="hero-actions reveal">
        <a href="#proofme">查看 ProofMe</a>
        <a href="#process">查看构建过程</a>
        <a href="#contact">联系我</a>
      </div>
      <div className="hero-visual reveal">
        <img src={asset("assets/hero-abstract-ai-visual.png")} alt="" />
      </div>
      <SignalStrip />
      <a className="scroll-cue reveal" href="#proofme">
        Scroll for more <ArrowDown size={18} />
      </a>
    </section>
  );
}

function WorksPrelude() {
  return (
    <section className="works-prelude section-block" aria-label="Works intro">
      <div className="works-word reveal">
        <em>W</em>orks
      </div>
      <div className="works-index reveal">
        <span>01</span>
        <strong>ProofMe</strong>
        <p>AI 求职能力证明生成器 / 从想法到可部署作品</p>
        <a href="#proofme">
          Enter case <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

function FeaturedWork() {
  return (
    <section className="featured section-block" id="proofme">
      <div className="section-heading reveal">
        <p>Featured Work</p>
        <h2>
          <em>ProofMe</em>
          <span>AI 求职能力证明生成器</span>
        </h2>
      </div>
      <div className="featured-grid">
        <div className="mockup-card tilt-card reveal">
          <div className="image-mask" />
          <img src={asset("assets/proofme-product-mockup.png")} alt="ProofMe product interface mockup" />
          <div className="mockup-hover">
            <span>Hover Brief</span>
            <strong>我负责把 AI 工作流翻译成产品页面、证据结构和可访问部署。</strong>
          </div>
        </div>
        <div className="work-copy reveal">
          <p>
            输入岗位目标和真实经历，输出能力证明、简历表达、面试回答和投递话术。重点不是“让 AI 写简历”，而是把 AI
            工作流变成可验证的求职证明系统。
          </p>
          <div className="three-zone">
            {[
              ["Input", "岗位目标 / 真实经历"],
              ["Workflow", "岗位拆解 / 能力标签 / 结构化证明 / 人工校验"],
              ["Output", "能力证明 / 简历表达 / 面试回答 / 投递话术"],
            ].map(([title, text]) => (
              <article className="zone-card" key={title}>
                <span>{title}</span>
                <strong>{text}</strong>
              </article>
            ))}
          </div>
          <div className="case-stats">
            {caseStats.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section-block" id="process">
      <div className="section-heading compact reveal">
        <p>Build Process</p>
        <h2>
          <em>从想法</em>
          <span>推进到可展示结果</span>
        </h2>
      </div>
      <div className="process-list">
        {processSteps.map(([num, title, text]) => (
          <article className="process-row reveal" key={num} data-title={title}>
            <span>{num}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Workflow() {
  return (
    <section className="workflow section-block" id="workflow">
      <div className="workflow-ornament reveal">
        <img src={asset("assets/section-dataflow-ornament.png")} alt="" />
      </div>
      <div className="section-heading reveal">
        <p>AI Workflow</p>
        <h2>
          <em>工具链</em>
          <span>不是堆工具，而是分工协作</span>
        </h2>
      </div>
      <div className="tool-grid">
        {workflowTools.map(([tool, role], index) => (
          <article className="tool-card reveal" key={tool} style={{ "--i": index }}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{tool}</h3>
            <p>{role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function EvidenceWall() {
  return (
    <section className="evidence section-block" id="proof">
      <div className="section-heading reveal">
        <p>Proof of Work</p>
        <h2>
          <em>证据墙</em>
          <span>把单项目拆成多维能力证明</span>
        </h2>
      </div>
      <div className="masonry-wall">
        {evidenceModules.map((item, index) => (
          <article className={`evidence-card reveal ${item.tone}`} key={item.year}>
            <div className="image-mask" />
            <div className="evidence-visual">
              <Sparkle size={22} />
              <span>{item.type}</span>
            </div>
            <div className="evidence-info">
              <span>({String(index + 1).padStart(2, "0")} / {item.year})</span>
              <p>{item.name}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="proof-grid">
        {proofCards.map(([title, text]) => (
          <article className="proof-card reveal" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className="progress-track">
              <span className="progress-bar" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact section-block" id="contact">
      <div className="contact-panel reveal">
        <p className="contact-kicker">Contact</p>
        <h2>
          我正在寻找 <em>AI Builder</em> / AI 产品运营 / AI 应用落地机会
        </h2>
        <p>
          我希望进入一个真正用 AI 改造工作流的团队，从产品、内容、运营、用户场景和原型交付切入，把想法做成可以验证的结果。
        </p>
        <div className="contact-actions">
          <a href="mailto:hello@example.com">
            <Mail size={18} /> 联系我
          </a>
          <a href="https://github.com/hyiqi668147-wq/ai-builder-portfolio" target="_blank" rel="noreferrer">
            <Github size={18} /> GitHub
          </a>
          <a href="#top">
            Back to top <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const appRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".transition-layer",
        { height: "18vh", yPercent: 0 },
        { height: 0, duration: 1.1, ease: "power3.inOut", delay: 0.15 }
      );
      gsap.from(".transition-word", {
        yPercent: 120,
        rotateX: -75,
        duration: 0.9,
        ease: "power4.out",
      });
      gsap.from(".hero .reveal", {
        y: 38,
        opacity: 0,
        duration: 0.9,
        stagger: 0.09,
        ease: "power3.out",
        delay: 0.45,
      });

      gsap.utils.toArray(".section-block .reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 52, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".image-mask").forEach((mask) => {
        gsap.fromTo(
          mask,
          { height: "100%" },
          {
            height: "0%",
            duration: 1.1,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: mask.parentElement,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".progress-bar").forEach((bar, index) => {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${68 + (index % 4) * 7}%`,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 90%",
            },
          }
        );
      });

      gsap.to(".hero-visual img, .workflow-ornament img", {
        y: -14,
        duration: 3.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.utils.toArray(".works-word, .works-index").forEach((el, index) => {
        gsap.fromTo(
          el,
          { yPercent: 18, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".works-prelude",
              start: "top 76%",
            },
          }
        );
      });
    }, appRef);

    const tiltCards = Array.from(appRef.current.querySelectorAll(".tilt-card"));
    const tiltCleanups = tiltCards.map((card) => {
      const onMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--ry", `${x * 5}deg`);
        card.style.setProperty("--rx", `${y * -5}deg`);
      };
      const onLeave = () => {
        card.style.setProperty("--ry", "0deg");
        card.style.setProperty("--rx", "0deg");
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      tiltCleanups.forEach((cleanup) => cleanup());
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app" ref={appRef}>
      <TransitionLayer />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
      <BottomMenu />
      <main>
        <Hero />
        <WorksPrelude />
        <FeaturedWork />
        <Process />
        <Workflow />
        <EvidenceWall />
        <Contact />
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
