import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './admin-faq.less';
import view from './admin-faq.stache';

export const ViewModel = DefineMap.extend({
  appState: {
    type: 'any'
  }
});

export default Component.extend({
  tag: 'admin-faq',
  ViewModel,
  view
});
