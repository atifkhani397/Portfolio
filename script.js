const PROJECTS_DATA = {
  orion: {
    category: 'Research intelligence · AI system',
    title: 'Orion',
    description: 'An end-to-end autonomous research intelligence system that fetches live academic literature, detects research gaps, scores innovation potential, and drafts publication-ready reports with verified references.',
    problem: 'Long-form research workflows are slow to coordinate and vulnerable to weak retrieval, citation drift, and model bottlenecks.',
    architecture: 'A 3-layer multi-model pipeline combines FastAPI, Qdrant, DuckDB, Redis, hybrid BM25/vector retrieval, ArXiv ingestion, and a React dashboard.',
    impact: 'Designed around grounded output: live source ingestion, citation verification, faithfulness checks, resumable batch processing, and 19-section report generation.',
    github: 'https://github.com/atifkhani397/Orion'
  },
  ara: {
    category: 'Equity research agent · AI system',
    title: 'ARA-1 / Financial Research Agent',
    description: 'An autonomous financial research engine for multi-source equity analysis, SEC EDGAR filing parsing, valuation modeling, memory compaction, and automated report synthesis.',
    problem: 'Analysts spend hours gathering filings, reconciling sources, building valuation models, and turning fragmented evidence into a structured research note.',
    architecture: 'A custom Plan-and-Execute + ReAct engine selects from 12 financial tools, uses ChromaDB memory, applies a source reliability hierarchy, and streams events over WebSockets.',
    impact: 'The repository reports 46 passing tests, 32% prompt-token reduction, 21.4s average single-step latency, and 2.5–6 minute end-to-end research sessions.',
    github: 'https://github.com/ZethetaIntern/Financial-Research-agent-'
  },
  opticloud: {
    category: 'Cloud operations · Product engineering',
    title: 'OptiCloud / Cindr',
    description: 'A FinOps control plane for finding cloud waste, reviewing safe actions, executing approved remediation, and keeping an organization-scoped audit trail.',
    problem: 'Cloud savings require more than detection: teams need policy-aware review, approval workflows, bounded actions, rollback paths, and a trustworthy record of every decision.',
    architecture: 'A Next.js dashboard connects to a Fastify API, PostgreSQL/TimescaleDB, Redis/BullMQ workers, Slack approvals, and provider adapters with security hardening.',
    impact: 'The product includes waste detectors, policy governance, approval routing, snapshot-first remediation, rollback workflows, migrations, and a local Docker Compose stack.',
    github: 'https://github.com/atifkhani397/OptiCloud'
  },
  portfolio: {
    category: 'Personal site · Product engineering',
    title: 'This portfolio',
    description: 'A deliberately lightweight portfolio that gives the work room to breathe: direct project context, restrained motion, accessible interactions, and a UI that reflects the systems it represents.',
    problem: 'A collection of repositories needs a clear narrative, not just a grid of links. Visitors should understand what was built and why it matters before opening the source.',
    architecture: 'A dependency-free HTML, CSS, and JavaScript site uses progressive enhancement for filtering, case-study modals, command navigation, and the interactive trace.',
    impact: 'The portfolio now presents four real builds with accurate source links, product visuals, responsive behavior, keyboard-friendly interactions, and a consistent editorial system.',
    github: 'https://github.com/atifkhani397/Portfolio'
  }
};

const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function showToast(message, icon = 'fa-solid fa-circle-check') {
  const container = qs('#toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="${icon}" aria-hidden="true"></i><span>${message}</span>`;
  container.appendChild(toast);
  window.setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    window.setTimeout(() => toast.remove(), 240);
  }, 2800);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Email address copied to clipboard.', 'fa-solid fa-copy');
  } catch {
    showToast('Copy was unavailable. Email me at atifkhani397@gmail.com.', 'fa-solid fa-triangle-exclamation');
  }
}

function setupReveals() {
  const elements = qsa('.reveal');
  if (!('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('active'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  elements.forEach(element => observer.observe(element));
}

function setupNavigation() {
  const navbar = qs('#navbar');
  const menu = qs('#nav-menu');
  const hamburger = qs('#hamburger-btn');
  const links = qsa('.nav-link');
  const sections = qsa('main section[id]');

  const onScroll = () => navbar?.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  hamburger?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
  });
  links.forEach(link => link.addEventListener('click', () => {
    menu?.classList.remove('open');
    hamburger?.classList.remove('active');
    hamburger?.setAttribute('aria-expanded', 'false');
  }));

  if (!('IntersectionObserver' in window)) return;
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => spy.observe(section));
}

