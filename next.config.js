const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['extra-resto.s3.eu-west-3.amazonaws.com'],
  },
}