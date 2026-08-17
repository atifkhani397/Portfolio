/**
 * Software Engineer Portfolio - Script Logic (2026 Upgraded AI Agent Edition)
 * Positioning: Production AI Agent Architect & Autonomous Web Agent Engineer.
 */

// --------------------------------------------------------------------------
// 1. Projects Case Studies Data Configuration
// --------------------------------------------------------------------------
const PROJECTS_DATA = {
  1: {
    id: 1,
    title: "AuraAgent Web Explorer",
    category: "AI Agents & Web Agents",
    image: "assets/project1.png",
    description: "AuraAgent is a production-grade autonomous web-browsing agent powered by Python, Playwright, Browser-Use, and Google Gemini API.",
    problem: "Enterprise teams waste hundreds of hours manually executing multi-step browser workflows, form inputs, and dynamic DOM data extraction.",
    architecture: "Python async event loop managing Playwright headless Chromium controllers, governed by a LangGraph state machine with automatic DOM retries.",
    impact: "Automated 120+ web workflows autonomously with 99.2% extraction accuracy and zero human intervention.",
    tags: ["Python", "Playwright", "LangGraph", "Browser-Use", "Gemini API"],
    demoUrl: "https://example.com/aura-agent-demo",
    githubUrl: "https://github.com/example/aura-agent-web"
  },
  2: {
    id: 2,
    title: "OmniCommerce Agent Hub",
    category: "Full-Stack Web",
    image: "assets/project2.png",
    description: "OmniCommerce is a scalable multi-tenant e-commerce web platform featuring real-time revenue telemetry and agentic automated customer workflows.",
    problem: "E-commerce merchants required automated background processing for customer support triage and refund approvals.",
    architecture: "Next.js App Router frontend paired with Node.js microservices, Stripe Webhooks, and MySQL read-replicas on AWS.",
    impact: "Maintained sub-100ms API response times while processing over $1.2M in monthly merchant transaction volume.",
    tags: ["Next.js", "Node.js", "MySQL", "Tailwind", "Stripe API"],
    demoUrl: "https://example.com/omnicommerce-demo",
    githubUrl: "https://github.com/example/omnicommerce-saas"
  },
  3: {
    id: 3,
    title: "OmniAgent Swarm Engine",
    category: "AI Agents & Web Agents",
    image: "assets/project3.png",
    description: "OmniAgent Swarm is a multi-agent orchestration framework built with CrewAI, FastAPI, and Model Context Protocols (MCP) for enterprise tool execution.",
    problem: "Single-prompt LLMs failed on complex multi-stage tasks requiring specialist consensus and external tool authorization.",
    architecture: "Code-driven Python multi-agent pipeline with deterministic Pydantic schema validation and human-in-the-loop approval gates.",
    impact: "Reduced multi-step task execution errors by 65% compared to monolithic LLM calls.",
    tags: ["Python", "CrewAI", "FastAPI", "MCP Protocol", "Docker"],
    demoUrl: "https://example.com/omniagent-demo",
    githubUrl: "https://github.com/example/omniagent-swarm"
  },
  4: {
    id: 4,
    title: "PulseTaskManager Pro",
    category: "Desktop & Tools",
    image: "assets/project4.png",
    description: "PulseTaskManager is a high-performance cross-platform desktop application designed for engineering teams to monitor system CPU metrics and background agents.",
    problem: "Engineering teams lacked a lightweight desktop resource scheduler with offline SQL audit capabilities.",
    architecture: "JavaFX desktop application leveraging Hibernate ORM, MySQL local synchronization, and custom CSS glassmorphism UI.",
    impact: "Cut background job scheduling overhead by 30% for desktop development environments.",
    tags: ["Java", "JavaFX", "MySQL", "Hibernate", "CSS3"],
    demoUrl: "",
    githubUrl: "https://github.com/example/pulsetask-manager"
  }
};

// --------------------------------------------------------------------------
// 2. Helper Utilities & Toast Notifications
// --------------------------------------------------------------------------
function showToast(message, icon = 'fa-solid fa-check-circle') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
  
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function copyToClipboard(text, label = 'Item') {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`${label} copied to clipboard!`, 'fa-solid fa-copy');
  }).catch(() => {
    showToast(`Failed to copy ${label}`, 'fa-solid fa-triangle-exclamation');
  });
}

