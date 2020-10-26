import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [messages, setMessages] = useState([{
    content : 'First message'
  },{
    content : 'Second message'
  }])
  const addMessage = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setMessages([
      ...messages,
      {content: data.get('content')}
    ])
    e.target.elements.content.value = ''
  }
  return (
    <div className="App">
      <header className="App-header">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
       header
      </header>
      <main className="App-main" onSubmit={addMessage}>
      <div class="row">
      <div class='col'>
        Channels
      </div>
        <div class='col'>
          Messages
          <ul>
            {messages.map((message,i) => (
              <li key={i}>{message.content}</li>
            ))}
          </ul>
          <form>
              <input type="input" name="content" />
              <input type="submit" value="Send"/>
          </form>
        </div>

      </div>
    </main>
  </div>
  );
}

export default App;
