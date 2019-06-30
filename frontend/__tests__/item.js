import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';

const fakeItem = {
  id: 'Fake Item Id',
  title: 'Super Cool Item',
  price: 12500,
  description: 'This is a cool fake item for testing.',
  image: 'fakeItem.jpg,',
  largeImage: 'largeFakeItem.jpg',
}

describe('<Item/>', () => {
  it('Renders and displays properly', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem} />);
    console.log(wrapper.debug());
    
  })
})