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
      showInstructions: false
    };
  },
  methods: {
    randomize() {
      this.randomVerb = uniqueRandomArray(verbs)();
      this.randomBody = uniqueRandomArray(body)();
      this.randomPlayer = uniqueRandomArray([this.player1, this.player2])();
      this.randomDuration = uniqueRandomArray([10, 30, 60])();
      this.showInstructions = true;
      this.disableButton();
    },
    disableButton() {
      this.isBtnDisabled = true;
      setTimeout(() => {
        this.isBtnDisabled = false;
      }, 1000);
    },
    closeSettings() {
      this.showSettings = false;
      this.showGame = true;
      this.showInstructions = false;
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
        console.log("this.player1", this.player1);

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
    }
  },
  mounted() {
    this.getPlayersData();
  }
});
