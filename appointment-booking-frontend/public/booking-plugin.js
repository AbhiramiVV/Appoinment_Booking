(function() {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/react@17/umd/react.production.min.js';
    document.head.appendChild(script);
    
    const script2 = document.createElement('script');
    script2.src = 'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js';
    document.head.appendChild(script2);
  
    script2.onload = function() {
      const div = document.createElement('div');
      div.id = 'appointment-booking-plugin';
      document.body.appendChild(div);
      
      const React = window.React;
      const ReactDOM = window.ReactDOM;
  
      const App = () => {
        return React.createElement('h2', null, 'Plugin Loaded');
      };
  
      ReactDOM.render(React.createElement(App), div);
    };
  })();
  