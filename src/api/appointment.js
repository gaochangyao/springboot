import request from '@/utils/request'

export default{
  list() {
    return request({
      baseURL: 'http://47.104.168.26:8110',
      url: '/admin/edu/appointment/list',
      method: 'get'
    })
  },
  getById(id) {
    return request({
      baseURL: 'http://47.104.168.26:8110',
      url: `/admin/edu/appointment/get/${id}`,
      method: 'get'
    })
  },
  pageList(page, limit, searchObj) {
    return request({
      baseURL: 'http://47.104.168.26:8110',
      url: `/admin/edu/appointment/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      baseURL: 'http://47.104.168.26:8110',
      url: `/admin/edu/appointment/remove/${id}`,
      method: 'delete'
    })
  },
  batchRemove(idList) {
    return request({
      baseURL: 'http://47.104.168.26:8110',
      url: '/admin/edu/appointment/batch-remove',
      method: 'delete',
      data: idList
    })
  },
  updateById(appointment) {
    return request({
      baseURL: 'http://47.104.168.26:8110',
      url: `/admin/edu/appointment/update`,
      method: 'put',
      data: appointment
    })
  },
  selectNameListByKey(key) {
    return request({
      baseURL: 'http://47.104.168.26:8110',
      url: `/admin/edu/appointment/list/name/${key}`,
      method: 'get'
    })
  }
}
