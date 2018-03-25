function whatever(a, b, c) {
  console.assert(a === 1, "value of a is 1");
  console.assert(b === 2, "value of b is 2");
  console.assert(c === 3, "value of c is 3");
  console.assert(arguments.length === 5, "we have passed in 5 arguments");
  console.assert(arguments[0] === a, "the first  argument is assigned to a ");
  console.assert(arguments[1] === b, "the second argument is assigned to b");
  console.assert(arguments[2] === c, "the third argument is assigned to c");
  console.assert(arguments[3] === 4, "we can access fourth argument");
  console.assert(arguments[4] === 5, "we can access fifth argument");
}

whatever(1, 2, 3, 4, 5);

function sum() {
  var sum = 0;
  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

console.assert(sum(1, 2, 3) === 6, "we can add three numbers");
console.assert(sum(1, 2, 3, 4) === 10, "we can add four numbers");

function infiltrate(person) {
  console.assert(person === "gardner", "The person is a gardner");
  console.assert(arguments[0] === "gardner", "The first argument is a gardner");
  arguments[0] = "ninja";
  console.assert(person === "ninja", "the person is a ninja now");
  console.assert(arguments[0] === "ninja", "the first argument is a ninja now");
  person = "gardner";
  console.assert(person === "gardner", "person is a gardner again");
  console.assert(
    arguments[0] === "gardner",
    "first argument is a gardner again"
  );
}

infiltrate("gardner");

function infiltrate(person) {
  "use strict";
  console.assert(person === "gardner", "The person is a gardner");
  console.assert(arguments[0] === "gardner", "The first argument is a gardner");
  arguments[0] = "ninja";
  console.assert(person === "gardner", "the person is stilla gardner");
  console.assert(arguments[0] === "ninja", "the first argument is a ninja now");
  person = "ninja";
  console.assert(person === "ninja", "person is a ninja now");
  console.assert(arguments[0] === "ninja", "first argument is ninja still");
}

//Invocation as a function

function ninja() {
  return this;
}

function samurai() {
  "use strict";
  return this;
}

console.assert(
  ninja() === global,
  "In a non strict ninja fn the context is global"
);
console.assert(
  typeof samurai() === "undefined",
  "In a strict fn the context is undefined"
);

// difference btw fn and method invocations

function whatsMyContext() {
  return this;
}
console.assert(whatsMyContext() === global, "function call on global");
var getMyThis = whatsMyContext;
console.assert(getMyThis() === global, "another function call on global");
var ninja1 = {
  getMyThis: whatsMyContext
};
console.assert(ninja1.getMyThis() === ninja1, "working with first ninja");
var ninja2 = { getMyThis: whatsMyContext };
console.assert(ninja2.getMyThis() === ninja2, "working with second ninja");

//using constructor to set up common objects

function Ninja() {
  this.skulk = function() {
    return this;
  };
}

var ninja1 = new Ninja();
var ninja2 = new Ninja();

console.assert(ninja1.skulk() === ninja1, "the first ninja is skulking");
console.assert(ninja2.skulk() === ninja2, "the second ninja is skulking");

//constructore returning premitive values
function PremitiveNinja() {
  this.skulk = function() {
    return true;
  };
  return 1;
}

console.assert(
  PremitiveNinja() === 1,
  "return value honoured when not called as a constructor"
);

var ninja = new PremitiveNinja();
console.assert(
  typeof ninja === "object",
  "Object returned when a constructor is called"
);
console.assert(
  typeof ninja.skulk === "function",
  "ninja object has a skulk method"
);

// constructors explicitly returning object values

var puppet = {
  rules: false
};

function Emperor() {
  this.rules = true;
  return puppet;
}
var emperor = new Emperor();

console.assert(emperor === puppet, "the emperor is merely a puppet");
console.assert(emperor.rules === false, "the puppet does not know how to rule");

//Binding a specific context to a function

//refer functionInvoking.html

// Using apply and call

function juggle() {
  var result = 0;
  for (var n = 0; n < arguments.length; n++) {
    result += arguments[n];
  }
  this.result = result;
}

var ninja1 = {};

var ninja2 = {};

juggle.apply(ninja1, [1, 2, 3, 4, 5]);
juggle.call(ninja2, 1, 2, 3, 4, 5, 6);

console.assert(ninja1.result === 15, "Juggled via apply");
console.assert(ninja2.result === 21, "Juggled via call");

//Building foreach fn demonstrating setting a fn context
function foreach(list, callback) {
  for (var n = 0; n < list.length; n++) {
    callback.call(list[n], n);
  }
  var weapons = [{type:'shuriken'},{type:'katana'},{type:'nunchuchs'}]

  foreach(weapons,function(index){
      console.assert(this===weapons[index],'Got the value of'+weapons[index].type)
  })


}

// using arrow funcitons -refer functionInvoking.html
