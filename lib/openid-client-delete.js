'use strict';

const program = require('commander');
const got = require('got');
const pkg = require('../package.json');
const error = require('./error.js');

// TODO: form the request payload and prompt for confirmation
// TODO: --no-prompt option

program
  .version(pkg.version)
  .option('-t, --token <value>', 'registration_access_token')
  .option('-u, --uri <value>', 'registration_client_uri')
  .parse(process.argv);

program.options.forEach((option) => {
  if (option.required && !program[option.long.replace(/^-*/g, '')]) {
    program.missingArgument(option.long);
  }
});

got.delete(program.uri, {
  headers: {
    Authorization: `Bearer ${program.token}`,
  },
}).catch(error);