// --------------------------------------------------------------------------
// 3. Typing Effect for Hero Roles
// --------------------------------------------------------------------------
class TypingEffect {
  constructor(element, words, waitTime = 2000) {
    this.element = element;
    this.words = words;
    this.waitTime = waitTime;
    this.wordIndex = 0;
    this.txt = '';
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = this.txt;

    let typeSpeed = 100;
    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.waitTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 400;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// --------------------------------------------------------------------------
// 4. Main Event Listeners & UI Components
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Typing Effect with Production Agent Titles
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    new TypingEffect(typingEl, [
      'AI Agent Architect',
      'Autonomous Web Agent Engineer',
      'LLM Orchestrator',
      'Full-Stack Web AI Systems Dev',
      'Multi-Agent System Engineer'
    ]);
  }

  // Sticky Navbar Scroll Detection
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Hamburger Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // ScrollSpy Active Link Updates
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  });

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
        progressBars.forEach(bar => {
          const targetWidth = bar.getAttribute('data-progress');
          bar.style.width = targetWidth;
        });
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));
  document.querySelectorAll('.skill-category-card').forEach(card => revealObserver.observe(card));

  // About Section Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(`tab-${tabId}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });

  // Projects Filter Controls
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // Project Modal Handling
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalProblem = document.getElementById('modal-problem');
  const modalArchitecture = document.getElementById('modal-architecture');
  const modalImpact = document.getElementById('modal-impact');
  const modalTags = document.getElementById('modal-tags');
  const modalDemoLink = document.getElementById('modal-demo-link');
  const modalGithubLink = document.getElementById('modal-github-link');

  function openModal(projectId) {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDesc.textContent = data.description;
    
    modalProblem.textContent = data.problem || "High system latency under burst load.";
    modalArchitecture.textContent = data.architecture || "Modular microservices architecture.";
    modalImpact.textContent = data.impact || "Improved throughput by 40%.";

    modalTags.innerHTML = data.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

    if (data.demoUrl) {
      modalDemoLink.href = data.demoUrl;
      modalDemoLink.style.display = 'inline-flex';
    } else {
      modalDemoLink.style.display = 'none';
    }

    if (data.githubUrl) {
      modalGithubLink.href = data.githubUrl;
      modalGithubLink.style.display = 'inline-flex';
    } else {
      modalGithubLink.style.display = 'none';
    }

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectId = card.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  // --------------------------------------------------------------------------
  // 5. Command Palette (Cmd + K) Implementation
  // --------------------------------------------------------------------------
  const cmdKOverlay = document.getElementById('cmd-k-overlay');
  const cmdKBtn = document.getElementById('cmd-k-btn');
  const cmdKInput = document.getElementById('cmd-k-input');
  const cmdKItems = document.querySelectorAll('.cmd-k-item');

  function openCmdK() {
    cmdKOverlay.classList.add('active');
    cmdKOverlay.setAttribute('aria-hidden', 'false');
    cmdKInput.value = '';
    cmdKInput.focus();
    filterCmdK('');
  }

  function closeCmdK() {
    cmdKOverlay.classList.remove('active');
    cmdKOverlay.setAttribute('aria-hidden', 'true');
  }

  function filterCmdK(query) {
    const q = query.toLowerCase();
    cmdKItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(q)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  if (cmdKBtn) cmdKBtn.addEventListener('click', openCmdK);

  if (cmdKInput) {
    cmdKInput.addEventListener('input', (e) => filterCmdK(e.target.value));
  }

  cmdKItems.forEach(item => {
    item.addEventListener('click', () => {
      const action = item.getAttribute('data-action');
      const target = item.getAttribute('data-target');

      closeCmdK();

      if (action === 'nav' && target) {
        const section = document.querySelector(target);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      } else if (action === 'copy-email') {
        copyToClipboard('atifkhani397@gmail.com', 'Email');
      } else if (action === 'resume') {
        showToast('Downloading AI Agent Resume...', 'fa-solid fa-download');
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdKOverlay.classList.contains('active')) {
        closeCmdK();
      } else {
        openCmdK();
      }
    } else if (e.key === 'Escape') {
      if (cmdKOverlay && cmdKOverlay.classList.contains('active')) closeCmdK();
      if (projectModal && projectModal.classList.contains('active')) closeModal();
    }
  });

  if (cmdKOverlay) {
    cmdKOverlay.addEventListener('click', (e) => {
      if (e.target === cmdKOverlay) closeCmdK();
    });
  }

  // --------------------------------------------------------------------------
  // 6. Interactive Dev Lab Logic (Agent Loop Simulator)
  // --------------------------------------------------------------------------
  const labRunBtn = document.getElementById('lab-run-btn');
  const labLangSelect = document.getElementById('lab-language');
  const labCodeOutput = document.getElementById('lab-code-output');

  const LAB_CODE_SIMULATION = {
    webagent: `<span class="terminal-prompt">$ aura-agent --target="https://target-portal.com" --goal="Automate Data Entry"</span><br>
<span class="terminal-comment"># Autonomous Web Agent Execution Graph (Playwright + LangGraph):</span><br>
1. [Playwright] Launching headless Chromium session...<br>
2. [DOM Analyzer] Scanned target portal -> Located form input \`#customer-id\` & button \`#btn-submit\`<br>
3. [LangGraph] Decision State -> Trigger click action & fill payload schema<br>
4. [Pydantic] Validated server response code 200 OK<br>
<span class="terminal-comment"># Result: Agent workflow completed in 1.4s with 100% execution accuracy.</span>`,

    python: `<span class="terminal-prompt">$ crewai run --agents=researcher,coder,evaluator</span><br>
<span class="terminal-comment"># Multi-Agent Consensus Graph Output:</span><br>
[Agent 1: Web Researcher] Querying vector DB for target domain docs...<br>
[Agent 2: Code Synthesis] Generating FastAPI Async endpoint with Pydantic...<br>
[Agent 3: Evaluator] Running unit tests -> All 12 assertions passed.<br>
<span class="terminal-comment"># Swarm consensus reached in 2.1s.</span>`,

    sql: `<span class="terminal-prompt">$ mcp-server --tool="vector-query"</span><br>
<span class="terminal-comment"># Model Context Protocol (MCP) Live Query:</span><br>
Connected to Qdrant Vector Engine on localhost:6333<br>
Query: "Retrieve top 5 embeddings for autonomous agent state recovery"<br>
<span class="terminal-comment"># Returned 5 items (Cosine Similarity: 0.942).</span>`
  };

  if (labRunBtn && labLangSelect && labCodeOutput) {
    labRunBtn.addEventListener('click', () => {
      const selected = labLangSelect.value;
      labCodeOutput.innerHTML = LAB_CODE_SIMULATION[selected] || 'Executing agent loop...';
      showToast(`Executed ${selected.toUpperCase()} Autonomous Agent Loop!`, 'fa-solid fa-robot');
    });
  }

  // Live Glassmorphism Controller Sliders
  const sliderBlur = document.getElementById('slider-blur');
  const sliderOpacity = document.getElementById('slider-opacity');
  const valBlur = document.getElementById('val-blur');
  const valOpacity = document.getElementById('val-opacity');

  if (sliderBlur && sliderOpacity) {
    sliderBlur.addEventListener('input', (e) => {
      const v = e.target.value;
      valBlur.textContent = v;
      document.documentElement.style.setProperty('--card-blur', `${v}px`);
    });

    sliderOpacity.addEventListener('input', (e) => {
      const v = e.target.value;
      valOpacity.textContent = v;
      document.documentElement.style.setProperty('--card-opacity-val', `${v / 100}`);
    });
  }

  // --------------------------------------------------------------------------
  // 7. Copy to Clipboard Triggers
  // --------------------------------------------------------------------------
  document.querySelectorAll('.copy-trigger').forEach(card => {
    card.addEventListener('click', () => {
      const textToCopy = card.getAttribute('data-copy');
      if (textToCopy) copyToClipboard(textToCopy, 'Contact info');
    });
  });

  // --------------------------------------------------------------------------
  // 8. Contact Form Handling
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.';
        contactForm.reset();
        showToast('Message submitted successfully!', 'fa-solid fa-paper-plane');

        setTimeout(() => {
          formFeedback.style.display = 'none';
        }, 5000);
      }, 1200);
    });
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
