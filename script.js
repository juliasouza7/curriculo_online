const tabButtons = document.querySelectorAll('.tab-link, .tab-shortcut');
const tabPanels = document.querySelectorAll('.tab-panel');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const certificateGrid = document.getElementById('certificateGrid');
const emptyCertificates = document.getElementById('emptyCertificates');
const certificateSearch = document.getElementById('certificateSearch');
let certificates = [];

function activateTab(tabId) {
  tabPanels.forEach((panel) => panel.classList.toggle('active', panel.id === tabId));
  document.querySelectorAll('.tab-link').forEach((button) => {
    button.classList.toggle('active', button.dataset.tab === tabId);
  });
  navLinks?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.querySelector('.container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => activateTab(button.dataset.tab));
});

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.getElementById('year').textContent = new Date().getFullYear();

function formatTitle(fileName) {
  return fileName
    .replace(/^.*\//, '')
    .replace(/\.[^/.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function getCertificateIcon(type, file) {
  const value = `${type || ''} ${file || ''}`.toLowerCase();
  if (value.includes('pdf')) return 'PDF';
  return 'IMG';
}

function renderCertificates(items) {
  certificateGrid.innerHTML = '';
  const hasItems = items.length > 0;
  emptyCertificates.style.display = hasItems ? 'none' : 'block';

  items.forEach((certificate) => {
    const title = certificate.titulo || formatTitle(certificate.arquivo || certificate.nome || 'Certificado');
    const file = certificate.arquivo || certificate.path;
    const institution = certificate.instituicao || certificate.tipo || 'Certificado';

    if (!file) return;

    const card = document.createElement('a');
    card.className = 'certificate-card';
    card.href = file;
    card.target = '_blank';
    card.rel = 'noopener';
    card.innerHTML = `
      <div class="certificate-icon">${getCertificateIcon(certificate.tipo, file)}</div>
      <h3>${title}</h3>
      <span>${institution}</span>
      <span>Abrir certificado →</span>
    `;
    certificateGrid.appendChild(card);
  });
}

async function loadCertificates() {
  try {
    const response = await fetch('certificados.json', { cache: 'no-store' });
    certificates = response.ok ? await response.json() : [];
    renderCertificates(certificates);
  } catch (error) {
    console.warn('Não foi possível carregar certificados.json', error);
    renderCertificates([]);
  }
}

certificateSearch?.addEventListener('input', (event) => {
  const term = event.target.value.toLowerCase().trim();
  const filtered = certificates.filter((certificate) => {
    const content = `${certificate.titulo || ''} ${certificate.instituicao || ''} ${certificate.arquivo || ''}`.toLowerCase();
    return content.includes(term);
  });
  renderCertificates(filtered);
});

loadCertificates();
