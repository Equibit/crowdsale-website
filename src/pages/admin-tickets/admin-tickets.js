import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './admin-tickets.less';
import view from './admin-tickets.stache';

export const ViewModel = DefineMap.extend({
  message: {
    value: 'This is the admin-tickets component'
  }
});

export default Component.extend({
  tag: 'admin-tickets',
  ViewModel,
  view
});
