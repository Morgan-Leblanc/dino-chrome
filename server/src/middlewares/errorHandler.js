export const notFoundHandler = (req, res) => {
    res.status(404).json({ 
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`
    });
  };
  
  export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    
    res.status(status).json({ 
      error: message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  };