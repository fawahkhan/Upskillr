JWT_USER_PASSWORD =process.env.JWT_USER_PASSWORD  //for signing users , admin passwords would be signed by their own passwords which is different
JWT_ADMIN_PASSWORD =process.env.JWT_ADMIN_PASSWORD  //for signing admins

module.exports = {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD 
}