module.exports = {
  apps : [{
    name   : "main",
    script : "./dist/index.js",
    env: {
        NODE_ENV: "production"
    }
  }]
}
