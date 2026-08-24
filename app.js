// Search toggle (all pages)
const form = document.getElementById('search');
if (form) {
  const toggle = document.getElementById('search-toggle');
  toggle.onclick = () => {
    const open = form.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    if (open) form.querySelector('.search-input').focus(); else form.reset();
  };
}

// Slider arrows (home page only)
const slider = document.getElementById('slider');
if (slider) {
  const step = () => slider.querySelector('.slide').offsetWidth + 40;
  document.querySelector('.slide-nav.prev').onclick = () => slider.scrollBy(-step(), 0);
  document.querySelector('.slide-nav.next').onclick = () => slider.scrollBy(step(), 0);
}

// Close the language dropdown on outside click
document.addEventListener('click', e => {
  document.querySelectorAll('details.lang[open]').forEach(d => {
    if (!d.contains(e.target)) d.removeAttribute('open');
  });
});
