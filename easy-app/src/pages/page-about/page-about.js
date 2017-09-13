import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-about.less';
import view from './page-about.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-about component'
  }
});

export default Component.extend({
  tag: 'page-about',
  ViewModel,
  view
});
