// Máscaras de telefone e CEP
const so = e => e.target.value.replace(/\D/g, '');
document.getElementById('tel')?.addEventListener('input', e => e.target.value = so(e).replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2'));
document.getElementById('cep')?.addEventListener('input', e => e.target.value = so(e).replace(/(\d{5})(\d)/, '$1-$2'));
