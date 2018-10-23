<template>
  <div id="app_soccer">
    <header>
      <span>Are you a soccer star?</span>
    </header>
    <main>

    <button id="btn" class="" v-on:click="getQuestion">Get question</button>

    <!--div v-if="loading">
    <img src="../assets/loader_soccer.gif"/>
    </div-->

   <div v-show="isQuestion[0]" id="wrapper" class="wrapper">
        <div class="question">
            {{ question }} 
        </div>
       <div class="answer" v-for="(answer, index) in answers">
            <!--div v-on:click="validateAnswer" v-bind:class="getClass(answer,index)"-->
            <div v-on:click="validateAnswer" v-bind:class="validateAnswer(answer,index)">
              {{ answer.text }} 
            </div>
        </div> 
       </div>


    </main>
  </div>
</template>


<script>

import axios from 'axios';
  
export default {
  name: 'app_soccer',
  
  data () {
    return {
      step: 0,
      initialize: [0,0,0,0,0],
      success: [],
      isQuestion: [true,false],
      isAnswered: [false,false,false,false,false],
      player: [],
      playerName: "",
      question: "",
      answers: [
                {text: '', correct: false},
                {text: '', correct: false},
                {text: '', correct: false}, 
                {text: '', correct: false}, 
                ],
      //loading: false
    }
  }, 
  methods: {

    removeElement: function (elementId) {
      // Removes an element from the document
      var element = document.getElementById(elementId);
      console.log(element);
      element.parentNode.removeChild(element);
      }, 

    randomIntFromInterval: function(min,max)
      {
      return Math.floor(Math.random()*(max-min+1)+min);
      },

    validateAnswer: function(answer,index){
      
      this.initialize[this.step] += 1; 
      //console.log(index);
      //console.log(answer.text);
      //console.log(answer.correct);
      console.log("on est dans getclass"+this.initialize[this.step]);
      

      if (this.initialize[this.step] === 1)
        {  
            this.class_answer = "good";
            
            this.success[this.step] = true;    

            this.isAnswered = true;
            setTimeout( () => {
              
                  console.log("success to "+this.step);
                  this.success[this.step] = true;
                  this.step+= 1;

                  setTimeout( () => {
                      this.removeElement("wrapper");
                    }, 2500);
            
                  setTimeout( () => {
                      this.isQuestion[this.step] = true;
                      //this.getQuestion();
                    }, 2500);

                }, 2500);
      
        
        
            this.getQuestion();

    
            console.log(this.question);

          } 
      else if (this.isAnswered[this.step] && !answer.correct) 
          {
          this.class_answer = "bad";
          this.success[this.step] = false   
          this.initialize[this.step] = 0
           console.log("fail to "+this.step);  
          this.getQuestion();  
          console.log(this.question);
          } 
      else 
          {
          this.class_answer = "unanswered" 
          }
     
     
     return this.class_answer;

    },
    
    getQuestion: function () {
      //this.loading = true;
      //this.isAnswered[this.step] = false;
      this.question= "",
      this.answers= [
                {text: '', correct: false},
                {text: '', correct: false},
                {text: '', correct: false}, 
                {text: '', correct: false}, 
                ],


      axios.defaults.headers.common['X-Auth-Token'] = "a3192df351cd41f3bc684356d650d85b";

      const random_number = this.randomIntFromInterval(1,300);
       console.log("player id:" + random_number);
      const api_url = "https://api.football-data.org/v2/players/" + random_number.toString();

      /*
      axios.get(api_url)

      .then((response)  =>  {
        this.loading = false;
        this.player = response.data;
      */

        
    this.player.name = "Marcelo"
    //"firstName": "Marcelo",
    //"lastName": null,
    this.player.dateOfBirth = "1988-05-12"
    //"countryOfBirth": "Brazil",
    //"nationality": "Brazil",
    //"position": "Defender",
    this.player.shirtNumber = 12;
    
    if (this.isQuestion2 === true)
      {      
      this.player.name = "Messi" 
      this.player.dateOfBirth = "1985-05-12";
      }
;

        this.playerName = this.player.name;
        const year = this.player.dateOfBirth.substr(0, 4);

        const random_number2 = this.randomIntFromInterval(0,10);
       
        console.log(this.playerName);

        switch (random_number2) {
          //case 0:
            //this.question = "Which number does " + this.playerName +" wear?";
            //this.answer = this.player.shirtNumber;
          //break;

          default:
            //const year = this.player.dateOfBirth.substr(0, 4);
            const age_player = 2018-parseInt(year);
            this.question = "What is "+ this.playerName +"'s age?";
            this.answers[3].text = age_player;
           // console.log("age joueur" + age_player);
            const possible_answers = [age_player - 4, age_player - 3, age_player - 2, age_player - 1, age_player + 1, age_player + 2, age_player + 3, age_player + 4]
           // console.log("possible answers" + possible_answers);

            for (let i = 0; i < 3; i++) { 

              const num = this.randomIntFromInterval(0,7-i);
              this.answers[i].text = possible_answers[num];
           //   console.log(num);
           //   console.log("choix"+ i + this.answers[i].text);
              var removed = possible_answers.splice(num,1);
           //   console.log("choix restants" + possible_answers);
              this.answers[i].correct = false; 
              }

          // console.log("all answers" + this.answers[0].text + this.answers[1].text+ this.answers[2].text+ this.answers[3].text);   
          
          this.answers[3].correct = true; 

          this.answers.sort(function (a, b) {
              return a.text - b.text;
          });

          
         // console.log("all answers" + this.answers[0].text + this.answers[1].text+ this.answers[2].text+ this.answers[3].text);   
          

          break;
        }

// 3 lignes a rajouter quand api is back!!!!!!
      //}, (error)  =>  {
        //this.loading = false;
     // })
    }
  }, 
}


</script>

<style>
  body {
  margin: 0;
}


main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

#app_soccer {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}


button {
  background: #51B767;
  color: #ffffff;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 0;
}

.question {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 32px;
} 

.answer {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 600;
  box-sizing: border-box;
} 

.good {
  background: green;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 2;
}

.bad {
  background: red;
  color: #ffffff;
  padding: 15px;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  border: 0;
  border-style: solid;
}

unanswered
{
  background: grey;
}
</style>