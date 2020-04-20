const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')
//const FoldersService = require('./folders/folders-service')



const db = knex({
    client: 'pg',
    connection: DB_URL,
})

// console.log('knex and driver installed correctly');
// console.log(FoldersService.getAllFolders())


app.set('db', db)


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})