import ItemComponent from '../components/Item';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json'

const fakeItem = {
  id: 'Fake Item Id',
  title: 'Super Cool Item',
  price: 12500,
  description: 'This is a cool fake item for testing.',
  image: 'fakeItem.jpg',
  largeImage: 'largeFakeItem.jpg',
}

describe('<Item/>', () => {
  it('renders and matches the snapshot', () => {
    const wrapper = shallow(<ItemComponent item={fakeItem}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  // it('Renders the image propery', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const img = wrapper.find('img')
  //   expect(img.props().src).toBe(fakeItem.image);    
  //   expect(img.props().alt).toBe(fakeItem.title);   
  // })

  // it('Renders price tag and title properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   // console.log(wrapper.debug());  
  //   expect(wrapper.find('a').text()).toBe('Super Cool Item - $125'); 
  // })

  // it('Renders out buttons properly', () => {
  //   const wrapper = shallow(<ItemComponent item={fakeItem} />);
  //   const buttonList = wrapper.find('.buttonList');
  //   expect(buttonList.children()).toHaveLength(3);
  //   expect(buttonList.find('Link').exists()).toBe(true);
  //   expect(buttonList.find('AddToCart').exists()).toBe(true);
  //   expect(buttonList.find('DeleteItem').exists()).toBe(true);
  // })
})