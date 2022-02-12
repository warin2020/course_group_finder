<template>
  <div id="alert" :class="show?'anim':''" @animationend='show=false'>
    {{message}}
  </div>
</template>

<script>
export default {
  name: 'Alert',
  data () {
    return {
      message: 'haha',
      show: false
    }
  },
  methods: {
    showAlert (message) {
      this.message = message
      this.show = true
    }
  }
}
</script>

<style scoped>
#alert {
  width: 200px;
  height: 50px;
  line-height: 50px;
  background: white;
  border: 1px solid #c8c8c8;
  border-radius: 0.5em;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 999;
  opacity: 0;
}

.anim {
  animation: show 2s;
}

@keyframes show {
  0% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
