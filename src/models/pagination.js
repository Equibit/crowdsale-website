import DefineMap from 'can-define/map/map'

export default DefineMap.extend('Pagination', {
  skip: 'number',
  limit: 'number',
  total: 'number'
})
