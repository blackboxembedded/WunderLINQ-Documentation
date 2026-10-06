const search = document.querySelector('#guide-search');
const sections = [...document.querySelectorAll('.doc-section')];
const links = [...document.querySelectorAll('.toc a')];

search?.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase();
  sections.forEach((section) => {
    section.hidden = query.length > 0 && !section.textContent.toLocaleLowerCase().includes(query);
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => link.toggleAttribute('aria-current', link.hash === `#${visible.target.id}`));
  }, { rootMargin: '-10% 0px -72% 0px', threshold: [0, .2, .6] });
  sections.forEach((section) => observer.observe(section));
}

const shotDialog = document.querySelector('#shot-dialog');
const shotDialogImage = shotDialog?.querySelector('img');
const shotDialogCaption = shotDialog?.querySelector('#shot-dialog-caption');
const shotDialogClose = shotDialog?.querySelector('.shot-dialog-close');

function openScreenshot(image) {
  if (!shotDialog || !shotDialogImage || !shotDialogCaption) return;
  shotDialogImage.src = image.currentSrc || image.src;
  shotDialogImage.alt = image.alt;
  shotDialogCaption.textContent = image.closest('figure')?.querySelector('figcaption')?.textContent || image.alt;
  shotDialog.showModal();
}

document.querySelectorAll('.shots img').forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-label', `${image.alt}. View full-size screenshot.`);
  image.addEventListener('click', () => openScreenshot(image));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openScreenshot(image);
    }
  });
});

shotDialogClose?.addEventListener('click', () => shotDialog.close());
shotDialog?.addEventListener('click', (event) => {
  if (event.target === shotDialog) shotDialog.close();
});
