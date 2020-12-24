import request from '@/utils/request'

export default{

  list() {
    return request({
      baseURL: 'http://127.0.0.1:6110',
      url: '/api/zyb/professionalexam-project-result/list',
      method: 'get'
    })
  },
  pageList(page, limit, searchObj) {
    return request({
      baseURL: 'http://127.0.0.1:6110',
      url: `/api/hualaizyjk/blood/work-sheet/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(worckSheet) {
    return request({
      baseURL: 'http://127.0.0.1:6110',
      url: `/api/hualaizyjk/blood/work-sheet/logicRemove`,
      method: 'delete',
      data: worckSheet
    })
  },

  batchRemove(list) {
    return request({
      baseURL: 'http://127.0.0.1:6110',
      url: '/api/hualaizyjk/blood/work-sheet/batch-remove',
      method: 'delete',
      data: list
    })
  },

  getByPhysicalNum(physicalNum) {
    return request({
      baseURL: 'http://127.0.0.1:6110',
      url: `/api/hualaizyjk/blood/work-sheet/getByPhysicalNum/${physicalNum}`,
      method: 'get'
    })
  },

  updateById(teacher) {
    return request({
      baseURL: 'http://127.0.0.1:6110',
      url: `/admin/edu/teacher/update`,
      method: 'put',
      data: teacher
    })
  },
  save(workSheetVo) {
    return request({
      baseURL: 'http://127.0.0.1:6110',
      url: '/api/hualaizyjk/blood/work-sheet/save',
      method: 'post',
      data: workSheetVo
    })
  },
  // save(workSheetVo) {
  //   return request({
  //     baseURL: 'http://127.0.0.1:6110',
  //     url: '/api/hualaizyjk/blood/work-sheet/save',
  //     method: 'post',
  //     data: workSheetVo
  //   })
  // },
  // batchSave(workSheetVList) {
  //   return request({
  //     baseURL: 'http://127.0.0.1:6110',
  //     url: '/api/hualaizyjk/blood/work-sheet/batch-save',
  //     method: 'post',
  //     data: workSheetVList
  //   })
  // },
  batchSave(workSheetVList) {
    return request({
      baseURL: 'http://127.0.0.1:6110',
      url: '/api/hualaizyjk/blood/work-sheet/batch-save',
      method: 'post',
      data: workSheetVList
    })
  }
}
