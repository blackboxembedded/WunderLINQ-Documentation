const navigation = document.querySelector('.docs-sidebar');
const sections = [...document.querySelectorAll('.welcome, .section:not(.docs-heading)')];
const links = [...document.querySelectorAll('.docs-sidebar a[href^="#"]')];

if (navigation) {
  const label = document.createElement('label');
  label.className = 'guide-search-label';
  label.htmlFor = 'guide-search';
  label.textContent = 'Search this guide';

  const search = document.createElement('input');
  search.className = 'guide-search';
  search.id = 'guide-search';
  search.type = 'search';
  search.placeholder = 'Search topics…';
  navigation.prepend(search);
  navigation.prepend(label);

  search.addEventListener('input', () => {
    const query = search.value.trim().toLocaleLowerCase();
    sections.forEach((section) => {
      section.hidden = query.length > 0 && !section.textContent.toLocaleLowerCase().includes(query);
    });
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => link.toggleAttribute('aria-current', link.hash === `#${visible.target.id}`));
  }, { rootMargin: '-10% 0px -72% 0px', threshold: [0, .2, .6] });
  sections.filter((section) => section.id).forEach((section) => observer.observe(section));
}

const dialog = document.createElement('dialog');
dialog.className = 'shot-dialog';
dialog.innerHTML = '<button class="shot-dialog-close" type="button" aria-label="Close image">Close</button><img alt="">';
document.body.append(dialog);

const dialogImage = dialog.querySelector('img');
document.querySelectorAll('a > img').forEach((image) => {
  const link = image.parentElement;
  if (!link?.href || !/\.(?:png|jpe?g|webp)$/i.test(new URL(link.href).pathname)) return;
  link.addEventListener('click', (event) => {
    event.preventDefault();
    dialogImage.src = link.href;
    dialogImage.alt = image.alt || 'Documentation image';
    dialog.showModal();
  });
});

dialog.querySelector('.shot-dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
