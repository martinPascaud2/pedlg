// Your repository
const REPO = "git@gitlab.com:prends-en-de-la-graine/pedlg.git";

// Dev server username
const DEV_SERVER_USER = process.env.DEV_SERVER_USER ? process.env.DEV_SERVER_USER.trim() : "";
// Dev server hostname or IP address
const DEV_SERVER_HOST = process.env.DEV_SERVER_HOST ? process.env.DEV_SERVER_HOST.trim() : "";
// Dev server application path
const DEV_SERVER_APP_PATH = `/home/${DEV_SERVER_USER}/apps`;
// Dev branch name
const DEV_BRANCH_NAME = "origin/dev-deployed";

// Prod server application path
const PROD_SERVER_APP_PATH = `/home/${process.env.PROD_SERVER_USER}/apps`;
// Prod branch name
const PROD_BRANCH_NAME = "origin/production";

// Custom way to pass env variables from server itself
let env = {};
if (!process.env.CI_JOB_STAGE) {
  env = require("/home/bitnami/.env.json");
}

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "pedlg-api",
      cwd: "./api/",
      script: "npm",
      args: "run deploy",
      autorestart: true,
      watch: false,
      env: {
        "NODE_ENV": "development"
      },
      env_dev: {
        "NODE_ENV": "production",
        "SERVER_HOST": env.SERVER_HOST,
        "SERVER_PORT": 4000,
        "CLIENT_URL": env.CLIENT_URL,
        "CLIENT_DOMAIN": env.CLIENT_DOMAIN,
        "SECRET_HASH": env.SECRET_HASH,
        "JWT_SIGN_SECRET": env.JWT_SIGN_SECRET,
        "JWT_MAIL_SECRET": env.JWT_MAIL_SECRET,
        "JWT_RECOVERY_SECRET": env.JWT_RECOVERY_SECRET,
        "MAIL_USER": env.MAIL_USER,
        "MAIL_SECRET": env.MAIL_SECRET,
        "FACEBOOK_APP_ID": env.FACEBOOK_APP_ID,
        "FACEBOOK_APP_SECRET": env.FACEBOOK_APP_SECRET,
        "GOOGLE_CLIENT_ID": env.GOOGLE_CLIENT_ID,
        "GOOGLE_CLIENT_SECRET": env.GOOGLE_CLIENT_SECRET,
        "DB_DIALECT": env.DB_DIALECT,
        "DB_HOST": env.DB_HOST,
        "DB_NAME": env.DB_NAME,
        "DB_PASSWD": env.DB_PASSWD,
        "DB_USER": env.DB_USER,
        "REDIS_HOST": env.REDIS_HOST,
        "REDIS_PORT": env.REDIS_PORT
      },
      env_production: {
        "NODE_ENV": "production",
        "SERVER_HOST": env.SERVER_HOST,
        "SERVER_PORT": 4000,
        "CLIENT_URL": env.CLIENT_URL,
        "CLIENT_DOMAIN": env.CLIENT_DOMAIN,
        "SECRET_HASH": env.SECRET_HASH,
        "JWT_SIGN_SECRET": env.JWT_SIGN_SECRET,
        "JWT_MAIL_SECRET": env.JWT_MAIL_SECRET,
        "JWT_RECOVERY_SECRET": env.JWT_RECOVERY_SECRET,
        "MAIL_USER": env.MAIL_USER,
        "MAIL_SECRET": env.MAIL_SECRET,
        "FACEBOOK_APP_ID": env.FACEBOOK_APP_ID,
        "FACEBOOK_APP_SECRET": env.FACEBOOK_APP_SECRET,
        "GOOGLE_CLIENT_ID": env.GOOGLE_CLIENT_ID,
        "GOOGLE_CLIENT_SECRET": env.GOOGLE_CLIENT_SECRET,
        "DB_DIALECT": env.DB_DIALECT,
        "DB_HOST": env.DB_HOST,
        "DB_NAME": env.DB_NAME,
        "DB_PASSWD": env.DB_PASSWD,
        "DB_USER": env.DB_USER,
        "REDIS_HOST": env.REDIS_HOST,
        "REDIS_PORT": env.REDIS_PORT
      }
    },
    {
      name: 'pedlg-front',
      cwd: './front/',
      script: 'npm',
      args: 'run start',
      autorestart: true,
      watch: false,
      env: {
        "NODE_ENV": "development"
      },
      env_dev: {
        "NODE_ENV": "production",
        "PORT": 3000,
        "APP_URL": env.CLIENT_URL,
        "API_URL": env.SERVER_HOST
      },
      env_production: {
        "NODE_ENV": "production",
        "PORT": 3000,
        "APP_URL": env.CLIENT_URL,
        "API_URL": env.SERVER_HOST
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    dev: {
      // Target server username
      user: DEV_SERVER_USER,
      // Target server hostname or IP address
      host: DEV_SERVER_HOST,
      ref: DEV_BRANCH_NAME,
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: DEV_SERVER_APP_PATH,
      'post-deploy': 'yarn --cwd ./front/ install --production'
        + ' && NODE_ENV=production yarn --cwd ./front/ run build'
		    + ' && NODE_ENV=production yarn --cwd ./api/ install --production'
        + ' && pm2 startOrRestart ecosystem.config.js --env=dev'
        + ' && pm2 save'
    },
    production: {
      // Target server username
      user: process.env.PROD_SERVER_USER,
      // Target server hostname or IP address
      host: process.env.PROD_SERVER_HOST,
      ref: PROD_BRANCH_NAME,
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: PROD_SERVER_APP_PATH,
      'post-deploy': 'yarn --cwd ./front/ install --production'
        + ' && NODE_ENV=production yarn --cwd ./front/ run build'
		    + ' && NODE_ENV=production yarn --cwd ./api/ install --production'
        + ' && pm2 startOrRestart ecosystem.config.js --env=production'
        + ' && pm2 save'
    },
  }
};