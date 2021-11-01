import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const App = () => {
  const [input, setInput] = useState();

  return (
    <div
      style={styles.appContainer}
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    >
      <textarea autoFocus style={styles.textArea} />
      <div style={styles.markdownArea}>
        <ReactMarkdown
          children={input}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={docco}
                  language={match[1]}
                  PreTag='div'
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
  },

  textArea: {
    width: '50%',
    height: '100%',
    padding: 20,
    fontSize: '1.5rem',
    outline: 'none',
  },

  markdownArea: {
    width: '50%',
    height: '100%',
    padding: 20,
    outline: 'none',
  },
};

export default App;
