const helmet = require('helmet');

module.exports = helmet({
  xssFilter: true,

  frameguard: {
    action: 'deny'
  },
  
  contentTypeNosniff: true,
  
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],  
      scriptSrc: ["'self'", "'unsafe-inline'"],  
      styleSrc: ["'self'", "'unsafe-inline'"],  
      imgSrc: ["'self'", "data:", "https:"],     
      connectSrc: ["'self'", "http://localhost:5001"], 
    }
  },
  
  hsts: {
    maxAge: 31536000,        
    includeSubDomains: true,
    preload: true
  },
  
  noSniff: true,
  
  dnsPrefetchControl: {
    allow: false
  }
}); 