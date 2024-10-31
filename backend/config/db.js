import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    user:"postgres",
    password:"web12345",
    host:"localhost",
    port:"5432",
    database:"salahtracking"

});

pool.on('connect', () => {
    console.log('Connected to the database'); 
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err); 
});

export default pool;