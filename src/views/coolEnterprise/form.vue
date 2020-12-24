<template>
  <div class="app-container">
    <!-- 输入表单 -->
    <el-form label-width="120px">
      <el-form-item label="酷企业名称">
        <el-input v-model="coolEnterprise.name" />
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker v-model="coolEnterprise.joinDate" value-format="yyyy-MM-dd" />
      </el-form-item>
      <el-form-item label="酷企业排序">
        <el-input-number v-model="coolEnterprise.sort" :min="0"/>
      </el-form-item>
      <el-form-item label="酷企业头衔">
        <el-select v-model="coolEnterprise.level">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
            -->
          <el-option :value="1" label="优秀酷企业"/>
          <el-option :value="2" label="行业签约酷企业"/>
        </el-select>
      </el-form-item>
      <el-form-item label="酷企业简介">
        <el-input v-model="coolEnterprise.intro"/>
      </el-form-item>
      <el-form-item label="酷企业资历">
        <el-input v-model="coolEnterprise.career" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 酷企业头像 -->
      <el-form-item label="酷企业简介">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
          :action="'http://localhost:8120/admin/oss/file/upload?module=avatar'"
          class="avatar-uploader">
          <img v-if="coolEnterprise.avatar" :src="coolEnterprise.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import coolEnterpriseApi from '@/api/coolEnterprise'

export default {

  data() {
    return {
      // 酷企业对象
      coolEnterprise: {
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
      console.log(this.coolEnterprise)
      this.saveBtnDisabled = true
      if (!this.coolEnterprise.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },

    // 数据保存
    saveData() {
      coolEnterpriseApi.save(this.coolEnterprise).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/coolEnterprise' })
      })
    },

    // 数据更新
    updateData() {
      coolEnterpriseApi.updateById(this.coolEnterprise).then(response => {
        // 弹出成功提示
        this.$message({
          message: response.message,
          type: 'success'
        })
        this.$router.push({ path: '/coolEnterprise' })
      })
    },

    // 根据id查询数据
    fetchDataById(id) {
      coolEnterpriseApi.getById(id).then(response => {
        this.coolEnterprise = response.data.item
      })
    },

    // 文件上传成功
    handleAvatarSuccess(response) {
      if (response.success) {
        this.coolEnterprise.avatar = response.data.url
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
