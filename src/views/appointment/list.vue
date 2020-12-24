<template>
  <div class="app-container">

    <!--查询表单-->
    <el-form :inline="true">
      <el-form-item>
        <!-- <el-input v-model="searchObj.name" placeholder="讲师"/> -->
        <el-autocomplete
          v-model="searchObj.enterpriseName"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          class="inline-input"
          placeholder="企业名称"
          value-key="enterpriseName" />
      </el-form-item>

      <el-form-item>
        <!-- <el-input v-model="searchObj.name" placeholder="讲师"/> -->
        <el-autocomplete
          v-model="searchObj.appointmentName"
          class="inline-input"
          placeholder="预约人姓名"
          value-key="appointmentName" />
      </el-form-item>
      <el-form-item label="预约时间">
        <el-date-picker
          v-model="searchObj.appointmentDateBegin"
          placeholder="开始时间"
          value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="-">
        <el-date-picker
          v-model="searchObj.appointmentDateEnd"
          placeholder="结束时间"
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
      :data="list"
      border
      stripe
      @selection-change="handleSelectionChange">

      <el-table-column type="selection" />

      <el-table-column
        label="#"
        width="50">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="enterpriseName" label="企业名称" width="80" />
      <el-table-column prop="appointmentName" label="预约人姓名" />
      <el-table-column prop="phone" label="预约人电话" />
      <el-table-column prop="job" label="职务" />
      <el-table-column prop="requirement" label="需求" />
      <el-table-column prop="gmtAppointment" label="预约时间" width="160" />
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <router-link :to="'/appointment/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button
            size="mini"
            type="danger"
            @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20]"
      style="padding: 30px 0; text-align: center"
      layout="sizes, prev, pager, next, jumper, ->, total"
      @current-change="changeCurrentPage"
      @size-change="changePageSize"/>
  </div>
</template>

<script>
import appointmentApi from '@/api/appointment'

export default {

  data() {
    return {
      list: [], // 讲师列表
      total: 0, // 总记录数
      page: 1, // 页码
      limit: 5, // 每页记录数
      searchObj: {}, // 查询表单
      multipleSelection: [] // 批量选中的记录列表
    }
  },

  created() {
    this.fetchData()
  },

  methods: {

    // 调用api模块，加载讲师列表
    fetchData() {
      appointmentApi.pageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
      })
    },

    // 改编页码
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

    // 删除记录
    removeById(id) {
      // 询问是否删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return appointmentApi.removeById(id)
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
    },

    // 当表格中多选项发生变化的时候触发
    handleSelectionChange(selection) {
      this.multipleSelection = selection
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
      this.$confirm('此操作将永久删除这些数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 拿到选中数据
        const idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        return appointmentApi.batchRemove(idList)
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
    },

    // 输入建议
    querySearch(queryString, callback) {
      appointmentApi.selectNameListByKey(queryString).then(response => {
        callback(response.data.nameList)
      })
    }
  }
}
</script>
