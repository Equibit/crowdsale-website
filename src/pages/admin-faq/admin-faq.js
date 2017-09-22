import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './admin-faq.less';
import view from './admin-faq.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the admin-faq component'
  }
});

export default Component.extend({
  tag: 'admin-faq',
  ViewModel,
  view
});
