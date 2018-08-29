export function getDefaultCity() {
  const shop = JSON.parse(localStorage.getItem('shop'));
  if (shop) {
    return shop.parameters.dafaultCity;
  }
}

export function getDefaultState() {
  const shop = JSON.parse(localStorage.getItem('shop'));
  if (shop) {
    return shop.parameters.dafaultState;
  }
}
