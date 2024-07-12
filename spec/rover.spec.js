const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');
const assert = require('assert');


// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
const rover = new Rover(98382)
  // 7 tests here!
it("constructor sets position and default values for mode and generatorWatts", function() {
  
  
    expect( rover.position).toEqual(98382);
  expect( rover.mode).toEqual('NORMAL');
  expect( rover.generatorWatts).toEqual(110);
  });
  
  it('response returned by receiveMessage contains name of message', function() {
  let commands = new Command ('MOVE', 4321);
  let message = new Message('A new command!', commands);
  let rover = new Rover(message.commands.value);
  let response = rover.receiveMessage(message);
  expect (response.message).toEqual('A new command!');
});

it('response returned by receiveMessage includes two results if two commands are sent in the message', function() {
  let commands = [new Command ('MOVE', 20), new Command ('STATUS_CHECK')];
  let message = new Message('A new command!', commands);
  let rover = new Rover(message.commands.value);
  let response = rover.receiveMessage(message);
  expect (response.results.length).toEqual(2);
});

it('respond correctly to status check command', function () {
  let commands =  [new Command ('STATUS_CHECK')];
  let message = new Message('A new command!', commands);
  let rover = new Rover(20);
  let response = rover.receiveMessage(message);
  expect(response.results.roverStatus).toBeTrue;
  expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
  expect(response.results[0].roverStatus.position).toEqual(20);
  expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
});

it('responds correctly to mode change command', function() {
  let commands = [new Command ('MOVE', 500), new Command ('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('A new command!', commands);
  let rover = new Rover(message.commands.value);
  let response = rover.receiveMessage(message);
  expect(rover.position).toEqual(500);
  expect(response.results[1].complete).toEqual('true');
  expect(rover.mode).toEqual('LOW_POWER');
});

it('responds with false completed value when attempting to move in LOW_POWER mode', function() {
  let commands = [new Command ('MOVE', 100), new Command ('MODE_CHANGE', 'LOW_POWER'), new Command ('MOVE', 500)];
  let message = new Message('A new command!', commands);
  let rover = new Rover(message.commands.value);
  let response = rover.receiveMessage(message);
  expect(response.results[2].complete).toEqual('false');
  expect(rover.position).toEqual(100);
});

it('responds with position for move command', function () {
  let commands = [new Command ('MOVE', 1200), new Command ('MOVE', 9000)];
  let message = new Message('A new command!', commands);
  let rover = new Rover(message.commands.value);
  let response = rover.receiveMessage(message);
  expect(rover.position).toEqual(9000);
});
  
it("responds to TA message & commands", function() {
   let rover = new Rover(100);
   let commands = [
      new Command('MOVE', 4321),
      new Command('STATUS_CHECK'),
      new Command('MODE_CHANGE', 'LOW_POWER'),
      new Command('MOVE', 3579),
      new Command('STATUS_CHECK')
   ];
   let message = new Message('TA power', commands);
   let response = rover.receiveMessage(message);
   assert.strictEqual(response.message,'TA power');
   assert.strictEqual(response.results[0].completed, true.toBeTrue);
   assert.strictEqual(response.results[1].roverStatus.position, 4321);
   assert.strictEqual(response.results[2].completed, true.toBeTrue);
   assert.strictEqual(response.results[3].completed, false.toBeFalse);
   assert.strictEqual(response.results[4].roverStatus.position, 4321);
   assert.strictEqual(response.results[4].roverStatus.mode, 'LOW_POWER');
   assert.strictEqual(response.results[4].roverStatus.generatorWatts, 110);
});

});