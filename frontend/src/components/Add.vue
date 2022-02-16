<template>
  <div>
    <Alert ref="alert"/>
    <div>
      <h1>添加新课程群</h1>
      <router-link to="/">返回</router-link>
    </div>
    <form>
      <label for="subject">课程科目：
        <input name="subject" v-model="form.subject" placeholder="请输入课程科目">
      </label>
      <div class="warning">{{warning.subject}}</div>
      <br>
      <label for="number">课程号码：
        <input name="number" v-model="form.number" placeholder="请输入课程号码">
      </label>
      <div class="warning">{{warning.number}}</div>
      <br>
      <label for="qrcode">群二维码：
        <input name="qrcode" type="file" accept="image/jpg image/jpeg image/png" @change="upload">
      </label>
      <div class="warning">{{warning.qrcode}}</div>
      <br>
      <button type="submit" @click.prevent="handleSubmit" :disabled="warning.subject !== '' || warning.number !== '' || warning.qrcode !== ''">提交</button>
    </form>
  </div>
</template>

<script>
import Alert from '@/components/Alert'

const INITIAL_DATA = {
  subject: '',
  number: '',
  qrcode: {
    name: '',
    file: null
  }
}

export default {
  name: 'Add',
  components: {
    Alert
  },
  data () {
    return {
      form: JSON.parse(JSON.stringify(INITIAL_DATA))
    }
  },
  computed: {
    warning () {
      return {
        subject: /^[A-Z]{3}$/.test(this.form.subject) ? '' : '课程科目需要为3个大写字母!',
        number: /^[0-9]{4}$/.test(this.form.number) ? '' : '课程科目需要为4个数字!',
        qrcode: this.form.qrcode.file ? '' : '群二维码不能为空!'
      }
    }
  },
  methods: {
    upload (e) {
      let file = e.target.files[0]
      this.form.qrcode = file ? {
        name: file.name,
        file: file
      } : {...INITIAL_DATA.qrcode}
    },
    handleSubmit () {
      let formData = new FormData()
      formData.append('subject', this.form.subject)
      formData.append('number', this.form.number)
      formData.append('qrcode', this.form.qrcode.file, this.form.qrcode.name)
      this.$request.post('/', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      }).then((response) => { console.log(response) })
      this.form = JSON.parse(JSON.stringify(INITIAL_DATA))
      this.$refs.alert.showAlert('提交成功')
    }
  }
}
</script>

<style scoped>
form {
  margin: 20px;
  padding: 20px;
  box-shadow: 0  10px  20px  0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: scroll;
}
input {
  width: 50vw;
}
button {
  align-self: center;
}
.warning {
  font-size: 0.5em;
  color: red;
}
</style>
