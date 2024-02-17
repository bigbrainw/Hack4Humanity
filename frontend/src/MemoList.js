import React, { useState, useEffect } from 'react';


function MemoList() {
    const [memos, setMemos] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://127.0.0.1:5000/memos')
        .then(response => response.json())
        .then(data => {
          setMemos(data);
          setLoading(false); // Set loading to false when data is fetched
        })
        .catch(error => {
          console.error('Error fetching memos:', error);
          setLoading(false); // Also set loading to false in case of error
        });
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h2>Memo List</h2>
        <ul>
          {memos.map(memo => (
            <li key={memo.id}>{memo.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  export default MemoList;