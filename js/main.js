/* =========================================================
   MOVE OUT — interações do site
   1. Separadores de preços (Grupo / PT / PT Duo)
   2. Links de WhatsApp com mensagem pré-escrita e origem
   3. Ano automático no rodapé
   ========================================================= */

/* ---------- 1. Separadores de preços ----------
   Cada botão tem aria-controls="id-do-painel".
   Ao carregar, mostramos esse painel e escondemos os outros. */
const tabs = document.querySelectorAll('[role="tab"]');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => selectTab(tab));

  // Setas do teclado para mudar de separador (acessibilidade)
  tab.addEventListener('keydown', (e) => {
    const list = Array.from(tabs);
    const i = list.indexOf(tab);
    if (e.key === 'ArrowRight') { e.preventDefault(); selectTab(list[(i + 1) % list.length], true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); selectTab(list[(i - 1 + list.length) % list.length], true); }
  });
});

function selectTab(tab, focus) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
  if (focus) tab.focus();
}

// Os cartões "Escolhe o teu treino" abrem logo o separador certo
document.querySelectorAll('[data-tab]').forEach((tile) => {
  tile.addEventListener('click', () => {
    const tab = document.getElementById(tile.getAttribute('data-tab'));
    if (tab) selectTab(tab);
  });
});

/* ---------- 2. WhatsApp com origem ----------
   No Instagram pões o link moveoutvfx.com/?src=ig
   Assim a mensagem já chega escrita com "Vim do Instagram"
   e sabes de onde veio o contacto, sem esforço nenhum. */
const PHONE = '351963053499';
const SOURCES = {
  ig: 'Instagram',
  google: 'Google',
  fb: 'Facebook',
  amigo: 'recomendação de um amigo'
};

// Lê ?src= do endereço. Se não houver, considera "o site".
const params = new URLSearchParams(window.location.search);
const src = params.get('src');
const origem = SOURCES[src] ? `do ${SOURCES[src]}` : 'do site';
// "recomendação" pede "por", não "do"
const origemTexto = src === 'amigo' ? 'por recomendação de um amigo' : origem;

document.querySelectorAll('[data-wa]').forEach((link) => {
  // data-wa guarda o motivo do contacto, ex.: "marcar o treino grátis"
  const motivo = link.getAttribute('data-wa') || 'saber mais';
  const texto = `Olá Miguel! Vim ${origemTexto} e quero ${motivo}.`;
  link.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(texto)}`;
  link.target = '_blank';
  link.rel = 'noopener';
});

/* ---------- 3. Ano no rodapé ---------- */
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
