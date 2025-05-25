import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

const { urlencoded } = bodyParser;
const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(morgan("tiny"));


let posts = []; 

app.get('/', (req, res) => {
    res.render('index.ejs', { posts });
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Handle new post submission
app.post('/new', (req, res) => {
    const newPost = {
        id: Date.now(), // Simple unique ID
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);
    res.redirect('/');
});

// Form to edit a post
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit.ejs', { post });
});

app.post('/edit/:id', (req, res) => {
    posts = posts.map(p => {
        if (p.id == req.params.id) {
            return {
                ...p,
                title: req.body.title,
                content: req.body.content
            };
        }
        return p;
    });
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
