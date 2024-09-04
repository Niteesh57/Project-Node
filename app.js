const exp = require('express');
const fs = require('fs');
const app = exp();

app.set('view engine', 'ejs');
app.use(exp.static('public'));
app.use(exp.urlencoded({ extended: true }));

// Home route - login page
app.get('/', (req, res) => {
    res.render('./Auth/login.ejs');
});

// Registration route
app.get('/register', (req, res) => {
    res.render('./Auth/signup.ejs');
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'admin') {
        fs.readFile('./views/data/data.json', 'utf8', (err, data) => {
            if (err) {
                console.error("Failed to read data.json:", err);
                return res.status(500).send("Server Error: Unable to read data.");
            } 
            
            let users;
            try {
                users = JSON.parse(data);
                console.log("Type of users:", typeof users);
                console.log("Is users an array?", Array.isArray(users));
            } catch (e) {
                console.error("Failed to parse JSON:", e);
                return res.status(500).send("Server Error: Failed to parse data.");
            }
            
            // Ensure users is an array
            if (Array.isArray(users)) {
                res.render('./Home/index.ejs', { data: users });
            } else {
                res.status(500).send("Error: Data is not an array.");
            }
        });
    } else {
        // Incorrect username or password
        res.render('./Auth/login.ejs', { error: "Invalid credentials" });
    }
});

// Logout route
app.post('/logout', (req, res) => {
    res.render('./Auth/login.ejs');
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('Page Not Found');
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
