import VueCountdown from "@xkeshi/vue-countdown";
let uniqueRandomArray = require("unique-random-array");
let body = require("./dictionary/body.json");
let verbs = require("./dictionary/verbs.json");

var app = new Vue({
  el: "#app",
  data() {
    return {
      isBtnDisabled: false,
      randomVerb: "",
      randomBody: "",
      player1: "",
      player2: "",
      randomPlayer: "",
      randomDuration: "",
      chkTime: true,
      chkTurns: true,
      showSettings: true,
      showGame: false,
      showInstructions: false,
      remainingTime: 0,
      isCounting: true
    };
  },
  components: {
    countdown: VueCountdown
  },
  methods: {
    randomize() {
      this.randomVerb = uniqueRandomArray(verbs)();
      this.randomBody = uniqueRandomArray(body)();
      this.randomDuration = uniqueRandomArray([15, 35, 65])();
      this.randomPlayer = uniqueRandomArray([this.player1, this.player2])();
      this.showInstructions = true;
    },

    closeSettings() {
      this.showSettings = false;
      this.showGame = true;
      this.showInstructions = false;
    },
    openSettings() {
      this.showSettings = true;
      this.showGame = false;
    },

    getPlayersData() {
      if (window.localStorage.getItem("player1")) {
        this.player1 = window.localStorage.getItem("player1");
      }

      if (window.localStorage.getItem("player2")) {
        this.player2 = window.localStorage.getItem("player2");
      }
    },
    savePlayersData() {
      console.log("savePlayersData");
      if (this.player1) {
        window.localStorage.setItem("player1", this.player1);
      }
      if (this.player2) {
        console.log("this.player2", this.player2);
        window.localStorage.setItem("player2", this.player2);
      }
    },
    saveSettings() {
      this.savePlayersData();
      this.closeSettings();
    },

    startCountdown() {
      this.$refs.countdown.start();
    },
    onCountdownEnd() {
      console.log("Countdown has finished");
      this.$refs.audioElm.play();
    }
  },
  mounted() {
    this.getPlayersData();
  }
});
