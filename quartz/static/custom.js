document.addEventListener("DOMContentLoaded", () => {
  // 토스트 엘리먼트 생성
  const toast = document.createElement("div");
  toast.id = "graph-toast";
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(40, 75, 99, 0.92);
    color: white;
    padding: 0.5rem 1.2rem;
    border-radius: 999px;
    font-size: 0.85rem;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s, transform 0.2s;
    z-index: 9999;
    white-space: nowrap;
    backdrop-filter: blur(8px);
  `;
  document.body.appendChild(toast);

  function showToast(text) {
    toast.textContent = text;
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  }

  function hideToast() {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
  }

  // 그래프 노드 감시 (동적으로 로드되므로 MutationObserver 사용)
  const observer = new MutationObserver(() => {
    document.querySelectorAll(".graph-container circle, .graph-container node").forEach(node => {
      if (node.dataset.toastBound) return;
      node.dataset.toastBound = "true";
      node.addEventListener("mouseenter", (e) => {
        const label = node.getAttribute("aria-label")
          || node.getAttribute("title")
          || node.getAttribute("data-id")
          || "노드";
        showToast(label);
      });
      node.addEventListener("mouseleave", hideToast);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});


// ===== NEW badge =====
(function() {
  function makeBadge() {
    const b = document.createElement('span');
    b.className = 'new-badge';
    b.textContent = 'N';
    b.style.cssText = `
      display:inline-flex;align-items:center;justify-content:center;
      min-width:15px;height:15px;background:#3182F6;color:white;
      border-radius:999px;font-size:9px;font-weight:700;
      margin-left:5px;padding:0 3px;vertical-align:middle;
      flex-shrink:0;font-family:'Pretendard',sans-serif;line-height:1;
    `;
    return b;
  }

  function normalize(str) {
    return decodeURIComponent(str)
      .toLowerCase()
      .replace(/[&+]/g, '-and-')
      .replace(/[-]+/g, '-')
      .replace(/[^a-z0-9가-힣\-\/\.]/g, '')
      .trim();
  }

  let newFiles = [];

  fetch('/my-quartz/static/new-files.json')
    .then(r => r.json())
    .then(data => {
      newFiles = data.map(normalize);
      applyBadges();
      setTimeout(applyBadges, 1000);
      setTimeout(applyBadges, 2000);
    })
    .catch(() => {});

  function isNew(href) {
    const normalized = normalize(href)
      .replace('ziikite.github.io/my-quartz/', '')
      .replace(/\/$/, '');
    return newFiles.some(f => {
      const nf = normalize(f);
      return normalized === nf ||
        normalized.endsWith(nf) ||
        nf.endsWith(normalized);
    });
  }

  function applyBadges() {
    // 핵심: a.nav-file-title (a 태그 자체가 nav-file-title 클래스)
    document.querySelectorAll('a.nav-file-title').forEach(link => {
      if (link.querySelector('.new-badge')) return;
      const href = link.href || '';
      if (isNew(href)) {
        link.appendChild(makeBadge());
      }
    });

    // 현재 페이지 타이틀
    const title = document.querySelector('h1.article-title');
    if (title && !title.querySelector('.new-badge')) {
      if (isNew(window.location.href)) {
        title.appendChild(makeBadge());
      }
    }
  }

  document.addEventListener('nav', () => {
    setTimeout(applyBadges, 300);
    setTimeout(applyBadges, 1000);
  });

  const observer = new MutationObserver(() => applyBadges());
  observer.observe(document.body, { childList: true, subtree: true });
})();

// ===== Mobile Navigation =====
(function() {
  function initMobileNav() {
    if (window.innerWidth > 768) return;
    if (document.getElementById('mobile-nav')) return;

    const overlay = document.createElement('div');
    overlay.id = 'mobile-overlay';
    document.body.appendChild(overlay);

    const nav = document.createElement('div');
    nav.id = 'mobile-nav';
    nav.innerHTML = `
      <a id="mobile-nav-title" href="/my-quartz/">Zii.zip</a>
      <button id="mobile-menu-btn" aria-label="메뉴">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <line x1="3" x2="21" y1="6" y2="6"/>
          <line x1="3" x2="21" y1="12" y2="12"/>
          <line x1="3" x2="21" y1="18" y2="18"/>
        </svg>
      </button>
    `;

    const quartzRoot = document.getElementById('quartz-root');
    if (quartzRoot) {
      quartzRoot.insertBefore(nav, quartzRoot.firstChild);
    } else {
      document.body.insertBefore(nav, document.body.firstChild);
    }

    const sidebar = document.querySelector('.left.sidebar');

    function openMenu() {
      sidebar?.classList.add('mobile-open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      sidebar?.classList.remove('mobile-open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    document.getElementById('mobile-menu-btn')?.addEventListener('click', openMenu);
    overlay.addEventListener('click', closeMenu);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
  document.addEventListener('nav', () => {
    document.getElementById('mobile-nav')?.remove();
    document.getElementById('mobile-overlay')?.remove();
    initMobileNav();
  });
})();
