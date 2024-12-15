import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoComponent from '../component/TodoComponent'
import { useRecoilValue } from 'recoil';
import { authState } from '../Atoms';

// export const getRefreshData = (setTodos, setToggle, toggle) =>{
//   axios.get(`${process.env.SERVER_API}/todo/home`, {
//     // headers: {
//     //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
//     //   "Content-Type": 'application/json',
//     // }
//     withCredentials: true
//   })
//     .then(response => {
//       setTodos(response.data);
//       setToggle(!toggle);
//     })
//     .catch(error => {
//       console.error('Error fetching todos:', error);
//     }
//     )
// }

function Home() {
  const [todos, setTodos] = useState([]);
  const [added, setAdded] = useState(false)
  const auth = useRecoilValue(authState)
  const [toggle ,setToggle] = useState(false);
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
    // getRefreshData(setTodos, setToggle, toggle);

    axios.get(`${import.meta.env.VITE_SERVER_API}/todo/home`, {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      //   "Content-Type": 'application/json',
      // }
      withCredentials: true
    })
      .then(response => {
        setTodos(response.data);
      })
      .catch(() => {
        setTodos('');
      }
      )
  }, [toggle]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_API}/todo/home`, formData, 
        {
          // headers: {
          //   Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          //   "Content-Type": 'application/json',
          // }
            withCredentials: true
        }
      );
      if(response.status = 200){
        setFormData({
          title: '',
          content: ''
        });
        setAdded(true);
        setToggle(!toggle);
        setTimeout(() => {
          setAdded(false)
        }, 1000);
      }
    }
    catch(err) {
    }
  }
  return (
    <>
      <div className=' flex flex-row justify-center mt-28 min-h-screen'>
        <div className='md:w-1/2 w-[90%] flex flex-col items-center'>
          <h1 className='text-custom-blue md:text-3xl text-xl my-5'>Hello! {auth.userName}</h1>
          <div className='w-full'>
            <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-md space-y-4 ">
              
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
          {/* <>
          <TodoComponent key={1} id={1} name="Quick Tasks" content="Jot down and complete simple tasks that take five minutes or less."/>
          </> */}
          

        {todos.length == 0 ?(
          <p>No todos yet !</p>
        ):(
          todos.map((todo, index) => (
            <TodoComponent
              key={todo.id}
              id={todo.id}
              name={todo.title}
              content={todo.content}
              setTodos={setTodos} 
              setToggle={setToggle}
              toggle={toggle} />
          ))
        )}

        </div>
      </div>
    </>
  )
}

export default Home;