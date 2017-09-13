import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './page-mining.less';
import view from './page-mining.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the page-mining component'
  }
});

export default Component.extend({
  tag: 'page-mining',
  ViewModel,
  view
});
