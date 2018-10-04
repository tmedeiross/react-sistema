import ValidateForm from '../validator'

describe('Login.ValidateForm', () => {
  it('ValidateForm returns data validation correctly when not exist the full data of the form', () => {
    const expected = {
      errors: {
        username: 'Campo obrigatório',
        password: 'Campo obrigatório'
      },
      isValid: false
    }

    expect(ValidateForm({
      username: '',
      password: ''
    })).toEqual(expected)
  })

  it('ValidateForm returns data validation correctly when exist the full data of the form', () => {
    const expected = {
      errors: {},
      isValid: true
    }

    expect(ValidateForm({
      username: 'username',
      password: 'password'
    })).toEqual(expected)
  })

  it('ValidateForm returns data validation correctly when exist the full data of the form', () => {
    const expected = {
      errors: {},
      isValid: false
    }

    expect(ValidateForm()).toEqual(expected)
  })

  it('ValidateForm returns data validation correctly when exist the full data of the form', () => {
    const expected = {
      errors: {},
      isValid: false
    }

    expect(ValidateForm({})).toEqual(expected)
  })
})
