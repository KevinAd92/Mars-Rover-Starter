const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(orgMessage) {
      let results = [];
      for(let i = 0; i < orgMessage.commands.length; i++){
         if(orgMessage.commands[i].commandType === "STATUS_CHECK"){
            results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            });
         } else if (orgMessage.commands[i].commandType === 'MODE_CHANGE'){
            results.push({
               completed: true
            });
            this.mode = orgMessage.commands[i].value;
         }else if (orgMessage.commands[i].commandType === 'MOVE'){
            if(this.mode === "NORMAL"){
               results.push({
                  completed: true
               });
               this.position = orgMessage.commands[i].value;
            }else if(this.mode === "LOW_POWER"){
               results.push({
                  completed: false
            });
            }
         }
      }
      return {
         message: orgMessage.name,
         results: results
      }
   }
     
}

module.exports = Rover;