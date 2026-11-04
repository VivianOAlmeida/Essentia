// Pagamento Pix: copiar código
function copiar() {
  const c = document.getElementById('codigo').textContent;
  (navigator.clipboard ? navigator.clipboard.writeText(c) : Promise.reject())
    .then(() => toast('Código copiado'), () => toast('Selecione e copie o código'));
}
