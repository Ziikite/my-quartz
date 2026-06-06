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

  function isNew(dateStr) {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = (now - date) / (1000 * 60 * 60 * 24);
    return diffDays <= DAYS_THRESHOLD;
  }

  function addNewBadge(el) {
    if (el.querySelector('.new-badge')) return;
    const badge = document.createElement('span');
    badge.className = 'new-badge';
    badge.textContent = 'N';
    badge.style.cssText = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      background: #3182F6;
      color: white;
      border-radius: 50%;
      font-size: 9px;
      font-weight: 700;
      margin-left: 5px;
      vertical-align: middle;
      flex-shrink: 0;
      font-family: 'Pretendard', sans-serif;
    `;
    el.appendChild(badge);
  }

  async function checkAndBadge() {
    // content-meta의 날짜 기준으로 현재 페이지 뱃지
    const metaEl = document.querySelector('.content-meta');
    if (metaEl) {
      const dateMatch = metaEl.textContent.match(/\w{3} \d{1,2}, \d{4}/);
      if (dateMatch && isNew(dateMatch[0])) {
        const title = document.querySelector('h1.article-title');
        if (title) addNewBadge(title);
      }
    }

    // 사이드바 네비게이션 파일들에 뱃지 (frontmatter의 날짜 기준)
    // Quartz가 생성한 날짜 데이터를 활용
    const navFiles = document.querySelectorAll('.nav-file-title');
    navFiles.forEach(file => {
      const link = file.querySelector('a');
      if (!link) return;
      // 현재 페이지가 최근 7일 내라면 뱃지 (간단 구현: 현재 페이지와 같은 파일이면)
      const href = link.getAttribute('href');
      if (href && window.location.pathname.includes(href.replace(/^\/my-quartz/, ''))) {
        const metaDate = document.querySelector('.content-meta');
        if (metaDate) {
          const dateMatch = metaDate.textContent.match(/\w{3} \d{1,2}, \d{4}/);
          if (dateMatch && isNew(dateMatch[0])) {
            addNewBadge(link);
          }
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkAndBadge);
  } else {
    checkAndBadge();
  }

  // SPA navigation 대응
  document.addEventListener('nav', checkAndBadge);
})();
