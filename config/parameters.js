module.exports = {
    tokenKey: process.env.TOKEN_KEY || 'yourTokenSecret',
    adminPassword: process.env.ADMIN_PASS || 'adminPass',
    gameKey: process.env.GAME_KEY || 'gameKey',
    port: process.env.PORT || '8080',
    urlDb: process.env.MONGODB_URI || 'mongodb://localhost:27017/slingshot',
    testUrlDb: 'mongodb://localhost:27017/slingshot_test'
}