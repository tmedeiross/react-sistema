import FormPicture from '../index'

const props = {
  image: 'image',
  state: 'zip_value',

  errors: {}
}

describe('<FormPicture />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(
      <FormPicture {...props} onImageCaptured={() => {}} />
    ))
  })

  it('shallow mount correctly', () => {
    expect(mount(
      <FormPicture {...props} onImageCaptured={() => {}} />
    ))
  })
})
