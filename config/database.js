module.exports = {
  database: 'mongodb://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@ds239412.mlab.com:39412/web-technologies',
  secret: process.env.DATABASE_SECRET
}
