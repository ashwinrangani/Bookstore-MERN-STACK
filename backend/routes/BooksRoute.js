import  express, { request, response }  from "express";
import { Book } from '../models/bookModel.js'

const router = express.Router();



//Route for save a new book
router.post('/', async (request,response) => {
    try {
     if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
     ) {
        return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear'
        })
     }   
     const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
     }
     const book = await Book.create(newBook);

     return response.status(201).send(book);
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message})
    }
})

//Route for a getting all books
router.get('/', async (request,response) => {
    try {
        const books = await Book.find({})
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})
//Route for Searching a book
router.get('/search', async (request, response) => {
    const { query } = request.query; // Get the search query from the request
  
    try {
      const results = await Book.find({
        $or: [
          { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
          { author: { $regex: query, $options: 'i' } }, // Case-insensitive author search
        ],
      });
  
      response.json(results);
    } catch (err) {
      console.error(err);
      response.status(500).json({ message: 'Server Error' });
    }
  });

//Route for get one book by id
router.get('/:id', async (request,response) => {
    try {
        const { id } = request.params;
        const books = await Book.findById(id)
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message})
    }
})

//Route for update a book
router.put('/:id', async (request,response) => {
    try {
     if(
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
     ) {
        return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear'
        })
     }   
     const { id } = request.params;
     const { title } = request.params;
     const result = await Book.findByIdAndUpdate(id, request.body);
     if(!result) {
        return response.status(404).json({ message: 'Book not found'});
    }
        return response.status(200).send({ message: 'Book updated successfully'});
     
     
    } catch (error) {
        console.log(error.message)
        response.status(500).send({ message: error.message})
    }
})

// Route for delete a book
router.delete('/:id', async (request,response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result){
            return response.status(404).json({ message: "Book not found"})
        }
            return response.status(200).send({message:"Book Deleted Successfully"})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message})
    }
})



export default router;