import FormLogin from '../form'

const func = () => {}

describe('<FormLogin />', () => {
  it('shallow redners correctly', () => {
    expect(shallow(
      <FormLogin
        handleSubmit={func}
        handleChange={func}
        errors={{}}
        username=''
        password=''
      />
    ))
  })

  it('mount correctly', () => {
    expect(mount(
      <FormLogin
        handleSubmit={func}
        handleChange={func}
        errors={{}}
        username=''
        password=''
      />
    ))
  })

  it('calls handleSubmit when the form is submited', () => {
    const handleSubmit = jest.fn()
    const wrapper = mount(
      <FormLogin
        handleSubmit={handleSubmit}
        handleChange={func}
        errors={{}}
        username=''
        password=''
      />
    )
    wrapper.find('form').simulate('submit')
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })

  it('calls handleChange when the input changes', () => {
    const handleChange = jest.fn()
    const wrapper = mount(
      <FormLogin
        handleSubmit={func}
        handleChange={handleChange}
        errors={{}}
        username=''
        password=''
      />
    )

    wrapper.find('input#username').simulate('change')
    expect(handleChange).toHaveBeenCalledTimes(1)

    handleChange.mockClear()

    wrapper.find('input#password').simulate('change')
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
