<template>
  <div id="app_soccer">
    <header>
      <span>Are you a soccer star?</span>
    </header>
    <main>

    <button id="btn" class="" v-on:click="getPlayer">Get question</button>

    <div v-if="loading">
    <img src="../assets/loader_soccer.gif"/>
    Loading.....
    </div>

    <div class="wrapper">
    <div class="question">
        {{ question }} 
    </div>
    <div class="answer">
        <div v-bind:class="{ good: goodAnswer}">
        {{ answer }} 
        </div>
    </div>
    <div> 
        <div class="bad">
        {{ answerAlt[0] }} 
        </div>
        <div class="bad">
        {{ answerAlt[1] }} 
        </div>
        <div class="bad">
        {{ answerAlt[2] }} 
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
      player: [],
      playerName: "",
      question: "",
      answer: "",
      goodAnswer: true,
      answerAlt: [],
      loading: false
    }
  }, 
  methods: {
    randomIntFromInterval: function(min,max)
      {
      return Math.floor(Math.random()*(max-min+1)+min);
      },
    
    getPlayer: function () {
      this.loading = true;
  
      axios.defaults.headers.common['X-Auth-Token'] = "a3192df351cd41f3bc684356d650d85b";

      const random_number = this.randomIntFromInterval(1,300);
       console.log("player id:" + random_number);
      const api_url = "https://api.football-data.org/v2/players/" + random_number.toString();

      axios.get(api_url)

      .then((response)  =>  {
        this.loading = false;
        this.player = response.data;

    /*    
    "name": "Marcelo",
    "firstName": "Marcelo",
    "lastName": null,
    "dateOfBirth": "1988-05-12",
    "countryOfBirth": "Brazil",
    "nationality": "Brazil",
    "position": "Defender",
    "shirtNumber": 12,
    */

        this.playerName = this.player.name;
        const year = this.player.dateOfBirth.substr(0, 4);

        const random_number2 = this.randomIntFromInterval(0,10);
       
        console.log(this.playerName);

        switch (random_number2) {
          case 0:
            this.question = "Which number does " + this.playerName +" wear?";
            this.answer = this.player.shirtNumber;
          break;

          case 1:
            //const year = this.player.dateOfBirth.substr(0, 4);
            //age_player = 2018-year.parseInt();
            //this.question = "What is "+ this.playerName +"'s age?";
            //this.answer = age_player;
          break;

          default:
            //const year = this.player.dateOfBirth.substr(0, 4);
            const age_player = 2018-parseInt(year);
            this.question = "What is "+ this.playerName +"'s age?";
            this.answer = age_player;
            console.log("age joueur" + age_player);
            const possible_answers = [age_player - 4, age_player - 3, age_player - 2, age_player - 1, age_player + 1, age_player + 2, age_player + 3, age_player + 4]
            console.log("possible answers" + possible_answers);
            this.answerAlt = [];

            for (let i = 0; i < 3; i++) { 

              const num = this.randomIntFromInterval(0,7-i);
              this.answerAlt[i] = possible_answers[num];
              console.log(num);
              console.log("choix"+ i + this.answerAlt);
              var removed = possible_answers.splice(num,1);
              console.log("choix restants" + possible_answers);
              }

           console.log("all answers" + this.answerAlt);   
          break;
        }


      }, (error)  =>  {
        this.loading = false;
      })
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
  padding-top: 32px;
} 

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