import VueCountdown from "@xkeshi/vue-countdown";
let uniqueRandomArray = require("unique-random-array");
let body = require("./dictionary/body.json");
let verbs = require("./dictionary/verbs.json");

var app = new Vue({
  el: "#app",
  data() {
    return {
      isBtnRollDisabled: false,
      isBtnStartDisabled: false,
      listBody: body.join(", "),
      listVerbs: verbs.join(", "),
      randomVerb: "",
      randomBody: "",
      player1: "",
      player2: "",
      randomPlayer: "",
      randomDuration: "",
      chkTime: true,
      chkTurns: true,
      showSettings: true,
      showDictionary: false,
      showGame: false,
      showInstructions: false
    };
  },
  components: {
    countdown: VueCountdown
  },
  methods: {
    randomize() {
      this.randomVerb = uniqueRandomArray(verbs)();
      this.randomBody = uniqueRandomArray(body)();
      this.randomDuration = uniqueRandomArray([15, 30, 60])();
      this.randomPlayer = uniqueRandomArray([this.player1, this.player2])();
    },

    roll() {
      this.randomize();
      this.showInstructions = true;
      this.isBtnStartDisabled = false;
    },
    closeSettings() {
      this.showSettings = false;
      this.showGame = true;
      this.showInstructions = false;
    },
    closeDictionary() {
      this.showSettings = false;
      this.showGame = true;
      this.showInstructions = false;
      this.showDictionary = false;
    },
    openSettings() {
      this.showSettings = true;
      this.showGame = false;
      this.showDictionary = false;
    },

    openDictionary() {
      this.showDictionary = true;
      this.showGame = false;
      this.showSettings = false;
    },

    getPlayersData() {
      if (window.localStorage.getItem("player1")) {
        this.player1 = window.localStorage.getItem("player1");
      }

      if (window.localStorage.getItem("player2")) {
        this.player2 = window.localStorage.getItem("player2");
      }
    },
    getDictionarySavedData() {
      if (window.localStorage.getItem("verbs")) {
        this.listVerbs = window.localStorage.getItem("verbs");
      }

      if (window.localStorage.getItem("body")) {
        this.listBody = window.localStorage.getItem("body");
      }
    },
    savePlayersData() {
      if (this.player1) {
        window.localStorage.setItem("player1", this.player1);
      }
      if (this.player2) {
        console.log("this.player2", this.player2);
        window.localStorage.setItem("player2", this.player2);
      }

      if (!this.chkTime) {
        this.isBtnRollDisabled = false;
      }
    },
    saveDictionaryData() {
      if (this.listVerbs) {
        this.listVerbs = this.listVerbs;
        body = this.listVerbs
          .split(",")
          .map(item => item.trim())
          .filter(word => word !== "");
        window.localStorage.setItem("verbs", this.listVerbs);
      }
      if (this.listBody) {
        this.listBody = this.listBody;
        verbs = this.listBody
          .split(",")
          .map(item => item.trim())
          .filter(word => word !== "");
        window.localStorage.setItem("body", this.listBody);
      }
    },
    saveSettings() {
      this.savePlayersData();
      this.closeSettings();
    },
    saveDictionary() {
      this.saveDictionaryData();
      this.closeDictionary();
    },
    resetDictionary() {
      if (window.localStorage.getItem("verbs"))
        window.localStorage.removeItem("verbs");
      if (window.localStorage.getItem("body"))
        window.localStorage.removeItem("body");

      body = require("./dictionary/body.json");
      verbs = require("./dictionary/verbs.json");

      this.listBody = body.join(", ");
      this.listVerbs = verbs.join(", ");
    },

    startCountdown() {
      this.$refs.countdown.start();
      this.isBtnStartDisabled = true;
      this.isBtnRollDisabled = true;
    },
    onCountdownEnd() {
      console.log("Countdown has finished");
      this.$refs.audioElm.play();
      this.isBtnRollDisabled = false;
    }
  },
  mounted() {
    this.getPlayersData();
  }
});
