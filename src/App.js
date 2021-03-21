import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { FaTimes } from 'react-icons/fa'


function App() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchComments();
  }, [])

  const fetchComments = () => {
    Axios.get('http://localhost:8000/comment').then((response) => {
      //console.log(response.data);
      setComments(response.data);
    })
  }

  const deleteComment = (id) => {
    Axios.delete(`http://localhost:8000/comment/${id}`).then((resp) => {
      console.log(resp);  
      setComments(resp.data.result);
    })
  }

  return (
    <div className="container">
      <h2 className="title">Comments Page</h2>
      <div>
        <ul>
          <li> id</li>
          <li>Comment</li>
          <li>postid</li>
               <li>To delete</li>  
              </ul>    
      {comments.map((val) =>{
        return <ul>
                <li>{val.id}</li>
                <li>{val.body}</li>
                <li>{val.postId}</li>
                <li><FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => {
                    console.log(`clicked ${val.id}`)
                    deleteComment(val.id)
                  }}/></li>  
              </ul>    
      })}
      
         
      </div>
    </div>
  );
}

export default App;
