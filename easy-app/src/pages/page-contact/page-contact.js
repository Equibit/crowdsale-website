import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-contact.less';
import view from './page-contact.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-contact component'
  }
});

export default Component.extend({
  tag: 'page-contact',
  ViewModel,
  view
});
