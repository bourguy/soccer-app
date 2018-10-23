<template>
  <div class="hello">
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
        msg: 'One'
    }
  },
  mounted() {
      this.msg = 'Two';

      setTimeout(() => {            
        this.msg = 'Three';
      }, 3000);
  }
}
</script>