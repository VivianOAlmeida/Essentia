// Feed e perfil: comentários
function toggle(id) { const e = document.getElementById(id); e.hidden = !e.hidden; }
function addComentario(form) {
  const input = form.querySelector('input');
  if (!input.value.trim()) return;
  const div = document.createElement('div');
  div.className = 'comentario';
  div.innerHTML = '<img class="avatar" src="../img/default.png" alt=""><p></p>';
  div.querySelector('p').textContent = input.value;
  form.before(div);
  input.value = '';
}
