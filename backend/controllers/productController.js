const { STRAPI_URL } = require('../config/constants');

const fetchFromStrapi = async (endpoint) => {
  const response = await fetch(`${STRAPI_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${process.env.STRAPI_TOKEN}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status}`);
  }
  
  return response.json();
};

const getArtClasses = async (req, res) => {
  try {
    const data = await fetchFromStrapi('/api/art-classes');
    res.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Error fetching art classes:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch art classes',
      details: error.message 
    });
  }
};

const getSmallGifts = async (req, res) => {
  try {
    const data = await fetchFromStrapi('/api/small-gifts');
    res.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Error fetching small gifts:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch small gifts',
      details: error.message 
    });
  }
};

const getArtSupplies = async (req, res) => {
  try {
    const data = await fetchFromStrapi('/api/art-supplies');
    res.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Error fetching art supplies:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch art supplies',
      details: error.message 
    });
  }
};

const getReturnGifts = async (req, res) => {
  try {
    const data = await fetchFromStrapi('/api/return-gifts');
    res.json({ success: true, data: data.data });
  } catch (error) {
    console.error('Error fetching return gifts:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch return gifts',
      details: error.message 
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    
    let endpoints = [];
    
    if (!category) {
      endpoints = [
        '/api/art-classes',
        '/api/small-gifts',
        '/api/art-supplies',
        '/api/return-gifts'
      ];
    } else {
      switch(category) {
        case 'classes':
          endpoints = ['/api/art-classes'];
          break;
        case 'gifts':
          endpoints = ['/api/small-gifts'];
          break;
        case 'supplies':
          endpoints = ['/api/art-supplies'];
          break;
        case 'return-gifts':
          endpoints = ['/api/return-gifts'];
          break;
        default:
          endpoints = ['/api/art-classes'];
      }
    }
    
    const responses = await Promise.all(
      endpoints.map(endpoint => fetchFromStrapi(endpoint))
    );
    
    const allData = responses.flatMap(item => item.data);
    
    res.json({ success: true, data: allData });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch products',
      details: error.message 
    });
  }
};

module.exports = {
  getArtClasses,
  getSmallGifts,
  getArtSupplies,
  getReturnGifts,
  getAllProducts
};