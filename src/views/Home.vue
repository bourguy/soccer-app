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
        {{ answer }} 
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
      player_name: "",
      question: "",
      answer: "",
      loading: false
    }
  }, 
  methods: {
    getPlayer: function () {
      this.loading = true;
  
      axios.defaults.headers.common['X-Auth-Token'] = "a3192df351cd41f3bc684356d650d85b";

      const random_number = Math.floor(1000*Math.random());
      console.log(random_number);
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
        this.player_name = this.player.name;

        const random_number2 = Math.floor(10*Math.random());
        console.log(random_number2);
        console.log(this.player_name);

        switch (random_number2) {
          case 0:
            this.question = "Which number does " + this.player_name +" wear?";
            this.answer = this.player.shirtNumber;
          break;
          
          default:
            this.question = "Which number does " + this.player_name +" wear?";
            this.answer = this.player.shirtNumber;
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
</style>