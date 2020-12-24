import request from '@/utils/request'

export default{

  list() {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: '/admin/edu/coolenterprise/list',
      method: 'get'
    })
  },

  pageList(page, limit, searchObj) {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: `/admin/edu/coolenterprise/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  getById(id) {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: `/admin/edu/coolenterprise/get/${id}`,
      method: 'get'
    })
  },

  removeById(id) {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: `/admin/edu/coolenterprise/remove/${id}`,
      method: 'delete'
    })
  },

  batchRemove(idList) {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: '/admin/edu/coolenterprise/batch-remove',
      method: 'delete',
      data: idList
    })
  },

  save(coolenterprise) {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: '/admin/edu/coolenterprise/save',
      method: 'post',
      data: coolenterprise
    })
  },

  updateById(coolEnterprise) {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: `/admin/edu/coolenterprise/update`,
      method: 'put',
      data: coolEnterprise
    })
  },

  selectNameListByKey(key) {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: `/admin/edu/coolenterprise/list/name/${key}`,
      method: 'get'
    })
  }
}
