// Navegação entre páginas, aviso (toast) e modal de sair
function go(id) { location.href = id + '.html'; }
function back() { history.length > 1 ? history.back() : go('feed'); }
function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.querySelector('.app').append(t); }
  t.textContent = msg; t.classList.add('on');
  setTimeout(() => t.classList.remove('on'), 1800);
}
function abrirModal(id = 'modal') { document.getElementById(id).hidden = false; }
function fecharModal(id = 'modal') { document.getElementById(id).hidden = true; }
document.querySelectorAll('#nav button').forEach(b => {
  b.classList.toggle('ativa', b.dataset.go === document.body.dataset.page);
  b.onclick = () => go(b.dataset.go);
});

// Aviso em pop-up (ex.: pagamento realizado) guardado pela página anterior; some em 2 s
function popup(msg, ms = 2000) {
  const p = document.createElement('div');
  p.className = 'popup'; p.setAttribute('role', 'status');
  p.innerHTML = '<div></div>'; p.firstChild.textContent = msg;
  document.querySelector('.app').append(p);
  setTimeout(() => p.remove(), ms);
}
try { const aviso = sessionStorage.getItem('aviso'); if (aviso) { sessionStorage.removeItem('aviso'); popup(aviso); } } catch {}