function setupFilters() {
  const buttons = qsa('.filter-btn');
  const cards = qsa('.project-card');
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    cards.forEach(card => card.classList.toggle('hide', filter !== 'all' && card.dataset.category !== filter));
  }));
}

function setupProjectModal() {
  const overlay = qs('#project-modal');
  const modal = qs('.modal-container', overlay);
  const visual = qs('#modal-visual');
  const category = qs('#modal-category');
  const title = qs('#modal-title');
  const description = qs('#modal-desc');
  const problem = qs('#modal-problem');
  const architecture = qs('#modal-architecture');
  const impact = qs('#modal-impact');
  const tags = qs('#modal-tags');
  const github = qs('#modal-github-link');

  const closeModal = () => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openModal = (card) => {
    const data = PROJECTS_DATA[card.dataset.projectId];
    if (!data) return;
    const clone = qs('.project-thumb', card).cloneNode(true);
    clone.classList.add('modal-project-thumb');
    visual.replaceChildren(clone);
    category.textContent = data.category;
    title.textContent = data.title;
    description.textContent = data.description;
    problem.textContent = data.problem;
    architecture.textContent = data.architecture;
    impact.textContent = data.impact;
    tags.replaceChildren(...[...card.querySelectorAll('.project-tags span')].map(tag => {
      const chip = document.createElement('span');
      chip.textContent = tag.textContent;
      return chip;
    }));
    github.href = data.github;
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    qs('#modal-close').focus();
  };

  qsa('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openModal(card);
      }
    });
  });
  qs('#modal-close')?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', event => { if (event.target === overlay) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && overlay.classList.contains('active')) closeModal(); });
  modal?.addEventListener('click', event => event.stopPropagation());
}

function setupCommandPalette() {
  const overlay = qs('#cmd-k-overlay');
  const input = qs('#cmd-k-input');
  const items = qsa('.cmd-k-item');
  const trigger = qs('#cmd-k-btn');

  const close = () => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  };
  const open = () => {
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    input.value = '';
    items.forEach(item => item.style.display = 'flex');
    window.setTimeout(() => input.focus(), 20);
  };
  const filter = value => {
    const query = value.toLowerCase().trim();
    items.forEach(item => item.style.display = item.textContent.toLowerCase().includes(query) ? 'flex' : 'none');
  };

  trigger?.addEventListener('click', open);
  input?.addEventListener('input', event => filter(event.target.value));
  items.forEach(item => item.addEventListener('click', () => {
    if (item.dataset.action === 'copy-email') copyToClipboard('atifkhani397@gmail.com');
    if (item.dataset.action === 'nav') document.querySelector(item.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    close();
  }));
  overlay?.addEventListener('click', event => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); overlay.classList.contains('active') ? close() : open(); }
    if (event.key === 'Escape' && overlay.classList.contains('active')) close();
  });
}

function setupTrace() {
  const button = qs('#lab-run-btn');
  const output = qs('#lab-code-output');
  const lines = [
    '<span class="trace-prompt">$</span> system.accept("complex research question")',
    '<span class="trace-step">01  route</span>   splitting goal into verifiable sub-tasks',
    '<span class="trace-step">02  retrieve</span> hybrid search → grounded source set',
    '<span class="trace-step">03  reason</span>  checking evidence against output schema',
    '<span class="trace-step">04  ship</span>    returning a useful next action <span class="trace-prompt">✓</span>'
  ];
  button?.addEventListener('click', () => {
    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running trace…';
    output.innerHTML = '';
    let index = 0;
    const addLine = () => {
      if (index >= lines.length) {
        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Run again';
        qs('.trace-status').textContent = 'complete';
        showToast('Trace completed with a grounded output.', 'fa-solid fa-wand-magic-sparkles');
        return;
      }
      output.insertAdjacentHTML('beforeend', `${lines[index]}<br>`);
      index += 1;
      window.setTimeout(addLine, 260);
    };
    qs('.trace-status').textContent = 'running';
    addLine();
  });
}

function setupCopyActions() {
  qsa('.copy-trigger').forEach(button => button.addEventListener('click', () => copyToClipboard(button.dataset.copy)));
}

document.addEventListener('DOMContentLoaded', () => {
  setupReveals();
  setupNavigation();
  setupFilters();
  setupProjectModal();
  setupCommandPalette();
  setupTrace();
  setupCopyActions();
});
