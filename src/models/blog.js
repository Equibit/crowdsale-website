import DefineMap from 'can-define/map/map'
import DefineList from 'can-define/list/list'
import connect from 'can-connect'
import feathersClient from './feathers-client'
import feathersServiceBehavior from 'can-connect-feathers/service/service'
import behaviors from './behaviors'
import algebra from './algebra'

const Blog = DefineMap.extend('Blog', {
  id: 'any',
  title: 'string',
	shortPost: 'string',
	published: 'boolean',
	datetime: 'number',
	post: 'string',
	delta: 'string',
	author: 'string',
	linkTitle: 'string'
})

Blog.List = DefineList.extend({
  '#': Blog
})

Blog.connection = connect([
  feathersServiceBehavior,
  ...behaviors
], {
  Map: Blog,
  List: Blog.List,
  feathersService: feathersClient.service('blog'),
  name: 'blog',
  algebra
})

Blog.algebra = algebra

export default Blog