export function getNearestDegree(value) {
  if (!isNumeric(value)) return value;

  let valorCalc = value;
  let positiveNumber = false;

  if (value > 0) {
    valorCalc *= -1;
    positiveNumber = true;
  }

  let result = Math.ceil(valorCalc / 25) * 25;

  return positiveNumber ? (result *= -1) : result;
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

export function calcFarDiopter({
  FarSphere, FarCylinder, Addition, NearSphere, NearCylinder,
}) {
  if (Addition) {
    FarSphere = parseInt(NearSphere || 0, 10) - parseInt(Addition, 10);
    FarCylinder = NearCylinder;
  }
  return {
    FarSphere,
    FarCylinder,
    Addition,
    NearSphere,
    NearCylinder,
  };
}

export function calcNearDiopter({
  FarSphere, FarCylinder, Addition, NearSphere, NearCylinder,
}) {
  if (Addition) {
    NearSphere = parseInt(FarSphere || 0, 10) + parseInt(Addition, 10);
    NearCylinder = FarCylinder;
  }
  return {
    FarSphere,
    FarCylinder,
    Addition,
    NearSphere,
    NearCylinder,
  };
}
