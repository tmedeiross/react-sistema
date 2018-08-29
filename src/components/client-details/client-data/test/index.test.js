import ClientData from '../index'

const props = {
  zipCode: 'zip_value',
  address: 'address_value',
  number: 'zip_value',
  neighborhood: 'zip_value',
  city: 'zip_value',
  complement: 'zip_value',
  state: 'zip_value',
  socialName: '',
  personalCpf: '',
  email: '',
  phone1: '',
  dateBirth: '',
  image: '',
  errors: {}
}

describe('<ClientData />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<ClientData {...props} handleChange={() => {}} onImageCaptured={() => {}} />))
  })

  it('mount correctly', () => {
    expect(mount(<ClientData {...props} handleChange={() => {}} onImageCaptured={() => {}} />))
  })

  it('should render FormInfo, FormAddress and FormPicture components.', () => {
    const wrapper = mount(<ClientData {...props} handleChange={() => {}} onImageCaptured={() => {}} />)
    expect(wrapper.find('FormInfo').length).toBe(1)
    expect(wrapper.find('FormAddress').length).toBe(1)
    expect(wrapper.find('FormPicture').length).toBe(1)
  })
})
