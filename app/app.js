const mysql = require('mysql2');
const express = require('express');
const app = express();
app.use(express.json());

const CONNECTION = {
  DB_HOST: 'utsav-mysql-statefulset-0.utsav-mysql-headless.default.svc.cluster.local',
  DB_PORT: 3306,
  MYSQL_USER: 'root',
  MYSQL_ROOT_PASSWORD: 'VXRzYXZAMTIz',
  MYSQL_DATABASE_NAME: 'RGV2b3BzQXNzaWdubWVudA==',
}

const pool = mysql.createPool({
  host: process.env['DB_HOST'] || CONNECTION['DB_HOST'],
  port: process.env['DB_PORT'] || CONNECTION['DB_PORT'],
  user: process.env['MYSQL_USER'] || CONNECTION['MYSQL_USER'],
  password: process.env['MYSQL_ROOT_PASSWORD'] || Buffer.from(CONNECTION['MYSQL_ROOT_PASSWORD'], 'base64').toString('utf-8'),
  database: process.env['MYSQL_DATABASE_NAME'] || Buffer.from(CONNECTION['MYSQL_DATABASE_NAME'], 'base64').toString('utf-8')
});

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/getUsers', (req, res) => {
  // Get a connection from the pool
  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
      res.status(500).send('Error connecting to MySQL database');
      return;
    }

    // Query the APPUSER table
    connection.query('SELECT * FROM APPUSER', (queryError, results) => {
      connection.release(); // Release the connection back to the pool

      if (queryError) {
        console.error('Error querying APPUSER table:', queryError);
        res.status(500).send('Error querying APPUSER table');
      } else {
        console.log('Retrieved records from APPUSER table:', results);
        res.send(results);
      }
    });
  });
});


app.post('/addUsers', async (req, res) => {
  const users = req.body.users;
  try {
    const result = await insertRecords(users);
    res.send(`Inserted ${result} records into APPUSER table`);
  } catch (error) {
    res.status(500).send('Error inserting records into APPUSER table');
  }
});



// utility to insert records
const insertRecords = (data) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
      if (error) {
        console.error('Error connecting to MySQL database:', error);
        reject(error);
      } else {
        // Prepare the records to be inserted
        const records = data.map((user) => [user.name]);

        // Insert records into the APPUSER table
        const query = 'INSERT INTO APPUSER (name) VALUES ?';
        connection.query(query, [records], (queryError, results) => {
          connection.release();
          if (queryError) {
            console.error('Error inserting records into APPUSER table:', queryError);
            reject(queryError);
          } else {
            console.log('Inserted records into APPUSER table:', results.affectedRows);
            resolve(results.affectedRows);
          }
        });
      }
    });
  });
};


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
