import { ROUTE_PREFIX as PREFIX } from '../../config';
import { calcFarDiopter, calcNearDiopter } from '../../utils/diopter';
import { onlyNumbersCpf } from '../../utils/string';

export function getBreadcrumbData() {
  return [
    { active: false, link: `${PREFIX}`, name: 'Home' },
    { active: true, link: '', name: 'Detalhes do Cliente' },
  ];
}

export function getInitialState() {
  return {
    errors: {},

    zipCode: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    complement: '',
    state: '',
    socialName: '',
    personalCpf: '',
    email: '',
    phone1: '',
    dateBirth: '',

    rightFarSpherePower: '',
    rightFarCylinderPower: '',
    rightFarAxis: '',
    rightAddition: '',
    rightNearSpherePower: '',
    rightNearCylinderPower: '',
    rightNearAxis: '',
    rightFarMonocularCentrantionDistance: '',
    rightFittingHeight: '',
    leftFarSpherePower: '',
    leftFarCylinderPower: '',
    leftFarAxis: '',
    leftAddition: '',
    leftNearSpherePower: '',
    leftNearCylinderPower: '',
    leftNearAxis: '',
    leftFarMonocularCentrantionDistance: '',
    leftFittingHeight: '',

    rightPrism1: '',
    rightPrism1Axis: '',
    rightPrism2: '',
    rightPrism2Axis: '',
    leftPrism1: '',
    leftPrism1Axis: '',
    leftPrism2: '',
    leftPrism2Axis: '',

    rightVertexDistance: '',
    pantoscopicAngle: '',
    curvatureAngle: '',
    readingDistance: '',
    leftVertexDistance: '',

    image: '',

    formInvalid: false,
  };
}

export function fillState(data) {
  const { prescription } = data;
  let p = {};

  if (prescription.length) {
    p = prescription[0];
  }

  const { images } = data;
  let i = {};
  if (images && images.length) {
    i = images[0];
  }

  const clientData = {
    zipCode: data.zipCode || '',
    address: data.address || '',
    number: data.number || '',
    neighborhood: data.neighborhood || '',
    city: data.city || '',
    complement: data.complement || '',
    state: data.state || '',
    socialName: data.socialName || '',
    personalCpf: setMaskCpf(data.personalCpf) || '',
    email: formatEmail(data.email) || '',
    phone1: data.phone1 || '',
    dateBirth: data.dateBirth || '',

    rightFarSpherePower: p.rightFarSpherePower || '',
    rightFarCylinderPower: p.rightFarCylinderPower || '',
    rightFarAxis: p.rightFarAxis || '',
    rightAddition: p.rightAddition || '',
    rightNearSpherePower: p.rightNearSpherePower || '',
    rightNearCylinderPower: p.rightNearCylinderPower || '',
    rightNearAxis: p.rightNearAxis || '',
    rightFarMonocularCentrantionDistance: p.rightFarMonocularCentrantionDistance || '',
    rightFittingHeight: p.rightFittingHeight || '',
    leftFarSpherePower: p.leftFarSpherePower || '',
    leftFarCylinderPower: p.leftFarCylinderPower || '',
    leftFarAxis: p.leftFarAxis || '',
    leftAddition: p.leftAddition || '',
    leftNearSpherePower: p.leftNearSpherePower || '',
    leftNearCylinderPower: p.leftNearCylinderPower || '',
    leftNearAxis: p.leftNearAxis || '',
    leftFarMonocularCentrantionDistance: p.leftFarMonocularCentrantionDistance || '',
    leftFittingHeight: p.leftFittingHeight || '',

    rightPrism1: p.rightPrism1 || '',
    rightPrism1Axis: getAxisValue(p.rightPrism1Axis),
    rightPrism2: p.rightPrism2 || '',
    rightPrism2Axis: getAxisValue(p.rightPrism2Axis),
    leftPrism1: p.leftPrism1 || '',
    leftPrism1Axis: getAxisValue(p.leftPrism1Axis),
    leftPrism2: p.leftPrism2 || '',
    leftPrism2Axis: getAxisValue(p.leftPrism2Axis),

    rightVertexDistance: p.rightVertexDistance || '',
    pantoscopicAngle: p.pantoscopicAngle || '',
    curvatureAngle: p.curvatureAngle || '',
    readingDistance: p.readingDistance || '',
    leftVertexDistance: p.leftVertexDistance || '',

    image: i.image || '',
  };

  return clientData;
}

