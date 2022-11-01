// SCTM-S3001 Comp Sci 2-Data & Algorithms
// Student: Joycelyn Wong
// Professor: Adam Tindale
// Mid-term

let socket = io.connect("https://jowongg.github.io/time2/");

var lifeWeight = 0;

class inputMemory {
  #memory = {};
  #listOfMemory = [];

  constructor() {}

  createMemory(text, color, fontSize) {
    // create memory object
    var randLeft = Math.random() * (window.innerHeight - 80);
    this.#memory = {
      height: randLeft,
      width: window.innerWidth - 100,
      text: text,
      color: color,
      fontSize: fontSize,
      now: new Date(),
    };
    // send object to the server
    socket.emit("text-to-server", this.#memory);
  }
  addMemoryList(memory) {
    // add memory into the array list
    this.#listOfMemory.push(memory);
  }
  longestMemory() {
    if (this.#listOfMemory.length >= 1) {
      // set a initial value for longestWord to start comparison
      var longM = this.#listOfMemory[0].text;
      for (var i = 0; i < this.#listOfMemory.length; i++) {
        // set the item word length into the longWord value if the item length is longer
        if (this.#listOfMemory[i].text.length > longM.length) {
          longM = this.#listOfMemory[i].text;
        }
      }
      // print out the word and its length
      console.log(longM);
    } else {
      console.log("no memories yet");
    }
  }
  returnMemory(index) {
    return this.#listOfMemory[index];
  }
  //   height() {
  //     return this.#memory.height;
  //   }
  //   width() {
  //     return this.#memory.width;
  //   }
  //   text() {
  //     return this.#memory.text;
  //   }
  //   color() {
  //     return this.#memory.color;
  //   }
  //   fontSize() {
  //     return this.#memory.fontSize;
  //   }
}

// take input value and create memory
function enterButton() {
  
  webText.createMemory(
    document.getElementById("input").value,
    document.getElementById("color").value,
    document.getElementById("fontSize").value
  );
  // clear the input box
  document.getElementById("input").value = "";
}

// real-time feedback
socket.on("text-to-sockets", (memory) => {
  //console.log(memory.text + "frontend");
  gaussiumSum(memory.fontSize);
  webText.addMemoryList(memory);
  format(memory);
});

// format the object css and animate it on screen
function format(memory) {
  var currentMemoryCss = $("<p class='shownMemory'>" + memory.text + "</p>");

  $(currentMemoryCss).css("left", memory.width + "px");
  $(currentMemoryCss).css("top", memory.height + "px");
  $(currentMemoryCss).css("color", memory.color);
  $(currentMemoryCss).css("font-size", memory.fontSize + "px");

  $("body").append(currentMemoryCss);
  moveText(".shownMemory");
}

// animate the text on screen
function moveText(animation) {
  $(animation).animate(
    {
      left: "-3000000px",
      //opacity: "0.1",
    },
    90000000,
    "linear"
  );
}

// show error when user press the button
function error() {
  alert("error...");
}

// add up all the text wieght of the object
function gaussiumSum(num) {
  var number = Number(num);
  lifeWeight += number;
}

let webText = new inputMemory();
