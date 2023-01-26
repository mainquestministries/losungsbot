module.exports = {
  apps : [{
    name   : "Losungsbot",
    script : "./dist/index.js",
    env: {
        NODE_ENV: "production"
    }
  }]
}
