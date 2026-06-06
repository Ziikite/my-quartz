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

  // 정규화: 하이픈 여러개→하나, 특수문자 제거
  function normalize(str) {
    return decodeURIComponent(str)
      .toLowerCase()
      .replace(/[&+]/g, '-and-')
      .replace(/[-]+/g, '-')
      .replace(/[^a-z0-9가-힣\-\/\.]/g, '')
      .trim();
  }

  async function applyBadges() {
    let newFiles;
    try {
      const res = await fetch('/my-quartz/static/new-files.json');
      newFiles = await res.json();
    } catch(e) { return; }
    if (!newFiles?.length) return;

    const normalizedNew = newFiles.map(normalize);

    function isNew(href) {
      const normalized = normalize(href.replace('/my-quartz/', '').replace(/\/$/, ''));
      return normalizedNew.some(f => {
        const nf = normalize(f);
        return normalized === nf || normalized.endsWith(nf) || nf.endsWith(normalized);
      });
    }

    function addBadge(el) {
      if (!el.querySelector('.new-badge')) el.appendChild(makeBadge());
    }

    // 사이드바 링크
    document.querySelectorAll('.nav-file-title a').forEach(link => {
      if (isNew(link.getAttribute('href') || '')) addBadge(link);
    });

    // 현재 페이지 타이틀
    if (isNew(window.location.pathname)) {
      const title = document.querySelector('h1.article-title');
      if (title) addBadge(title);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyBadges);
  } else {
    applyBadges();
  }
  document.addEventListener('nav', applyBadges);

  // 사이드바 동적 렌더링 대응
  const observer = new MutationObserver(() => applyBadges());
  observer.observe(document.body, { childList: true, subtree: true });
})();
