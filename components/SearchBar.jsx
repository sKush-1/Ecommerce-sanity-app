import React from 'react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';
import { client } from '@/lib/client';

const SearchBar = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
  
    useEffect(() => {
      if (searchTerm.trim() !== '') {
        client
          .fetch(
            `*[_type == 'product' && name match '${searchTerm}*']{
              _id,
              name,
              slug,
              image,
              price,
              details
            }`
          )
          .then((data) => setSearchResults(data))
          .catch((error) => console.error('Error fetching data:', error));
      } else {
        setSearchResults([]);
      }
    }, [searchTerm]);
  
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
    };

  return (
    <div>
    <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Search products..." />
    {searchResults.length > 0 && (
      <ul>
        {searchResults.map((product) => (
          <li key={product._id}>
            <Link href={`/product/${product.slug.current}`}>
              
                <img id='search-image' src={urlFor(product.image[0])} alt={product.name} />
                <span>{product.name}</span>
              
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default SearchBar
