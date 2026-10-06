// 主导航「更多」下拉：移动端点击展开，桌面端悬停
(function () {
  var dropdowns = document.querySelectorAll('.menu-dropdown');

  dropdowns.forEach(function (dd) {
    var btn = dd.querySelector('.menu-dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = dd.classList.contains('is-open');

      // 关闭其他
      dropdowns.forEach(function (other) {
        other.classList.remove('is-open');
        var b = other.querySelector('.menu-dropdown-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        dd.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 点击外部关闭
  document.addEventListener('click', function () {
    dropdowns.forEach(function (dd) {
      dd.classList.remove('is-open');
      var b = dd.querySelector('.menu-dropdown-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  // Esc 关闭
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      dropdowns.forEach(function (dd) {
        dd.classList.remove('is-open');
        var b = dd.querySelector('.menu-dropdown-btn');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });
})();