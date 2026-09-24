const DOMINIOS_PERMITIDOS = ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'];

function esRequerido(valor) {
  return valor !== null && valor !== undefined && String(valor).trim().length > 0;
}

function tieneLargoMaximo(valor, max) {
  return String(valor || '').trim().length <= max;
}

function tieneLargoMinimo(valor, min) {
  return String(valor || '').trim().length >= min;
}

function esCorreoValido(valor) {
  const patronGeneral = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patronGeneral.test(valor)) return false;
  return DOMINIOS_PERMITIDOS.some((dominio) => valor.toLowerCase().endsWith(dominio));
}

function esNumeroEntero(valor) {
  return Number.isInteger(Number(valor)) && String(valor).trim() !== '';
}

function esNumeroDecimalValido(valor) {
  return !Number.isNaN(Number(valor)) && String(valor).trim() !== '';
}

function esRunValido(run) {
  const runLimpio = String(run || '').trim().toUpperCase();
  if (!/^[0-9]+[0-9K]$/.test(runLimpio)) return false;
  if (runLimpio.length < 7 || runLimpio.length > 9) return false;

  const cuerpo = runLimpio.slice(0, -1);
  const dv = runLimpio.slice(-1);

  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  let dvEsperado = String(resto);
  if (resto === 11) dvEsperado = '0';
  if (resto === 10) dvEsperado = 'K';

  return dv === dvEsperado;
}

function mostrarError(inputEl, mensaje) {
  const grupo = inputEl.closest('.campo');
  if (!grupo) return;
  inputEl.classList.add('campo__input--error');
  inputEl.classList.remove('campo__input--valido');
  let error = grupo.querySelector('.campo__error');
  if (!error) {
    error = document.createElement('span');
    error.className = 'campo__error';
    grupo.appendChild(error);
  }
  error.textContent = mensaje;
}

function limpiarError(inputEl) {
  const grupo = inputEl.closest('.campo');
  if (!grupo) return;
  inputEl.classList.remove('campo__input--error');
  inputEl.classList.add('campo__input--valido');
  const error = grupo.querySelector('.campo__error');
  if (error) error.textContent = '';
}

function validarCampo(inputEl, reglas) {
  const valor = inputEl.value;
  for (const regla of reglas) {
    if (!regla.test(valor)) {
      mostrarError(inputEl, regla.mensaje);
      return false;
    }
  }
  limpiarError(inputEl);
  return true;
}
