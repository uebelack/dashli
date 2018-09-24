import React from 'react';
import { mount } from 'enzyme';

import ValueWidget from '.';

describe('<ValueWidget/>', () => {
  it('renders without crashing', () => {
    mount(<ValueWidget />);
  });

  it('should update font size', () => {
    const wrapper = mount(<ValueWidget value="5000" />);
    wrapper.instance().updateFontSize(undefined);
    wrapper.instance().updateFontSize({
      querySelector: () => ({
        offsetWidth: 500,
        offsetHeight: 200,
      }),
      offsetWidth: 200,
      offsetHeight: 100,
    });

    wrapper.update();

    expect(wrapper.find('.dashboard-value-widget-value').at(0).props().style).toEqual({ fontSize: '16px', lineHeight: '16px' });

    wrapper.instance().updateFontSize({
      querySelector: () => ({
        offsetWidth: 50,
        offsetHeight: 20,
      }),
      offsetWidth: 200,
      offsetHeight: 100,
    });

    wrapper.update();

    expect(wrapper.find('.dashboard-value-widget-value').at(0).props().style).toEqual({ fontSize: '160px', lineHeight: '160px' });
  });

  it('should not render additional value if not set', () => {
    const wrapper = mount(<ValueWidget value="5000" />);
    expect(wrapper.find('.dashboard-value-widget-additional-value').length).toBe(0);
  });

  it('should render additional value if set', () => {
    const wrapper = mount(<ValueWidget value="5000" additionalValue="Test" />);
    expect(wrapper.find('.dashboard-value-widget-additional-value').length).toBe(2);
  });
});
