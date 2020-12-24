<template>
  <div
    v-loading="loading"
    class="app-container"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <!--查询表单-->
    <el-form :inline="true">

      <el-form-item label="测试时间">
        <el-date-picker
          v-model="searchObj.testTime"
          placeholder="测试时间"
          value-format="yyyy-MM-dd" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <!-- 工具条 -->
    <div style="margin-bottom: 10px;">
      <el-button type="danger" size="mini" @click="batchRemove()">批量删除</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      :data="list"
      border
      stripe
      style="width: 100%"
      height="550"
      @selection-change="handleSelectionChange">

      <el-table-column label="试管条形码" prop="physicalNum" width="210">
        <template slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-input
            :ref="scope.row.uuid"
            v-model="scope.row.physicalNum"
            maxlength="13"
            placeholder="请试管条形码"
            show-word-limit
            @focus="clearPhy(scope.row,scope.$index)"
            @keydown.native="validateCounts(scope.row,scope.$index, $event)"
            @input="getNameByPhysicalNum(scope.$index,scope.row)" />
        </template>
      </el-table-column>
      <el-table-column prop="personName" label="姓名" width="70" />
      <el-table-column label="操作" width="78">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="save(scope.$index)">单传</el-button>
        </template>
      </el-table-column>
      <el-table-column type="selection" />
      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="sampleNo" label="取样编号" width="50" />
      <el-table-column prop="testTime" label="测试时间" width="100" />
      <el-table-column prop="name" label="姓名" width="100" />
      <el-table-column prop="patientNo" label="历史条码-如成功上传过" width="100" />
      <el-table-column prop="hgb" label="血红蛋白" width="70" />
      <el-table-column prop="lymCount" label="淋巴细胞数目" width="60" />
      <el-table-column prop="lymPercent" label="淋巴细胞百分比" width="60" />
      <el-table-column prop="wbc" label="白细胞数目" width="60" />
      <el-table-column prop="plt" label="血小板数目" width="70" />
      <el-table-column prop="neuCount" label="中性粒细胞数目" width="60" />
      <el-table-column prop="neuPercent" label="中性粒细胞百分比" width="60" />
      <el-table-column prop="rbc" label="红细胞数目" width="60" />
      <el-table-column prop="eosCount" label="嗜酸性粒细胞计数" width="60" />
      <el-table-column label="操作" width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="logicRemoveById(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footerTwo">
      <!--批量上传表单-->
      <el-form :inline="true">
        <el-form-item label="起始序号" prop="physicalNum" width="50">
          <el-input
            v-model="batchUploadObj.startNum"/>
        </el-form-item>
        <el-form-item label="终止序号" prop="physicalNum" width="50">
          <el-input
            v-model="batchUploadObj.endNum"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="batchUploadData()">批量上传</el-button>
        </el-form-item>
        <el-tag
          size="medium"
          style="font-size:20px;margin-top:6px;"
          color="black"
          effect="dark">技术支持电话：高，13181399107,微信：13053491928，有问题请及时反馈</el-tag>
      </el-form>

      <!-- 分页组件 -->
      <el-pagination
        :current-page="page"
        :total="total"
        :page-size="limit"
        :page-sizes="[10,100,200,300,500]"
        style="padding: 30px 0; text-align: center"
        layout="sizes, prev, pager, next, jumper, ->, total"
        @current-change="changeCurrentPage"
        @size-change="changePageSize"/>

    </div>
  </div>
</template>

<script>
import bloodApi from '@/api/blood'

