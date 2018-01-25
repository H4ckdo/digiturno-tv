/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */
const SADDRESS = process.argv[2];

module.exports = {
  models: {
    connection: 'MongodbServer',
    migrate: 'safe'
  },
  host: (SADDRESS || "localhost"),
  connections: {
    MongodbServer: {
      adapter: 'sails-mongo',
      host: 'localhost',
      port: 27017,
      database: 'digiturno-dev'
    }
  }
}
