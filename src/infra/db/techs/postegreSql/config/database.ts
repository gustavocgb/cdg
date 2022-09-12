import pkg from 'pg';
const { Pool } = pkg;
import env from '../../../../dotenv';

const pool = new Pool ({
    connectionString: env.DATABASE_URL
})

export const dataBase = {

    async pool() {
        return pool
    },

    async connect() {
        return await pool.connect()
    },

    async disconnect(client: any) {
        client.release(true)
    }

}
