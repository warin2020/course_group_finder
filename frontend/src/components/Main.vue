<template>
  <div class="container">
    <div class="head">
      <h1>CUHKSZ课程群查找器</h1>
      <router-link to="add">添加新课程群</router-link>
    </div>
    <div class="form">
      <label class="input">
        课程科目：
        <input v-model="subject" placeholder="请输入课程科目">
      </label>
      <br>
      <label class="input">
        课程号码：
        <input v-model="number" placeholder="请输入课程号码">
      </label>
    </div>
    <div class="list">
      <div v-for="(item, i) in data" :key="i" class="item" v-show="(subject === '' || item.subject === subject) && (number === '' || item.number === number)">
        <h2 class="header">{{item.subject + item.number}}</h2>
        <hr>
        <div class="img-container">
          <img class="image" :src="$request.defaults.baseURL + '/qrcodes/' + item.subject + item.number + '-' + item.qrcode" alt="二维码无法加载" style="width: 500px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      subject: '',
      number: '',
      data: []
    }
  },
  mounted () {
    this.$request.get('/courses.json')
      .then(response => {
        console.log(response)
        this.data = response.data.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item {
  width: 80vw;
  height: 50vh;
  margin: 20px;
  padding: 10px;
  box-shadow: 0  10px  20px  0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: scroll;
}
.image-container {
  max-width: 100%;
}
</style>
