// Minhas compras: abas por status
const abas = document.querySelectorAll('.abas button');
function filtrarAba(s) {
  abas.forEach(b => b.classList.toggle('ativa', b.dataset.s === s));
  document.querySelectorAll('.compra').forEach(c => c.style.display = c.dataset.s === s ? '' : 'none');
}
abas.forEach(b => b.onclick = () => filtrarAba(b.dataset.s));
filtrarAba('Preparando');
