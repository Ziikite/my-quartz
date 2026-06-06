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

// ===== NEW badge for recently updated files =====
(function() {
  const DAYS_THRESHOLD = 7;
  const BASE = document.querySelector('body')?.dataset?.basepath || '';

  function daysDiff(dateStr) {
    if (!dateStr) return 999;
    const diff = (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24);
    return diff;
  }

  function makeBadge() {
    const badge = document.createElement('span');
    badge.className = 'new-badge';
    badge.textContent = 'N';
    badge.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 16px;
      height: 16px;
      background: #3182F6;
      color: white;
      border-radius: 999px;
      font-size: 9px;
      font-weight: 700;
      margin-left: 5px;
      padding: 0 4px;
      vertical-align: middle;
      flex-shrink: 0;
      font-family: 'Pretendard', sans-serif;
      letter-spacing: 0;
      line-height: 1;
    `;
    return badge;
  }

  async function applyBadges() {
    // contentIndex.json에서 모든 파일의 날짜 가져오기
    let index;
    try {
      const res = await fetch(`${BASE}/static/contentIndex.json`);
      index = await res.json();
    } catch(e) { return; }

    // 날짜 맵 생성 {slug: date}
    const dateMap = {};
    for (const [slug, data] of Object.entries(index)) {
      if (data.date) dateMap[slug] = data.date;
    }

    // 사이드바 네비게이션 링크에 뱃지 추가
    document.querySelectorAll('.nav-file-title a').forEach(link => {
      if (link.querySelector('.new-badge')) return;
      const href = link.getAttribute('href') || '';
      // href에서 slug 추출
      const slug = href.replace(BASE, '').replace(/^\//, '').replace(/\/$/, '');
      const date = dateMap[slug];
      if (date && daysDiff(date) <= DAYS_THRESHOLD) {
        link.appendChild(makeBadge());
      }
    });

    // 현재 페이지 타이틀에도 뱃지
    const currentSlug = window.location.pathname
      .replace(BASE, '').replace(/^\//, '').replace(/\/$/, '') || 'index';
    const currentDate = dateMap[currentSlug];
    if (currentDate && daysDiff(currentDate) <= DAYS_THRESHOLD) {
      const title = document.querySelector('h1.article-title');
      if (title && !title.querySelector('.new-badge')) {
        title.appendChild(makeBadge());
      }
    }
  }

  // 초기 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyBadges);
  } else {
    applyBadges();
  }

  // SPA 페이지 이동 대응
  document.addEventListener('nav', applyBadges);
})();