function getAxisValue(value) {
  if (value === 0) return value;

  if (!value) return '';

  return value;
}

export function transformData(data) {
  const result = {
    zipCode: data.zipCode,
    address: data.address,
    number: data.number,
    neighborhood: data.neighborhood,
    city: data.city,
    complement: data.complement,
    state: data.state,
    socialName: data.socialName,
    personalCpf: data.personalCpf,
    email: data.email,
    phone1: data.phone1,
    dateBirth: data.dateBirth,
    prescription: [
      {
        rightFarSpherePower: data.rightFarSpherePower,
        rightFarCylinderPower: data.rightFarCylinderPower,
        rightFarAxis: data.rightFarAxis,
        rightAddition: data.rightAddition,
        rightNearSpherePower: data.rightNearSpherePower,
        rightNearCylinderPower: data.rightNearCylinderPower,
        rightNearAxis: data.rightNearAxis,
        rightFarMonocularCentrantionDistance: data.rightFarMonocularCentrantionDistance,
        rightFittingHeight: data.rightFittingHeight,
        leftFarSpherePower: data.leftFarSpherePower,
        leftFarCylinderPower: data.leftFarCylinderPower,
        leftFarAxis: data.leftFarAxis,
        leftAddition: data.leftAddition,
        leftNearSpherePower: data.leftNearSpherePower,
        leftNearCylinderPower: data.leftNearCylinderPower,
        leftNearAxis: data.leftNearAxis,
        leftFarMonocularCentrantionDistance: data.leftFarMonocularCentrantionDistance,
        leftFittingHeight: data.leftFittingHeight,

        rightPrism1: data.rightPrism1,
        rightPrism1Axis: data.rightPrism1Axis,
        rightPrism2: data.rightPrism2,
        rightPrism2Axis: data.rightPrism2Axis,
        leftPrism1: data.leftPrism1,
        leftPrism1Axis: data.leftPrism1Axis,
        leftPrism2: data.leftPrism2,
        leftPrism2Axis: data.leftPrism2Axis,

        rightVertexDistance: data.rightVertexDistance,
        pantoscopicAngle: data.pantoscopicAngle,
        curvatureAngle: data.curvatureAngle,
        readingDistance: data.readingDistance,
        leftVertexDistance: data.leftVertexDistance,
      },
    ],
    images: [
      {
        image: data.image,
      },
    ],
  };
  return result;
}

export function getRecipeFieldsForRound() {
  return [
    'rightFarSpherePower',
    'rightFarCylinderPower',
    'leftFarSpherePower',
    'leftFarCylinderPower',
    'rightNearSpherePower',
    'rightNearCylinderPower',
    'leftNearSpherePower',
    'leftNearCylinderPower',
  ];
}

export function calcDiopter(data, eye, type) {
  const diopter = {
    FarSphere: data[`${eye}FarSpherePower`],
    FarCylinder: data[`${eye}FarCylinderPower`],
    Addition: data[`${eye}Addition`],
    NearSphere: data[`${eye}NearSpherePower`],
    NearCylinder: data[`${eye}NearCylinderPower`],
  };
  const diopterProcessed = type === 'Near' ? calcNearDiopter(diopter) : calcFarDiopter(diopter);
  return diopterProcessed;
}

export function formatEmail(value) {
  return value ? value.replace(/\s/g, '').toLowerCase() : value;
}

export function applyUpperCase(value) {
  return value ? value.toUpperCase() : value;
}

function setMaskCpf(value) {
  if (!value) return;
  const v = onlyNumbersCpf(value);
  return `${v.substr(0, 3)}.${v.substr(3, 3)}.${v.substr(6, 3)}-${v.substr(9, 2)}`;
}
