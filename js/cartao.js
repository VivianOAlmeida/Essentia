// Máscaras do formulário de cartão
const mascara = (id, fn) => document.getElementById(id).addEventListener('input',
  e => e.target.value = fn(e.target.value.replace(/\D/g, '')));
mascara('numcartao', v => v.replace(/(\d{4})(?=\d)/g, '$1 '));
mascara('validade', v => v.replace(/(\d{2})(?=\d)/, '$1/'));
mascara('cpf', v => v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'));
