// Postar obra: definição (exposição, venda, evento) e arquivo
const exp = document.getElementById('exp'), venda = document.getElementById('venda'), evento = document.getElementById('evento');
const mostrar = () => document.getElementById('venda-campos').hidden = !venda.checked;
exp.onchange = () => { if (exp.checked) venda.checked = evento.checked = false; mostrar(); };
[venda, evento].forEach(c => c.onchange = () => { if (c.checked) exp.checked = false; if (!venda.checked && !evento.checked) exp.checked = true; mostrar(); });
const arq = document.getElementById('arq'), up = document.getElementById('up');
up.onclick = () => arq.click();
arq.onchange = () => up.textContent = arq.files[0] ? arq.files[0].name : '⬇ Baixar arquivo';
