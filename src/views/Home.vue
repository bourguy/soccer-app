<template>
  <div id="app_soccer">
    <header>
      <span>Are you a soccer star?</span>
    </header>
    <main>

    <div class="fixed_width">
    <button v-if="!victory && !start" id="btn" class="button" v-on:click="getQuestion">Start quiz</button>

      <div v-for="(question, index) in questions" v-if="isQuestion[index]" v-bind:id="`wrapper${step}`">
        <div class="question" v-bind:id="`question${step}`">
            {{ question.text }} 
        </div>
        <div v-if="start" v-for="(answer, index) in answers" v-bind:id="`answers${step}`" class="answer">
            <div v-on:click="validateAnswer" v-bind:id="`${step}_answer${index}`" class="unanswered">
              {{ answer.text }} 
            </div>
        </div>
       </div>  

    <div v-if="victory">
    <br>  YOU WON!  <br> <br>

    <img src="../assets/victory.gif"/>
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
        api_status: "up",
        try: 0,
        success: [false,false,false,false,false],
        isQuestion: [true,false,false,false,false],
        isAnswered: [false,false,false,false,false],
        player: [],
        playerName: "",
        questions : [{text: ''},{text: ''},{text: ''},{text: ''},{text: ''}],
        answers: [
                {text: '', correct: false},
                {text: '', correct: false},
                {text: '', correct: false}, 
                {text: '', correct: false}, 
                ],
      victory: false,
      start: false
    }
  }, 
  methods: {


     validateAnswer: function ()
        {   
        let target = event.target || event.srcElement;
        let id = target.id
        let id2 = id.substring(8, 9);        
        const previousStep = this.step;

        this.isAnswered[this.step] = true;

 
        if (this.answers[id2].correct == true)
            {
             document.getElementById(id).classList.remove("unanswered");
             document.getElementById(id).classList.add('good');


              for (let i = 0; i < 4; i++) { 
                  if (id2 != i) 
                    { 
                    let id3 = this.step + "_answer" + i;

// // would be easier
// replace class "foo" with class "bar"
// // div.classList.replace("foo", "bar");

                    document.getElementById(id3).classList.add('bad');
                    document.getElementById(id3).classList.remove("unanswered");
                    }
    
                } 
  
      


          //setTimeout( () => {
            
                this.success[this.step] = true;
                this.step+= 1;

              /* to remove an element
              //  setTimeout( () => {
                    //const wrapper_id = document.getElementById("1").parentElement.parentElement.id;
                   // const wrapper_id = target.parentElement.parentElement.id;
                   // this.removeElement(wrapper_id);
               //   }, 2500);
               */
          
                setTimeout( () => {
                  this.isQuestion[previousStep] = false;
                  
                  if (this.step > 2)
                      {
                      this.victory = true;
                      }
                  else
                      {
                      this.getQuestion(previousStep);
                      
                      this.isQuestion[this.step] = true;
                      }                  
                  }, 1000);

           //   }, 1000);          
    
            }
        else
          {
      
              for (let i = 0; i < 4; i++) { 
                  
                  let id3 = this.step + "_answer" + i;
                  document.getElementById(id3).classList.remove("unanswered");

                  if (this.answers[i].correct == true) 
                    { 
                    document.getElementById(id3).classList.add('good');
                    }
                  else
                    {
                    document.getElementById(id3).classList.add('bad');
                    }

                } 
  
          
             
             setTimeout( () => {
                    console.log("mauvaise reponse");
                    this.try+= 1;
                    this.step = 0;
                    this.success= [false,false,false,false,false];
                    this.isAnswered= [false,false,false,false,false];
                         
                    this.getQuestion(previousStep);

                    this.isQuestion= [true,false,false,false,false];


                  }, 1000);
          }

        },

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

    getClass: function(answer,index){

//console.log(answer)

        this.isAnswered[this.step] = true;

      //console.log("on est ds getclass"+this.step);
    this.class_answer = "unanswered" 
    
     return this.class_answer;
    },

    
    getQuestion: function (previousStep) {
      this.start = true;

      this.isAnswered[this.step] = false;
      this.questions[this.step].text= "",
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

      axios.get(api_url)

      .then((response)  =>  {
        this.loading = false;
        this.player = response.data;

      // a mettre a jour si api is down
      this.api_status = "up";

      if (this.api_status == "up")
        {
        this.playerName = this.player.name;
        }
      else
        {
        this.player.name = "Marcelo"
            //"firstName": "Marcelo",
            //"lastName": null,
            this.player.dateOfBirth = "1988-05-12"
            //"countryOfBirth": "Brazil",
            //"nationality": "Brazil",
            //"position": "Defender",
            // this.player.shirtNumber = 12;
            
            
        if (this.isAnswered[0] === true)
          {      
          this.player.name = "Messi" 
          this.player.dateOfBirth = "1985-05-12";
          }
            
        if (this.isAnswered[1] === true)
            {      
            this.player.name = "Ronaldo" 
            this.player.dateOfBirth = "1983-05-12";
            }

        }
      
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
        this.questions[this.step].text = "What is "+ this.playerName +"'s age?";
        this.answers[3].text = age_player;
         console.log("age joueur" + age_player);
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

      if (this.step == 0 && this.try > 0)
        {
        for (let i = 0; i < 4; i++) { 
                let id4 = previousStep + "_answer" + i;
                
                if (document.getElementById(id4).classList.value == "good")
                  { document.getElementById(id4).classList.remove("good"); }
                else  
                  { document.getElementById(id4).classList.remove("bad"); }
                document.getElementById(id4).classList.add("unanswered");
                } 
        }  
    
      // console.log("all answers" + this.answers[0].text + this.answers[1].text+ this.answers[2].text+ this.answers[3].text);   
      

      break;
    }


// 3 lignes a rajouter quand api is back!!!!!!

      }, (error)  =>  {
      })

    }
  },

/*
computed: {
    classObject: function () {
      console.log("removing"+this.step);
      return {
      'unanswered': !this.isAnswered[this.step]
       // 'text-danger': this.isAnswered[this.step]
      }
    }
  }  
*/ 
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
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
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

.button:hover {
      -webkit-transform: scale(1.2);
    -ms-transform: scale(1.2);
    transform: scale(1.2);
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
  padding-bottom: 32px;
} 

.answer {
  text-align:center;
 display:inline-block; 
  width:100%;
  vertical-align: middle;
  margin: 2px;
    top: 40%;
    left: 40%;
    height: 30%;
    width: 40%;
 opacity: 0.2;
}

.answer:hover
{
  opacity:1;
}

.good {
  background: #9ACD32;
	margin:1px;
  width:200px;
  height: 50px;
  border: 1px solid gray;
  display:inline-block; 
  border-radius: 0;
  font-weight: bold;
  font-size: 18px;
  padding-top: 35px;
  padding-bottom: 5px;
}

.bad {
  background: #FF6347;
	margin:1px;
  width:200px;
  height: 50px;
  border: 1px solid gray;
  display:inline-block; 
  border-radius: 0;
  font-weight: bold;
  font-size: 12px;
  padding-top: 35px;
  padding-bottom: 5px;
}

.unanswered
{
  background: #D3D3D3;
	margin:1px;
  width:200px;
  height: 50px;
  text-align:center;
    vertical-align: middle;
  border: 1px solid gray;
  display:inline-block;
  border-radius: 0;
  font-weight: bold;
  font-size: 15px;
  padding-top: 35px;
  padding-bottom: 5px;
}

.fixed_width
{
    text-align:center;
  display:inline-block; 

  width:510px;
}

</style>