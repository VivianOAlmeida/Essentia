// Carrinho: guardado no localStorage para valer entre as páginas
function lerCarrinho() { try { return JSON.parse(localStorage.getItem('carrinho')) || []; } catch { return []; } }
function salvarCarrinho(c) { try { localStorage.setItem('carrinho', JSON.stringify(c)); } catch {} }
function addCarrinho() {
  const c = lerCarrinho();
  c.push({ nome: 'Desenho bonitinho', preco: 0, desc: 'Descrição' });
  salvarCarrinho(c); toast('Adicionado ao carrinho');
}
function renderCarrinho() {
  const el = document.getElementById('itens-carrinho'); if (!el) return;
  const c = lerCarrinho();
  el.innerHTML = c.map((it, i) =>
    `<label class="item-carrinho"><input type="checkbox" checked style="width:auto;margin:0" data-i="${i}">
     <img class="miniatura" src="../img/default.png" alt=""><div>${it.nome}<br>R$${it.preco.toFixed(2)}<br>${it.desc}</div></label>`).join('')
    || '<p style="padding:24px;text-align:center">Seu carrinho está vazio.</p>';
  el.onchange = atualizarResumo; atualizarResumo();
}
function atualizarResumo() {
  const c = lerCarrinho();
  const marc = [...document.querySelectorAll('#itens-carrinho input:checked')].map(i => c[i.dataset.i]);
  const total = marc.reduce((s, i) => s + i.preco, 0);
  document.getElementById('resumo').innerHTML =
    `Produtos selecionados: ${String(marc.length).padStart(2, '0')}<br>Valor sem frete: R$${total.toFixed(2)}`;
}
renderCarrinho();
