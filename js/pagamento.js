// Fluxo de pagamento: escolher forma -> finalizar -> sucesso (feed + aviso) ou erro (volta à compra)
const MSG_ERRO = 'Não foi possível confirmar sua forma de pagamento, modifique a forma de pagamento para uma válida ou tente novamente.';
const lerPag = () => { try { return JSON.parse(sessionStorage.getItem('pagamento')) || {}; } catch { return {}; } };
const salvarPag = p => { try { sessionStorage.setItem('pagamento', JSON.stringify(p)); } catch {} };

// TROCAR quando o back-end em Python existir: aqui entra a chamada que confirma o pagamento.
// Para testar o erro agora, rode no console do navegador: localStorage.setItem('simularFalha', '1')
// (e localStorage.removeItem('simularFalha') para voltar ao normal)
function confirmarPagamento(pag) {
  return new Promise(ok => setTimeout(() => ok(localStorage.getItem('simularFalha') !== '1'), 600));
}

function escolher(tipo) {
  salvarPag({ tipo });
  if (tipo === 'pix') { marcar(); return; }
  go('cartoes');
}
function escolherCartao(cartao, parcelas) {
  const p = lerPag();
  salvarPag({ tipo: p.tipo || 'credito', cartao, parcelas: p.tipo === 'debito' ? 1 : parcelas });
  go('compra');
}
function salvarCartao(form) {
  const nome = form.querySelector('#nomecartao').value.trim();
  salvarPag({ tipo: lerPag().tipo || 'credito', cartao: nome, parcelas: 1 });
  go('compra');
}
function marcar() {
  const p = lerPag();
  document.querySelectorAll('.pagto button[data-tipo]').forEach(b => b.classList.toggle('sel', b.dataset.tipo === p.tipo));
  const el = document.getElementById('pag-sel');
  if (!el) return;
  const ok = p.tipo === 'pix' || (p.tipo && p.cartao);
  el.textContent = !ok ? 'Nenhuma forma selecionada'
    : p.tipo === 'pix' ? 'Pix'
    : `${p.tipo === 'credito' ? 'Crédito' : 'Débito'}: ${p.cartao}${p.parcelas > 1 ? ' em ' + p.parcelas + 'x' : ''}`;
  const erro = document.getElementById('erro'); if (erro) erro.hidden = true;
}
function mostrarErro(msg) { const e = document.getElementById('erro'); e.textContent = msg; e.hidden = false; window.scrollTo(0, 0); document.getElementById('compra').scrollTop = 0; }

function finalizar() {
  const p = lerPag();
  if (!p.tipo || (p.tipo !== 'pix' && !p.cartao)) { mostrarErro('Selecione uma forma de pagamento.'); return; }
  if (p.tipo === 'pix') { go('pix'); return; }
  processar(p);
}
async function processar(pag) {
  const ok = await confirmarPagamento(pag);
  try {
    if (ok) { sessionStorage.setItem('aviso', 'Pagamento realizado com sucesso'); sessionStorage.removeItem('pagamento'); }
    else sessionStorage.setItem('erro', MSG_ERRO);
  } catch {}
  go(ok ? 'feed' : 'compra');
}

// ao abrir a compra: mostra erro de tentativa anterior e a forma escolhida
if (document.getElementById('compra')) {
  const e = sessionStorage.getItem('erro');
  marcar();
  if (e) { sessionStorage.removeItem('erro'); mostrarErro(e); }
}
