#!/usr/bin/env node
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const repo = `https://github.com/subekti404dev/react-native-boilerplate.git`
const chalk = require('chalk')
const readline = require('readline').createInterface({
   input: process.stdin,
   output: process.stdout
});
const isMac = process.platform === 'darwin';
const exec = require('child_process').exec;
const nrc = {
   run: (cmd) => {
      return new Promise((resolve, reject) => {
         exec(cmd, (err, _stdout, _stderr) => {
            if (err) {
               reject(err)
            } else {
               resolve(true)
            }
         })
      })
   }
}

const log = (message) => {
   console.log(chalk.grey(message));
}

const input = async (question) => {
   return new Promise((resolve) => {
      return readline.question(chalk.green(question), answer => {
         resolve(answer);
      });
   })
}

const createProject = async (name, bundle) => {
   try {
      const appDir = name.replace(' ', '');
      log('- Cloning project...');
      await nrc.run(`git clone ${repo} ${appDir}`);

      log('- Installing project dependencies...')
      await nrc.run(`cd ${appDir} && npm install`);

      log('- Rename project...')
      await nrc.run(`cd ${appDir} && npx react-native-rename "${name}" -b "${bundle}"`);

      log('- Initializing git...')
      await nrc.run(`cd ${appDir} && npx rimraf .git && git init && git add . && git commit -m "Init Project"`);

      if (isMac) {
         log('- Installing pod...')
         await nrc.run(`cd ${appDir}/ios && pod update`)
      }

      console.log(chalk.green('Done'));
      process.exit()
   } catch (error) {
      console.log(chalk.red(error.message));
      process.exit()
   }
}

const getCreateInputByProject = async () => {
   try {
      const name = await input("Enter App Name: ");
      if (!name) throw new Error("App Name is required");
      const bundle = await input(`Enter Bundle Identifier (Ex: ${chalk.yellow('com.subekti.todoapp')}): `);
      if (!bundle) throw new Error("Bundle Identifier is required");
      await createProject(name, bundle)
   } catch (error) {
      console.log(chalk.red(error.message));
      process.exit()
   }
}

if (argv.name && argv.bundle) {
   const name = argv.name;
   const bundle = argv.bundle;

   createProject(name, bundle);
} else {
   getCreateInputByProject();
}

