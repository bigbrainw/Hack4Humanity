import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

function AddMemo() {
  const [memoContent, setMemoContent] = useState('');
  const [size, setSize] = useState({ width: 200, height: 200 }); // Initial size of the memo

  const handleResize = (event, { size }) => {
    setSize(size);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:5000/memo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: memoContent })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Memo added:', data);
    })
    .catch(error => {
      console.error('Error adding memo:', error);
    });
  };

  return (
    <Draggable>
      <Resizable
        size={size}
        onResize={handleResize}
        minConstraints={[100, 100]} // Minimum size of the memo
        maxConstraints={[500, 500]} // Maximum size of the memo
      >
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: size.width, height: size.height }}>
          <h2>Add Memo</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={memoContent}
              onChange={(event) => setMemoContent(event.target.value)}
              rows={4}
              cols={20}
              placeholder="Enter memo content"
              required
            />
            <br />
            <button type="submit">Add Memo</button>
          </form>
        </div>
      </Resizable>
    </Draggable>
  );
}

export default AddMemo;
