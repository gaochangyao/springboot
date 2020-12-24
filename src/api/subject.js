import request from '@/utils/request'

export default {
  getNestedTreeList() {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: '/admin/edu/subject/nested-list',
      method: 'get'
    })
  }
}
