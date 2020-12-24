import request from '@/utils/request'

export function getList(params) {
  return request({
    baseURL: 'http://47.104.168.26:9110',
    url: '/table/list',
    method: 'get',
    params
  })
}
