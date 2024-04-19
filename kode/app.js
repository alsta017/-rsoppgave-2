// |--------------------|
// |---MODULER OG APP---|
// |--------------------|
// Node modules
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const { connect } = require("http2");
const app = express();
const port = 80;
const baseDir = __dirname || process.cwd();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// cors
app.use(cors());

// Cookies i req.cookies
app.use(cookieParser());

// Data i http request
app.use(bodyParser.urlencoded({ extended: true }));

// Bruke data i req.body
app.use(express.json());

// Bruk forms i req.body
app.use(express.urlencoded({ extended: true }));

// Bruk mappe "/src" (html, css, js)
app.use('/src', express.static(path.join(__dirname + '/src')));

// Bruk session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));

// Mariadb
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'IMKuben1337!',
  database: 'årsoppgave2'
});

// -----
// SIDER
// -----

// Når man først åpner siden
app.get("/", function(req, res) {
  
  if(!req.session.isLoggedIn) {
    res.clearCookie('loggedin')
    res.clearCookie('username')
    res.cookie('loggedin', 'false')
    req.session.isLoggedIn = false;
    req.session.username = "";
  }
  if(req.session.isLoggedIn === false) {
    res.clearCookie('loggedin');
    res.clearCookie('username');
    res.cookie('loggedin', 'false');
  }
  // Send index.html
  res.sendFile(__dirname + '/src/html/index.html');
});
// Upload
app.get("/upload", function(req, res) {
  if(req.session.isLoggedIn === true) {
    res.sendFile(__dirname + '/src/html/upload.html');
  } else {
    res.cookie('responsecode', 'U_R');
    res.redirect("/login")
  }
  // Send upload.html
  
});

app.get("/login", function(req, res) {
  res.sendFile(__dirname + '/src/html/login.html');
});

app.post("/loginauth", function(req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
      connection.query('SELECT * from usernamepassword WHERE username = ?', [username], function(err, result, fields) {
          if (err) throw err;

          if (result.length > 0) {
              bcrypt.compare(password, result[0].password, function(err, passwordMatch) {
                  if (err) throw err;

                  if (passwordMatch) {
                      req.session.isLoggedIn = true;
                      req.session.username = username;
                      req.session.userId = result[0].id; // Store user ID in session
                      res.clearCookie('loggedin');
                      res.clearCookie('username');
                      res.cookie('loggedin', 'true');
                      res.cookie('username', username);
                      res.cookie('responsecode', 'LS');
                      res.clearCookie('errormessage');
                      res.redirect("/");
                  }
                  else {
                      res.cookie('errormessage', 'u_p');
                      res.cookie('responsecode', 'LF1');
                      res.redirect('/login');
                  }
              });
          } else {
              res.cookie('responsecode', 'LF2');
              res.redirect('/login');
          }
      });
  } else {
      res.cookie('responsecode', 'LF3');
      res.redirect('/login');
  }
});

app.get("/register", function(req, res) {
  res.sendFile(__dirname + '/src/html/register.html');
});

app.post("/registerauth", function(req, res) {

  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    connection.query('SELECT * from usernamepassword WHERE username = ?', [username], function(err, result, fields) {
      if (err) throw err;

      if (result.length > 0) {
        res.cookie('responsecode', 'RF_1')

        res.redirect('/register')

      } else {
        bcrypt.hash(password, 2, function(err, hash) {
          if (err) throw err;

          var values = [
            [username, hash]
          ];

          connection.query('INSERT INTO usernamepassword (username, password) VALUES ?', [values], function(err, result) {
            if (err) throw err;

            res.cookie('responsecode', 'RS');
            res.redirect('/login');
          })
        })
      }
    })
  } else {
    res.cookie('responsecode', 'RF_2');
    res.redirect('/register');
  }
})

app.get("/logout", function(req, res) {
  req.session.isLoggedIn = false;
  req.session.username = "";
  res.clearCookie('loggedin');
  res.clearCookie('username');
  res.cookie('loggedin', 'false');
  res.clearCookie('errormessage');
  res.redirect("/");
})

app.get("/account", function(req, res) {
  res.sendFile(__dirname + '/src/html/account.html')
})

app.get("/deleteconfirm", function(req, res) {
  if(req.session.isLoggedIn == "true") {
    connection.query('DELETE FROM usernamepassword WHERE username = ?', req.session.username, function(err, result) {
      if (err) throw err;
    })
  }
  res.redirect("/");
})

// Når send til home gå til hjemmeside
app.get("/home", function(req, res) {
  res.redirect("/");
});
// Filer

