import React, { useState, useEffect } from 'react';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });

  // Function to fetch quote from API
  const fetchQuote = async () => {
    try {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      setQuote({ content: data.content, author: data.author });
    } catch (error) {
      setQuote({ content: 'Failed to fetch quote.', author: '' });
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchQuote(); // initial load
    const intervalId = setInterval(fetchQuote, 30000); // 30 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <div style={styles.container}>
      <h2>Daily Quote Generator</h2>
      <div style={styles.quoteBox}>
        <p style={styles.content}>"{quote.content}"</p>
        <p style={styles.author}>— {quote.author}</p>
      </div>
      <button onClick={fetchQuote} style={styles.button}>
        Get New Quote
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
    padding: '20px',
    background: '#fdfdfd',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  quoteBox: {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  content: {
    fontSize: '1.3rem',
    fontStyle: 'italic',
    marginBottom: '10px'
  },
  author: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#555'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px'
  }
};

export default QuoteGenerator;
