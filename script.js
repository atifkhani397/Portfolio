/**
 * Software Engineer Portfolio - Script Logic (2026 Upgraded AI Agent Edition)
 * Positioning: Senior Software Engineer & AI Agent Architect.
 */

// --------------------------------------------------------------------------
// 1. Projects Case Studies Data Configuration
// --------------------------------------------------------------------------
const PROJECTS_DATA = {
  1: {
    id: 1,
    title: "Orion",
    category: "AI Research Intelligence",
    image: "assets/projects/orion.png",
    description: "Orion is an autonomous research intelligence system that fetches live academic literature, detects research gaps, scores innovation potential, and drafts publication-ready reports with verified references.",
    problem: "Research workflows need reliable retrieval, grounded citations, and long-form synthesis without allowing one model or one data source to become a bottleneck.",
    architecture: "A 3-layer multi-model pipeline connects React, FastAPI, Qdrant, DuckDB, Redis, hybrid BM25/vector retrieval, ArXiv ingestion, and PDF generation.",
    impact: "The system supports 5,000+ indexed research chunks, resumable batch ingestion, citation verification, faithfulness checks, and 19-section report generation.",
    tags: ["Python", "React", "FastAPI", "Qdrant", "Redis"],
    demoUrl: "",
    githubUrl: "https://github.com/atifkhani397/Orion"
  },
  2: {
    id: 2,
    title: "ARA-1 Financial Research Agent",
    category: "AI Research Intelligence",
    image: "assets/project2.png",
    description: "ARA-1 is an autonomous equity research engine for SEC filing analysis, valuation modeling, source conflict resolution, multi-tier memory, and automated PDF report synthesis.",
    problem: "Financial research combines repetitive filing review, data reconciliation, valuation work, and report writing that can take hours for a single company.",
    architecture: "A custom Plan-and-Execute + ReAct engine selects from 12 financial tools, uses ChromaDB memory, applies a source reliability hierarchy, and streams events over WebSockets.",
    impact: "The repository documents 46 passing tests, 32% prompt-token reduction, 21.4-second average single-step latency, and 2.5–6 minute end-to-end research sessions.",
    tags: ["Python", "LangChain", "ChromaDB", "FastAPI", "WebSockets"],
    demoUrl: "",
    githubUrl: "https://github.com/ZethetaIntern/Financial-Research-agent-"
  },
  3: {
    id: 3,
    title: "OptiCloud / Cindr",
    category: "Full-Stack Web",
    image: "assets/projects/opticloud.png",
    description: "OptiCloud is a FinOps control plane for finding cloud waste, reviewing safe actions, executing approved remediation, and keeping an organization-scoped audit trail.",
    problem: "Cloud cost optimization requires policy-aware review, approvals, bounded actions, rollback paths, and a reliable record of every decision.",
    architecture: "A Next.js dashboard connects to a Fastify API, PostgreSQL/TimescaleDB, Redis/BullMQ workers, Slack approvals, and cloud provider adapters.",
    impact: "The product includes waste detectors, policy governance, approval routing, snapshot-first remediation, rollback workflows, security hardening, and Docker Compose deployment.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Slack"],
    demoUrl: "",
    githubUrl: "https://github.com/atifkhani397/OptiCloud"
  },
  4: {
    id: 4,
    title: "Muhammad Atif Portfolio",
    category: "Full-Stack Web",
    image: "assets/project4.png",
    description: "This portfolio is a responsive static site for presenting real software projects with clear technical context and interactive case-study details.",
    problem: "A collection of repositories needs a clear narrative so visitors understand the product, architecture, and engineering decisions before opening the source.",
    architecture: "A lightweight HTML, CSS, and JavaScript site uses progressive enhancement for filtering, project modals, command navigation, scroll reveals, and the interactive lab.",
    impact: "The portfolio brings four real repositories into one consistent experience while keeping the original dark glass UI and its existing interactions.",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive UI"],
    demoUrl: "https://atifkhani397.github.io/Portfolio/",
    githubUrl: "https://github.com/atifkhani397/Portfolio"
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
  // Initialize Typing Effect with current professional positioning
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    new TypingEffect(typingEl, [
      'Senior Software Engineer',
      'AI Agent Architect',
      'Research Intelligence Builder',
      'Full-Stack Systems Engineer',
      'Production AI Engineer'
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
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
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
[Agent 3: Evaluator] Executing unit tests -> All 12 assertions passed.<br>
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
