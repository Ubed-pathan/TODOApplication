import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoComponent from '../component/TodoComponent'

function Home() {
  const [todos, setTodos] = useState([]);
  const [added, setAdded] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    axios.get('http://localhost:8081/todo/home')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      }
      )
  }, [todos]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/todo/home', formData, 
        {
          withCredentials: true 
        }
      );
      if(response.status = 200){
        setFormData({
          title: '',
          content: ''
        });
        setAdded(true);

        setTimeout(() => {
          setAdded(false)
        }, 1000);
      }
    }
    catch(err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className=' flex flex-row justify-center mt-28 min-h-screen'>
        <div className='w-1/2 flex flex-col items-center'>

          <div className='w-full'>
            <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-md space-y-4">
              
              <div className="flex flex-row justify-center">
              {added ? (
                  <>
                  <div className='text-2xl font-medium text-custom-blue mb-4'>Added successfully !</div>
                  </>
                ):(
                  <>
                  <div className='text-2xl font-medium text-custom-blue mb-4'>Add New Todo</div>
                  </>
                )
              }
              </div>
              {/* Title Input */}
              <div className="flex flex-col">
                <label htmlFor="title" className="text-sm font-semibold mb-1">Title</label>
                <input
                  id="title"
                  type="text"
                  name='title'
                  placeholder="Enter title"
                  required
                  className='p-2 text-custom-blue border-2 border-gray-300 rounded-md w-full'
                  maxLength={50}
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>

              {/* Content Input */}
              <div className="flex flex-col">
                <label htmlFor="content" className="text-sm font-semibold mb-1">Content</label>
                <textarea
                  id="content"
                  type="text"
                  name='content'
                  placeholder="Enter content"
                  className='p-2 text-custom-blue border-2 border-gray-300 rounded-md w-full h-24 resize-none'
                  required
                  maxLength={150}
                  value={formData.content}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
              type="submit"
              className='bg-custom-blue p-2 text-white text-sm rounded-lg cursor-pointer w-full'>
                Add Todo
              </button>
            </form>
          </div>
          <div className='text-custom-red text-2xl font-medium mt-10'> TODO LIST</div>
          <hr className="border-t-2 w-1/2 border-custom-red pb-10" />

          {todos.map((todo, index) => (
            <TodoComponent
              key={todo.id}
              id={todo.id}
              name={todo.title}
              content={todo.content} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home;