import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import KanbanBoard from './components/kanban-board/index.js';


const App  = () => {
  const title = "Kanban Board";
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <KanbanBoard/>
      </div>
    );
}

export default App;
