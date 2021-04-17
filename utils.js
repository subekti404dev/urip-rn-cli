const readline = require('readline').createInterface({
   input: process.stdin,
   output: process.stdout
});
const chalk = require('chalk');
const exec = require('child_process').exec;


class Util {
   static isMac = process.platform === 'darwin';

   static async input(question) {
      return new Promise((resolve) => {
         return readline.question(chalk.green(question), answer => {
            resolve(answer);
         });
      })
   }

   static log(message) {
      console.log(chalk.grey(message));
   }

   static async cmd(command) {
      return new Promise((resolve, reject) => {
         exec(command, (err, _stdout, _stderr) => {
            if (err) {
               reject(err)
            } else {
               resolve(true)
            }
         })
      })
   }
}

module.exports = Util