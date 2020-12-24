import request from '@/utils/request'

export default {

  removeByVodId(id) {
    return request({
      baseURL: 'http://47.104.197.95:8130',
      url: `/admin/vod/media/remove/${id}`,
      method: 'delete'
    })
  }
}
