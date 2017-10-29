import fixture from 'can-fixture'
import Blog from '../blog'

const store = fixture.store([{
  id: 1,
  title: 'Some blog title',
  shortPost: 'This is the short info for the blog post',
  published: true,
  datetime: '1509289536',
  post: '<h1>some post</h1>',
  delta: '{"ops":[{"insert":"\\n"}]}',
  author: 'Marc',
  linkTitle: 'some-blog-title'
}, {
  id: 2,
  title: 'Some other blog title',
  shortPost: 'This is the short info for the blog post',
  published: false,
  datetime: '1509289536',
  post: '<h1>some other post</h1>',
  delta: '{"ops":[{"insert":"\\n"}]}',
  author: 'Marc',
  linkTitle: 'some-other-blog-title'
}], Blog.connection.algebra)

fixture('/arena/{id}', store)

export default store
