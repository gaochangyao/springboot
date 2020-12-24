<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="企业名称">
        <el-input v-model="appointment.enterpriseName" />
      </el-form-item>

      <el-form-item label="预约人姓名">
        <el-input v-model="appointment.appointmentName"/>
      </el-form-item>
      <el-form-item label="预约人电话">
        <el-input v-model="appointment.phone" type="textarea"/>
      </el-form-item>
      <el-form-item label="预约人职务">
        <el-input v-model="appointment.job" type="textarea"/>
      </el-form-item>
      <el-form-item label="需求">
        <el-input v-model="appointment.requirement" type="textarea"/>
      </el-form-item>
      <el-form-item label="预约时间">
        <el-date-picker v-model="appointment.gmtAppointment" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="appointment.sort" :min="0"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import appointmentApi from '@/api/appointment'

export default {

  data() {
    return {
      // 讲师对象
      appointment: {
        sort: 0,
        level: 1
      },
      saveBtnDisabled: false // 默认按钮可用
    }
  },

  created() {
    console.log('form created被执行')

    if (this.$route.params.id) {
      this.fetchDataById(this.$route.params.id)
    }
  },

  methods: {
    saveOrUpdate() {
      console.log(this.appointment)
      this.saveBtnDisabled = true
      if (!this.appointment.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 数据保存
    saveData() {
      appointmentApi.save(this.appointment).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/appointment' })
      })
    },

    // 数据更新
    updateData() {
      appointmentApi.updateById(this.appointment).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/appointment' })
      })
    },

    // 根据id查询数据
    fetchDataById(id) {
      this.appointment = 123
      appointmentApi.getById(id).then(response => {
        this.appointment = 123
        this.appointment = response.data.item
      })
    },

    // 文件上传成功
    handleAvatarSuccess(response) {
      if (response.success) {
        this.appointment.avatar = response.data.url
        // 强制重新渲染
        // this.$forceUpdate()
      } else {
        this.$message.error('上传失败! （非20000）')
      }
    },

    // 文件上传失败（http）
    handleAvatarError() {
      this.$message.error('上传失败! （http失败）')
    },

    // 文件上传前的校验
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' // MIME
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
