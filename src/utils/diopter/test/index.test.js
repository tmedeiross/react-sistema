import * as Diopter from '../'

describe('Utils.Diopter.getNearestDegree', () => {
  it('Diopter.getNearestDegree has to be a function', () => {
    expect(typeof Diopter.getNearestDegree).toEqual('function')
  })

  it('Diopter.getNearestDegree(100) returns 100', () => {
    expect(Diopter.getNearestDegree(100)).toBe(100)
  })

  it('Diopter.getNearestDegree(-1000) returns -1000', () => {
    expect(Diopter.getNearestDegree(-1000)).toBe(-1000)
  })

  it('Diopter.getNearestDegree(689) returns 675', () => {
    expect(Diopter.getNearestDegree(689)).toBe(675)
  })

  it('Diopter.getNearestDegree(2399) returns 2375', () => {
    expect(Diopter.getNearestDegree(2399)).toBe(2375)
  })

  it('Diopter.getNearestDegree(-80) returns -75', () => {
    expect(Diopter.getNearestDegree(-80)).toBe(-75)
  })

  it('Diopter.getNearestDegree() returns undefined', () => {
    expect(Diopter.getNearestDegree()).toBe(undefined)
  })

  it('Diopter.getNearestDegree([]) returns []', () => {
    expect(Diopter.getNearestDegree([])).toEqual([])
  })

  it('Diopter.getNearestDegree({}) returns {}', () => {
    expect(Diopter.getNearestDegree({})).toEqual({})
  })

  it('Diopter.getNearestDegree(NaN) returns NaN', () => {
    expect(Diopter.getNearestDegree(NaN)).toEqual(NaN)
  })
})

describe('Utils.Diopter.calcFarDiopter', () => {
  it('Diopter.calcFarDiopter has to be a function', () => {
    expect(typeof Diopter.calcFarDiopter).toEqual('function')
  })

  it('Diopter.calcFarDiopter should calc far diopter correctly', () => {
    const diopter = {
      FarSphere: undefined,
      FarCylinder: undefined,
      Addition: 150,
      NearSphere: 125,
      NearCylinder: 100
    }

    const expected = {
      FarSphere: -25,
      FarCylinder: 100,
      Addition: 150,
      NearSphere: 125,
      NearCylinder: 100
    }

    expect(Diopter.calcFarDiopter(diopter)).toEqual(expected)
  })

  it('Diopter.calcFarDiopter return the same diopter when has no addition', () => {
    const diopter = {
      FarSphere: undefined,
      FarCylinder: undefined,
      Addition: undefined,
      NearSphere: 125,
      NearCylinder: 100
    }

    const expected = {
      FarSphere: undefined,
      FarCylinder: undefined,
      Addition: undefined,
      NearSphere: 125,
      NearCylinder: 100
    }

    expect(Diopter.calcFarDiopter(diopter)).toEqual(expected)
  })
})

describe('Utils.Diopter.calcNearDiopter', () => {
  it('Diopter.calcNearDiopter has to be a function', () => {
    expect(typeof Diopter.calcNearDiopter).toEqual('function')
  })

  it('Diopter.calcNearDiopter should calc far diopter correctly', () => {
    const diopter = {
      FarSphere: 100,
      FarCylinder: 200,
      Addition: 200,
      NearSphere: 125,
      NearCylinder: 100
    }

    const expected = {
      FarSphere: 100,
      FarCylinder: 200,
      Addition: 200,
      NearSphere: 300,
      NearCylinder: 200
    }

    expect(Diopter.calcNearDiopter(diopter)).toEqual(expected)
  })

  it('Diopter.calcNearDiopter return the same diopter when has no addition', () => {
    const diopter = {
      FarSphere: undefined,
      FarCylinder: undefined,
      Addition: undefined,
      NearSphere: 100,
      NearCylinder: 200
    }

    const expected = {
      FarSphere: undefined,
      FarCylinder: undefined,
      Addition: undefined,
      NearSphere: 100,
      NearCylinder: 200
    }

    expect(Diopter.calcNearDiopter(diopter)).toEqual(expected)
  })
})
