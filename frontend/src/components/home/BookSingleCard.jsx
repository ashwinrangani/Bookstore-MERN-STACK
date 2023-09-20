import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineEdit, AiFillEye } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";

import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";


function BookSingleCard({book}) {
    const [showModal, setShowModal] = useState(false)
  return (
    <div
          key={book._id}
          className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl"
        >
          <h2 className="absolute top-1 right-2 px-2 py-1 bg-red-300 rounded-lg">
            {book.publishYear}
          </h2>
          <h4 className="my-2 text-gray-bold-600">{book._id}</h4>
          <div className="flex justify-start items-center gap-x-2">
            <PiBookOpenTextLight className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.title}</h2>
          </div>
          <div className="flex justify-start items-center gap-x-2">
            <BsPerson className="text-red-300 text-2xl" />
            <h2 className="my-1">{book.author}</h2>
          </div>
          <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
            <AiFillEye 
                    className='text-3xl text-blue-800 hover:text-black cursor-pointer'
                    onClick={() => setShowModal(true)} />
            <Link to={`/books/details/${book._id}`}>
              <BsInfoCircle className="text-2xl text-green-800 hover:text-black" />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <AiOutlineEdit className="text-2xl text-yellow-600 hover:text-black" />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <MdOutlineDelete className="text-2xl text-red-600 hover:text-black" />
            </Link>
          </div>
            {showModal && (
                <BookModal book={book} onClose={() => setShowModal(false)} />
            )}
        </div>
  )
}

export default BookSingleCard