const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
it("constructor sets position and default values for mode and generatorWatts.", function() {
    let rover = new Rover(50)
    expect(rover.position).toEqual(50);
    expect(rover.mode).toEqual("NORMAL");
    expect(rover.generatorWatts).toEqual(110);
});

it("response returned by recieveMessage contains name of message", function() {
    let rover = new Rover(50);
    let message = new Message("newMessage", []);

    let result = rover.receiveMessage(message);

    expect(result.message).toEqual("newMessage");
});

it("response returned by receiveMessage includes two results if two commands are sent in the message.", function(){
    let rover = new Rover(50);

    let command = new Command("STATUS_CHECK");
    let message = new Message("newMessage", [command, command]);
    let result = rover.receiveMessage(message);

    expect(result.results.length).toEqual(2);
})

it('responds correctly to status check command', function(){
    let rover = new Rover(50);

    let command = new Command('STATUS_CHECK');
    let message = new Message("newMessage", [command]);
    let result = rover.receiveMessage(message).results;

    expect(result[0].roverStatus.generatorWatts).toEqual(rover.generatorWatts);
});

it("responds correctly to mode change command", function(){
    let rover = new Rover(50);

    let command = new Command('MODE_CHANGE', "LOW_POWER");
    let message = new Message("newMessage", [command]);
    let result = rover.receiveMessage(message).results;

    expect(rover.mode).toEqual('LOW_POWER');
});

it("responds with false completed value when attempting to move in LOW_POWER mode.", function(){
    let rover = new Rover(50);
    rover.mode = 'LOW_POWER';
    
    let command = new Command('MOVE', 300);
    let message = new Message("newMessage", [command]);
    
    let result = rover.receiveMessage(message).results;

    expect(result[0].completed).toEqual(false);
    });

it("responds with position for MOVE command", function(){
    let rover = new Rover(50);
    
    let command = new Command('MOVE', 300);
    let message = new Message("newMessage", [command]);

    let result = rover.receiveMessage(message).results;

    expect(rover.position).toEqual(300);
})    
});
