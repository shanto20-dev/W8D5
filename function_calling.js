const { appendFile } = require("fs");

Function.prototype.myBind = function(context) {
    return () => this.apply(context);
}

Function.prototype.myThrottle = function(interval) {
    let tooSoon = false;
    return () => {
        if (!tooSoon) {
            tooSoon = true;
            setTimeout(() => { tooSoon = false; }, interval);
            this();
        }
    }
}

Function.prototype.myDebounce = function(interval) {
    let timerRunning = false;
    return () => {
        if (!timerRunning) {
            timerRunning = true;
            let func = this;
            setTimeout(() => {
                func();
                timerRunning = false;
            }, interval);
        }
        
    }
}

class SearchBar {
    constructor() {
      this.query = "";
  
      this.type = this.type.bind(this);
      this.search = this.search.bind(this);
    }
  
    type(letter) {
      this.query += letter;
      this.search();
    }
  
    search() {
      console.log(`searching for ${this.query}`);
    }
  }

  const searchBar = new SearchBar();

const queryForHelloWorld = () => {
  searchBar.type("h");
  searchBar.type("e");
  searchBar.type("l");
  searchBar.type("l");
  searchBar.type("o");
  searchBar.type(" ");
  searchBar.type("w");
  searchBar.type("o");
  searchBar.type("r");
  searchBar.type("l");
  searchBar.type("d");
  setTimeout(() => { searchBar.type(" pineapple"); }, 2500)
};

searchBar.search = searchBar.search.myDebounce(2000);

queryForHelloWorld();