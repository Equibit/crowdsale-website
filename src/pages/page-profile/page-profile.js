import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-profile.less';
import view from './page-profile.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-profile component'
  }
});

export default Component.extend({
  tag: 'page-profile',
  ViewModel,
  view
});
