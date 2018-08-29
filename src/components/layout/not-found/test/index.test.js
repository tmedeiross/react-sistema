import NotFound from '../index'

describe('<NotFound />', () => {
  it('shallow renders correctly', () => {
    expect(shallow(<NotFound />))
  })

  it('mount correctly', () => {
    expect(mount(<NotFound />))
  })
})
