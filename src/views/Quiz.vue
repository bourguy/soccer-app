<template>
<div id="app-soccer">
<button id="btn" class="" v-on:click="populateQuiz">Get question</button>
  <h1>Are you a soccer star?</h1>
  <!-- index is used to check with current question index -->
  <div v-for="(question, index) in question">
    <!-- Hide all questions, show only the one with index === to current question index -->
    <div v-show="index === questionIndex">
      <h2>{{ question.text }}</h2>
      <ol>
        <li v-for="response in question.responses">
          <label>
            <!-- The radio button has three new directives -->
            <!-- v-bind:value sets "value" to "true" if the response is correct -->
            <!-- v-bind:name sets "name" to question index to group answers by question -->
            <!-- v-model creates binding with userResponses -->
            <input type="radio" 
                   v-bind:value="response.correct" 
                   v-bind:name="index" 
                   v-model="userResponses[index]"> {{response.text}}
          </label>
        </li>
      </ol>
      <!-- The two navigation buttons -->
      <!-- Note: prev is hidden on first question -->
      <button v-if="questionIndex > 0" v-on:click="prev">
        prev
      </button>
      <button v-on:click="next">
        next
      </button>
    </div>
  </div>
  <div v-show="questionIndex === question.length">
    <h2>
    Quiz finished
  </h2>
    <p>
      Total score: {{ score() }} / {{ question.length }}
    </p>
  </div>
</div>

</template>


 <!-- Load Vue script -->
  <script>

export default {
 name: 'Quiz',
  data() {
    return { 
      questionIndex: 0,
      answers,
      question:  
              [{
                  text: "",
                  responses: [
                    {text: ''},
                    {text: ''},
                    {text: ''}, 
                    {text: '', correct: true}, 
                  ]
                } 
              ],
    userResponses: Array(2).fill(false)
     
       }
  },
  // The view will trigger these methods on click
  methods: {
    populateQuiz: function() {
     
    this.question.text="blabla"; 
    this.question[0].responses[0].text = this.age_ronaldo;
      console.log(this.quiz.questions[0].responses[0].text);
       console.log(this.quiz.questions[0].responses[1].text);
      console.log(this.quiz.questions[0].text);
    },

    // Go to next question
    next: function() {
      this.questionIndex++;
    },
    // Go to previous question
    prev: function() {
      this.questionIndex--;
    },
    // Return "true" count in userResponses
    score: function() {
      return this.userResponses.filter(function(val) { return val }).length;
    }
  }
}
    
</script>


<style>

.good {
  background: green;
  color: #ffffff;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 0;
}

.bad {
  background: gray;
  color: #ffffff;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 0;
}

</style>