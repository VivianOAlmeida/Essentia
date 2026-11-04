// Chats: busca de conversas e envio de mensagens
function filtrar(txt) {
  document.querySelectorAll('.lista-chat li').forEach(li =>
    li.style.display = li.textContent.toLowerCase().includes(txt.toLowerCase()) ? '' : 'none');
}
function enviar(form) {
  const input = form.querySelector('input');
  if (!input.value.trim()) return;
  const m = document.createElement('div');
  m.className = 'msg enviada';
  m.textContent = input.value;
  const box = document.getElementById('mensagens');
  box.append(m); box.scrollTop = box.scrollHeight;
  input.value = '';
}
