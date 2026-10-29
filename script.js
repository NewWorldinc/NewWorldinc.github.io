// Runbook card: tick the steps off one at a time on load.
(function () {
  var card = document.querySelector('.runbook');
  if (!card) return;
  var steps = Array.prototype.slice.call(card.querySelectorAll('[data-step]'));
  var status = card.querySelector('[data-status]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function finish() {
    steps.forEach(function (li) { li.classList.add('done'); li.classList.remove('active'); });
    card.classList.add('verified');
    if (status) status.textContent = 'verified';
  }

  if (reduce) { finish(); return; }

  var i = 0;
  function next() {
    if (i > 0) steps[i - 1].classList.replace('active', 'done');
    if (i >= steps.length) {
      setTimeout(function () {
        card.classList.add('verified');
        if (status) status.textContent = 'verified';
      }, 250);
      return;
    }
    steps[i].classList.add('active');
    if (status) status.textContent = steps[i].querySelector('.step-label').textContent.toLowerCase() + '...';
    i++;
    setTimeout(next, i === 1 ? 500 : 650);
  }
  setTimeout(next, 500);
})();

// Fade sections in as they scroll into view.
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();
