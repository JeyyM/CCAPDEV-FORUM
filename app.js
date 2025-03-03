const express = require('express');
const mongo = require('./model/dbFunctions');
const session = require('express-session');
const bodyParser = require('body-parser')

const fs = require('fs');
const path = require('path');

const server = express();

server.use(session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));

server.use(express.json()); 
server.use(express.urlencoded({ extended: true }));

const handlebars = require('express-handlebars');
server.set('view engine', 'hbs');
server.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

server.use(express.static('public'));

function getCSSFiles() {
    const stylesDir = path.join(__dirname, 'public/styles');
    return fs.readdirSync(stylesDir)
        .filter(file => file.endsWith('.css'))
        .map(file => `/styles/${file}`);
}

server.use((req, res, next) => {
    res.locals.cssFiles = getCSSFiles();
    next();
});


mongo.initializeDB();
mongo.insertSampleForum();
mongo.insertSampleUser();

server.get('/', async function(req, resp){
    resp.render('main',{
        layout: 'index',
        title: 'Home Page',
    });
});

server.get('/tester', async function(req, resp){
    resp.render('tester',{
        layout: 'tester',
        title: 'Tester',
    });
});

server.get('/api/get-forums', async (req, res) => {
    try {
        const forums = await mongo.getForums();
        res.json(forums);
        // console.log("Forums fetched:", forums);

    } catch (error) {
        console.error("Error fetching forums:", error);
        res.status(500).json({ error: "Error fetching forums" });
    }
});

server.patch('/api/update-forum/:forumId', async (req, res) => {
    try {
        const forumId = req.params.forumId;
        const updatedData = req.body;

        console.log("Updating forum: ", { forumId, updatedData });
        const result = await mongo.updateForum(forumId, updatedData);
        console.log("Update result:", result);

        if (result) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating forum" });
    }
});



server.put('/api/update-forums', async (req, res) => {
    try {
        console.log("Updating multiple forums:", req.body.forums);
        const result = await mongo.updateForums(req.body.forums);
        console.log("Update multiple forums result:", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error updating forums" });
    }
});

server.post('/api/add-forum', async (req, res) => {
    try {
        const forumData = req.body;

        console.log("Adding forum:", forumData);
        const result = await mongo.addForum(forumData);
        console.log("Add forum result:", result);

        if (result) {
            res.json({ message: "Forum added successfully" });
        } else {
            res.status(500).json({ error: "Error adding forum" });
        }
    } catch (error) {
        console.error("Error adding forum: ", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


server.delete('/api/delete-forum/:forumId', async (req, res) => {
    try {
        console.log("Deleting forum:", req.params.forumId);
        const result = await mongo.deleteForum(req.params.forumId);
        console.log("Delete forum result:", result);

        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(500).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error: "Error deleting forum" });
    }
});


server.get('/forum/:forumName', async (req, resp) => {
    try {
        const decodedForumName = decodeURIComponent(req.params.forumName);

        const forum = await mongo.getForumByName(decodedForumName);

        // if (!forum) {
        //     return resp.status(404).render('notFound', {
        //         layout: 'index',
        //         title: 'Forum Not Found',
        //         message: `No forum found with the name "${decodedForumName}".`
        //     });
        // }

        resp.render('forum', {
            layout: 'forumLayout',
            title: forum.name,
            forumName: forum.name,
            description: forum.description,
            forumImage: forum.forumImage,
            bannerImage: forum.bannerImage,
            createdAt: forum.createdAt.toDateString(),
            membersCount: forum.membersCount,
            postsCount: forum.postsCount
        });

    } catch (error) {
        console.error("Error fetching forum: ", error);
        // resp.status(500).render('error', {
        //     layout: 'index',
        //     title: 'Error',
        //     message: 'An error occurred while loading the forum.'
        // });
    }
});


const port = process.env.PORT | 3000;
server.listen(port, function(){
    console.log('Listening at port '+port);
});

