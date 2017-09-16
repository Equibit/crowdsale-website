import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-dash.less';
import view from './page-dash.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-dash component'
  }
});

export default Component.extend({
  tag: 'page-dash',
  ViewModel,
  view
});