// Når filen blir uploaded

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const query = 'SELECT * FROM usernamepassword WHERE username = ?';
    const username = req.session.username;
  
    connection.query(query, [username], function (err, results) {
      if (err) {
        return cb(err);
      }
  
      if (results.length === 0) {
        return cb(new Error('User not found in the database'));
      }
  
      const userId = String(results[0].id); // Convert userId to string
  
      if (!userId) {
        return cb(new Error('User ID not available in the database'));
      }
  
      const userFolderPath = path.join(__dirname, "files", userId);
  
      if (!fs.existsSync(userFolderPath)) {
        fs.mkdirSync(userFolderPath);
      }
  
      cb(null, userFolderPath);
    });
  },
  filename: function (req, file, cb) {
    const parsed = path.parse(file.originalname);
    const normalized = parsed.name.replace(/\s+/g, '-').toLowerCase();
    const extension = parsed.ext;
    cb(null, normalized + extension);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), function (req, res, next) {
  res.cookie('uploadstatus', 'r');
  res.redirect("/upload");
});

// Route to display uploaded files
app.get("/files", function(req, res) {
  // Retrieve userId from session
  if(req.session.isLoggedIn == true) {
    const username = req.session.username;
    const query = 'SELECT * FROM usernamepassword WHERE username = ?';
    
    connection.query(query, [username], function (err, results) {
      if (err) {
        // Handle database query error
        console.error("Error querying database:", err);
        return res.status(500).send('Internal Server Error');
      }
  
      if (results.length === 0) {
        res.redirect("/login");
      }
  
      const userId = String(results[0].id); // Convert userId to string
  
      // Define the directory where files are uploaded
      const userFolderPath = path.join(__dirname, "files", userId);
  
      // Read the contents of the directory
      fs.readdir(userFolderPath, (err, files) => {
        if (err) {
          // Handle directory read error
          return res.redirect("/")
        }
  
        // Read the HTML file
        fs.readFile(path.join(__dirname, '/src/html/files.html'), 'utf8', (err, html) => {
          if (err) {
            // Handle file read error
            console.error("Error reading HTML file:", err);
            return res.status(500).send('Internal Server Error');
          }
  
          // Replace placeholder in HTML with files array
          res.cookie("files", JSON.stringify(files));
  
          // Send the modified HTML file to the client
          res.send(html);
        });
      });
    });
  } else {
    res.cookie('responsecode', 'U_S');
    res.redirect("/login");
  }
});

app.get('/download/:filename', function(req, res) {
  // Retrieve filename from request parameters
  const filename = req.params.filename;

  const username = req.session.username;
  const query = 'SELECT * FROM usernamepassword WHERE username = ?';
  
  connection.query(query, [username], function (err, results) {
    if (err) {
      // Handle database query error
      console.error("Error querying database:", err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      // Handle user not found error
      res.redirect("/login");
    }

    const userId = String(results[0].id); // Convert userId to string
    const filePath = path.join(__dirname, "files", userId, filename);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File does not exist
        return res.status(404).send('File not found');
      }

    // Send the file for download
    res.download(filePath);
    });
  });
});

app.delete('/delete/:filename', function(req, res) {
  if (!req.session.isLoggedIn) {
    return res.status(403).json({ message: 'Not logged in' });
  }

  const username = req.session.username;
  const { filename } = req.params;

  connection.query('SELECT id FROM usernamepassword WHERE username = ?', [username], function (err, results) {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userId = String(results[0].id);
    const filePath = path.join(__dirname, 'files', userId, filename);

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting file', error: err });
      }

      res.status(200).json({ message: 'File deleted successfully', ok: true });
    });
  });
});

app.get("/shop", function (req, res) {
  res.sendFile(__dirname + '/src/html/shop.html')
}); 

app.get('/sharelink/:filename', function(req, res) {
  if (!req.session.isLoggedIn || !req.session.userId) {
      res.status(403).json({ error: "Not logged in or session expired" });
      return;
  }

  const filename = req.params.filename;
  const userId = req.session.userId; // Make sure userId is available in the session
  const link = `${req.protocol}://${req.get('host')}/preview/${userId}/${encodeURIComponent(filename)}`;

  res.json({ link: link });
});

app.get('/preview/:userId/:filename', (req, res) => {
  const { userId, filename } = req.params;
  const filePath = path.join(__dirname, 'files', userId, filename);

  if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
  }

  // Serve the file directly; we'll handle display client-side
  res.sendFile(filePath);
});

app.get('/filepreview', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/html/filepreview.html'));
});

app.get('/account/changepassword', function(req, res) {
  res.sendFile(path.join(__dirname + '/src/html/changepassword.html'));
});

//1. hente brukerens id fra db 
//2. sette directories basert på brukerens id slik at filer kan be assosiert med brukeren den tilhører
