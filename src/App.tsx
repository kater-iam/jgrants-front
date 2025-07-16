import React, { useState } from 'react'
import JGrantsClient from './components/JGrantsClient'
import GitHubCorner from './components/GitHubCorner'

function App() {
  return (
    <div className="App">
      <GitHubCorner />
      <header className="header">
        <div className="container">
          <h1>J-Grants API Frontend</h1>
          <p>補助金情報検索システム</p>
        </div>
      </header>
      <main className="container">
        <JGrantsClient />
      </main>
    </div>
  )
}

export default App