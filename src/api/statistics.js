import request from '@/utils/request'

export default {

  createStatistics(day) {
    return request({
      baseURL: 'http://47.104.168.26:9110',
      url: `/admin/statistics/daily/create/${day}`,
      method: 'post'
    })
  }
}
