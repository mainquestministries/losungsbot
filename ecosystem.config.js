//pm2 is getting to much memory
module.exports = {
  apps : [{
    name   : "Losungsbot",
    script : "./dist/index.js",
    env: {
        NODE_ENV: "production"
    }
  }]
}
