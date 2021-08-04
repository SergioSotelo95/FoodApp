import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Buscador from './components/Buscador';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from './store/index'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { expect } from 'chai';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import Landing from './components/Landing';
import Main from './components/Main';
import Form, {validate} from './components/Form';
import DetalleReceta from './components/DetalleReceta';
const { Provider, Consumer } = React.createContext("defaultValue");


Enzyme.configure({ adapter: new Adapter() })
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('<App /> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App store={store}/>);
  });

  it('has components within <Route /> tags', () => {
    expect(wrapper.find(Route)).to.have.lengthOf(4);
    expect(wrapper.find(Route).first()).to.have.prop('component');
    expect(wrapper.find(Route).first()).to.not.have.prop('render');
  });
});


describe('<CrearReceta />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Form/>
    );
  });
  it('Renderiza un <form>', () => {
    expect(wrapper.find('form')).toHaveLength(1)
  })
});
