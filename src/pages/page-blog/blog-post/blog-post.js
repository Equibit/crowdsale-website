import Component from 'can-component'
import DefineMap from 'can-define/map/map'
import './blog-post.less'
import view from './blog-post.stache'
import Blog from '~/models/blog'

export const ViewModel = DefineMap.extend({
  post: {
    Type: Blog
  },
	linkTitle: 'string',
	loadingBlog: {
    value: true
  }
})

export default Component.extend({
  tag: 'blog-post',
  ViewModel,
  view,
	events: {
		inserted: function(){
			Blog.get(this.viewModel.linkTitle)
				.then(blog => {
					this.viewModel.post = blog
					setTimeout(() => this.viewModel.loadingBlog = false, 25)
				})
				.catch(err => console.log(err))
		}
	}
})
