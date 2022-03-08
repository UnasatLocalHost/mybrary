const express = require("express");
const author = require("../models/author");
const router = express.Router();

//import the author

const Author = require("../models/author");

// routes for all authors

router.get("/", async(req, resp) => {
   let searchOptions= {}
   if(req.query.name !=null && req.query.name !=='') {
       searchOptions.name = new RegExp(req.query.name, 'i')
   }
    try{
      const authors = await Author.find({searchOptions })
      resp.render("authors/index",{
        authors: authors, 
        searchOptions: req.query
    });
    }catch{
         resp.redirect('/')
    }
 
});

//route for a new author entry(display purpose)

router.get("/new", (req, resp) => {
  resp.render("authors/new", { author: new Author() });
});

//creating the new author route via POST
let locals = { errorMessage: `something went wrong` };

router.post("/", async(req, resp) => {
  const author = new Author({
    name: req.body.name,
  });

  try{
       const newAuthor = await author.save()
        // resp.redirect(`authors/${newAuthor.id}`)
      resp.redirect(`authors`);
  }catch{
       resp.render('authors/new',{
           author:author,
           locals
       })
  }
//   author.save((err, newAuthor) => {
//     if (err) {
//       resp.render("authors/new", {
//         author: author,
//         locals
//       });
//     } else {
//       // resp.redirect(`authors/${newAuthor.id}`)
//       resp.redirect(`authors`);
//     }
//   });
});

module.exports = router;
