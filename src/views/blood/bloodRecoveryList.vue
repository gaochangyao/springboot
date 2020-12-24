<template>
  <div>
    <el-button @click="add">新增</el-button>
    <el-button @click="save">保存</el-button>
    <el-form id="table-form" ref="form" :rules="rules" :model="form">
      <el-table ref="table" :data="form.tableData" border>
        <el-table-column>
          <template slot="header">
            <p>
              姓名
              <span style="color:red;font-size:16px;">*</span>
            </p>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop=" 'tableData.' + scope.$index + '.name' " :rules="rules.name">
              <el-input v-model="scope.row.name" @keyup.native.enter="nextFocus($event,scope.row)"/>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header">
            <p>
              年龄
              <span style="color:red;font-size:16px;">*</span>
            </p>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop=" 'tableData.' + scope.$index + '.age' " :rules="rules.age">
              <el-input
                v-model.number="scope.row.age"
                type="number"
                @keyup.native.enter="nextFocus($event,scope.row)"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="身高">
          <template slot-scope="scope">
            <el-form-item>
              <el-input
                v-model.number="scope.row.height"
                type="number"
                @keyup.native.enter="nextFocus($event,scope.row)"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="年龄+身高" prop="other" />
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputDoms: '',
      tableIndex: 0,
      form: {
        tableData: []
      },
      rules: {
        name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
        age: [{ required: true, message: '年龄不能为空', trigger: 'blur' }]
      }
    }
  },
  watch: {
    'form.tableData': {
      handler(val) {
        val.forEach(item => {
          item.other = item.age + item.height
        })
      },
      deep: true
    }
  },
  created() {
    this.$nextTick(() => {
      this.initInputDOM()
    })
  },
  methods: {
    initInputDOM() {
      const inputDoms = document.querySelectorAll(
        '#table-form .el-input__inner'
      )
      inputDoms.forEach((item, index) => {
        item.setAttribute('data-index', index)
      })
      this.inputDoms = inputDoms
    },
    nextFocus(event, row) {
      const index = event.target.getAttribute('data-index')
      const nextIndex = parseInt(index) + 1
      const length = this.inputDoms.length
      if (nextIndex < length) {
        this.inputDoms[nextIndex].focus()
      } else {
        this.inputDoms[0].focus()
      }
    },
    add() {
      this.form.tableData.push({
        name: '',
        age: '',
        height: '',
        other: ''
      })
      this.$nextTick(() => {
        this.initInputDOM()
      })
    },
    del(index) {
      this.form.tableData.splice(index, 1)
    },
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('通过')
          console.log(this.form.tableData)
        }
      })
    }
  }
}
</script>
