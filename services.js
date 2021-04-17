const config = require('./config');
const chalk = require('chalk');
const Utils = require('./utils');

class Services {
   static async createProject(name, bundle) {
      try {
         const appDir = name.replace(' ', '');
         Utils.log('- Cloning project...');
         await Utils.cmd(`git clone ${config.repoURL} ${appDir}`);

         Utils.log('- Installing project dependencies...')
         await Utils.cmd(`cd ${appDir} && npm install`);

         Utils.log('- Rename project...')
         await Utils.cmd(`cd ${appDir} && npx react-native-rename "${name}" -b "${bundle}"`);
         
         if (Utils.isMac) {
            Utils.log('- Installing pod...')
            await Utils.cmd(`cd ${appDir}/ios && pod update`)
         }

         Utils.log('- Initializing git...')
         await Utils.cmd(`cd ${appDir} && npx rimraf .git && git init && git add . && git commit -m "Init Project"`);

         console.log(chalk.green('Done'));
         process.exit()
      } catch (error) {
         console.log(chalk.red(error.message));
         process.exit()
      }
   }

   static async getCreateInputByProject() {
      try {
         const name = await Utils.input("Enter App Name: ");
         if (!name) throw new Error("App Name is required");
         const bundle = await Utils.input(`Enter Bundle Identifier (Ex: ${chalk.yellow('com.subekti.todoapp')}): `);
         if (!bundle) throw new Error("Bundle Identifier is required");
         await Services.createProject(name, bundle)
      } catch (error) {
         console.log(chalk.red(error.message));
         process.exit()
      }
   }

}

module.exports = Services