<template>

<div id="app">
 <h1> {{ message }}  </h1>

<div class="answer" v-for="(answer, index) in answers">

<div v-bind:id="index" v-on:click="makeActive" v-bind:class="classObject">TESTs</div>
</div>


</div>

</template>

<script>


export default {
  name: 'About',
  data () {
    return {
        message: 'Old value',
        isActive: false,
        error: null,
        answers: [
                {text: '0', correct: false, id: 0},
                {text: '1', correct: false, id: 1},
                {text: '2', correct: false, id: 2}, 
                {text: '3', correct: true, id: 3}, 
                ],
    }
  }, 
  methods: {

          setNewValue: function () {
            this.message = 'New value';   
          },

          makeActive: function () {
                  this.isActive = !this.isActive;  
                }
  },

computed: {
  classObject: function () {
      if (this.isActive)
        {
        var target = event.target || event.srcElement;
        var id = target.id;
      console.log(id);

      }
    return {
      active: this.isActive,
      bad1: !this.isActive
     // 'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
}



</script>


<style>
.active {
  background: green;
    font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
}

.bad1 {
  background: red;
    font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
}
</style>