class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
        this.position = position;
        this.mode = mode;
        this.generatorWatts = generatorWatts;
      }
   
    // receiveMessage(message) {
       let response = {
         message: message.name,
         results: []
       }
   
      
       for (let i = 0; i < message.commands.length; i++) {
   
         if (message.commands[i].commandType === 'MOVE') {
           if (this.mode === 'LOW_POWER') {
             response.results.push({complete: 'false'})
           } else {
           response.results.push({complete: 'true'});
           this.position = message.commands[i].value;
           };
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
           response.results.push({complete: 'true'});
           this.mode = message.commands[i].value;
         } else if (message.commands[i].commandType === 'STATUS_CHECK') {
           response.results.push({complete: 'true1', roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
         } else {
           response.results.push({complete: 'false'});
         }
       };
       return response;
     };
   
   
   };  
   module.exports = Rover;