import request from '@/utils/request'

export default{

  list() {
    return request({
      baseURL: 'http://127.0.0.1:6112',
      url: '/api/hualaizyjk/bio/dr-test-app/listAll',
      method: 'get'
    })
  },
  pageList(page, limit, searchObj) {
    return request({
      baseURL: 'http://127.0.0.1:6112',
      url: `/api/hualaizyjk/bio/dr-test-app/list-page/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  // removeById(worckSheet) {
  //   return request({
  //     baseURL: 'http://127.0.0.1:6112',
  //     url: `/api/hualaizyjk/blood/work-sheet/logicRemove`,
  //     method: 'delete',
  //     data: worckSheet
  //   })
  // },

  // batchRemove(list) {
  //   return request({
  //     baseURL: 'http://127.0.0.1:6112',
  //     url: '/api/hualaizyjk/blood/work-sheet/batch-remove',
  //     method: 'delete',
  //     data: list
  //   })
  // },

  save(workSheetVo) {
    return request({
      baseURL: 'http://127.0.0.1:6112',
      url: '/api/hualaizyjk/bio/dr-test-app/save',
      method: 'post',
      data: workSheetVo
    })
  },

  getByPhysicalNum(physicalNum) {
    return request({
      baseURL: 'http://127.0.0.1:6112',
      url: `api/hualaizyjk/bio/dr-test-app/getByPhysicalNum/${physicalNum}`,
      method: 'get'
    })
  },

  updateById(teacher) {
    return request({
      baseURL: 'http://127.0.0.1:6112',
      url: `/admin/edu/teacher/update`,
      method: 'put',
      data: teacher
    })
  },
  batchSave(workSheetVList) {
    return request({
      baseURL: 'http://127.0.0.1:6112',
      url: '/api/hualaizyjk/bio/dr-test-app/batch-save',
      method: 'post',
      data: workSheetVList
    })
  }
}