export default {

  data() {
    return {
      list: [], // 结果列表,包括条码，姓名，各类结果
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 300, // 每页记录数
      searchObj: { testTime: new Date() }, // 查询表单
      multipleSelection: [], // 批量选中的记录列表
      workSheet: {},
      batchUploadObj: {},
      batchUploadList: [],
      loading: false
    }
  },

  created() {
    this.fetchData()
    this.searchObj.testTime = this.searchObj.testTime.getFullYear() + '-' + (this.searchObj.testTime.getMonth() + 1) + '-' +
      this.searchObj.testTime.getDate()
  },

  methods: {
    // 调用api模块，加载讲师列表
    fetchData() {
      console.log(this.searchObj.testTime)
      bloodApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },
    // 改表页码
    changeCurrentPage(page) {
      console.log('changeCurrentPage:' + page)
      this.page = page
      this.fetchData()
    },

    // 改变每页记录数
    changePageSize(size) {
      console.log('changePageSize:' + size)
      this.limit = size
      this.fetchData()
    },

    // 重置表单
    resetData() {
      this.searchObj = {}
      this.fetchData()
    },
    // 回车换行
    validateCounts(row, index, e) {
      var keyCode = e.keyCode || e.which || e.charCode
      if (keyCode === 13) {
        index = index + 1
        this.$refs[row.uuid].blur()
        if (!(Object.keys(this.$refs).length - 1 === index)) {
          this.$refs[Object.keys(this.$refs)[index + 1]].focus()
        }
        this.$refs[Object.keys(this.$refs)[index + 1]].focus()
      }
    },
    // 清除所有聚焦的数据
    clearPhy(row, index) {
      if (row.physicalNum != null) {
        if (row.physicalNum.length < 12) {
          this.list[index].physicalNum = ''
        }
      }
    },
    // 根据条码号获取姓名,输入13个数换行
    getNameByPhysicalNum(index, row) {
      console.log(index)
      if (row.physicalNum != null) { // 不为空才去执行，如果变一个数就执行这样计算量有点大
        if (row.physicalNum.length === 13) { // 不为空了，如果是13位了，继续执行
          this.loading = true
          bloodApi.getByPhysicalNum(row.physicalNum).then(response => { // 发送ajax
            this.list[index].personName = response.data.item // 此行的姓名改变
            // 如果此行的姓名不为空，索引不是最后一行 就更新名字并且聚焦下一行
            console.log('shishenme' + index) //
            console.log('shishenmeaaaa' + Object.keys(this.$refs).length)
            // 148 151 倒数第二行之前length比index大3   倒数第二行比index大2.。。为什么呢
            if (this.list[index].personName !== null && Object.keys(this.$refs).length - 2 !== index) {
              this.$refs[row.uuid].blur() // blur()从当前行（根据uuid去找的,uuid是key）移开焦点
              this.loading = false
              this.$refs[Object.keys(this.$refs)[index + 2]].focus() // 就聚焦下一行
              // 如果此行的姓名不为空，索引是最后一行 就只更新名字不聚焦下一行
            } else if (this.list[index].personName !== null && Object.keys(this.$refs).length - 2 === index) {
              this.loading = false
            }
          })
          this.loading = false
        }
      }
    },
    // 批量删除
    batchRemove() {
      // 判断是否选中记录
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择要删除的记录'
        })
        return
      }

      // 询问是否删除
      this.$confirm('此操作将删除这些数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 拿到选中数据
        // const workSheetList = []
        // this.multipleSelection.forEach(item => {
        //   idList.push(item)
        // })
        this.loading = true
        return bloodApi.batchRemove(this.multipleSelection)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.loading = false
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    },
    batchUploadData() {
      this.$confirm('此操作将上传该行结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        var j = this.batchUploadObj.startNum - ((this.page - 1) * this.limit)
        var k = this.batchUploadObj.endNum - ((this.page - 1) * this.limit)
        for (var i = 1; i <= this.list.length; i++) {
          if (i >= j && i <= k) {
            this.batchUploadList.push(this.list[i - 1])
          }
        }
        return bloodApi.batchSave(this.batchUploadList)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.loading = false
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消上传'
          })
        }
      })
    },
    // 上传结果
    save(index) {
      // 询问是否删除
      this.$confirm('此操作将上传该行结果, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        return bloodApi.save(this.list[index])
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.loading = false
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消上传'
          })
        }
      })
    },
    // 当表格中多选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
    },
    // 删除记录
    logicRemoveById(index) {
      this.workSheet = this.list[index]
      // 询问是否删除
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return bloodApi.removeById(this.workSheet)
      }).then(response => {
        // 刷新页面
        this.fetchData()
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
        if (err === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
      })
    }
  }
}
</script>
