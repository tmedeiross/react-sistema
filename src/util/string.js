export function onlyNumbersCpf(value) {
  if (!value) return;

  return value.replace(/\.|-/g, '');
}

export function onlyNumbersCnpj(value) {
  if (!value) return;

  return value.replace(/\.|-/g, '');
}
