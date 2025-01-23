import { Client } from "pg"

const pgClient = new Client({
    host : 'localhost',
    user : 'postgres',
    port : 5432,
    password :'qweasdzxc1!',
    database :'EmailApplication'
})

export default pgClient