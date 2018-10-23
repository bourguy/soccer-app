<template>
<div id="app">
<button id="btn" class="" v-on:click="populateQuiz">Get question</button>
  <h1>{{ quiz.title }}</h1>
  <!-- index is used to check with current question index -->
  <div v-for="(question, index) in quiz.questions">
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
  <div v-show="questionIndex === quiz.questions.length">
    <h2>
    Quiz finished
  </h2>
    <p>
      Total score: {{ score() }} / {{ quiz.questions.length }}
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
      age_ronaldo: 32,
      quiz: {
          title: 'My quiz',
            questions: 
              [{
                  text: "What's the age of Ronaldo?",
                  responses: [
                    {text: '22'}, 
                    {text: '', correct: true}, 
                  ]
                }, {
                  text: "Question 2",
                  responses: [
                    {text: 'Right answer', correct: true}, 
                    {text: 'Wrong answer'}, 
                  ]
                } ]
            },
    userResponses: Array(2).fill(false)
     
       }
  },
  // The view will trigger these methods on click
  methods: {
    populateQuiz: function() {
     
    this.quiz.questions[0].responses[1].text = this.age_ronaldo;
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

</style>