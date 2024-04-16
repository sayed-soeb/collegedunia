import React, { useState, useEffect } from 'react';
import './style.css'; // Stylesheet for the table

const dummyData = [
    { id: 1, name: 'Indian Institute of Technology Bombay', ranking: 1, rating: 4.5, fees: 150000, userRating: 4.2, featured: true },
    { id: 2, name: 'Delhi University', ranking: 2, rating: 4.3, fees: 50000, userRating: 4.0, featured: false },
    { id: 3, name: 'Indian Institute of Management Ahmedabad', ranking: 3, rating: 4.7, fees: 200000, userRating: 4.6, featured: true },
    { id: 4, name: 'Jawaharlal Nehru University', ranking: 4, rating: 4.0, fees: 30000, userRating: 3.8, featured: false },
    { id: 5, name: 'Banaras Hindu University', ranking: 5, rating: 4.2, fees: 40000, userRating: 4.1, featured: false },
    { id: 6, name: 'University of Mumbai', ranking: 6, rating: 4.1, fees: 60000, userRating: 3.9, featured: false },
    { id: 7, name: 'Indian Institute of Technology Delhi', ranking: 7, rating: 4.6, fees: 180000, userRating: 4.4, featured: true },
    { id: 8, name: 'University of Calcutta', ranking: 8, rating: 4.0, fees: 45000, userRating: 3.7, featured: false },
    { id: 9, name: 'Anna University', ranking: 9, rating: 4.4, fees: 120000, userRating: 4.3, featured: true },
    { id: 10, name: 'Indian Institute of Science Bangalore', ranking: 10, rating: 4.8, fees: 250000, userRating: 4.7, featured: true },
    { id: 11, name: 'University of Delhi', ranking: 11, rating: 4.2, fees: 55000, userRating: 4.0, featured: false },
    { id: 12, name: 'Indian Institute of Technology Madras', ranking: 12, rating: 4.6, fees: 160000, userRating: 4.5, featured: true },
    { id: 13, name: 'University of Pune', ranking: 13, rating: 4.1, fees: 50000, userRating: 3.8, featured: false },
    { id: 14, name: 'Indian Institute of Management Bangalore', ranking: 14, rating: 4.7, fees: 220000, userRating: 4.6, featured: true },
    { id: 15, name: 'University of Hyderabad', ranking: 15, rating: 4.3, fees: 70000, userRating: 4.2, featured: false },
  ];

const Table = () => {
    const [colleges, setColleges] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [searchTerm, setSearchTerm] = useState('');
    const [displayedColleges, setDisplayedColleges] = useState([]);
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
  
    useEffect(() => {
      setColleges(dummyData);
    }, []);
  
    useEffect(() => {
      if (sortConfig.key) {
        const sortedColleges = [...colleges].sort((a, b) => {
          if (sortConfig.key === 'ranking') {
            return sortConfig.direction === 'ascending' ? a.ranking - b.ranking : b.ranking - a.ranking;
          } else {
            if (a[sortConfig.key] < b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
              return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
          }
        });
        setDisplayedColleges(sortedColleges);
      } else {
        setDisplayedColleges(colleges);
      }
    }, [sortConfig, colleges]);
  
    useEffect(() => {
      if (searchTerm) {
        const filteredColleges = colleges.filter(college =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setDisplayedColleges(filteredColleges);
      } else {
        setDisplayedColleges(colleges);
      }
    }, [searchTerm, colleges]);
  
    useEffect(() => {
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      setDisplayedColleges(colleges.slice(startIndex, endIndex));
    }, [colleges, perPage, page]);
  
    const handleScroll = (e) => {
      const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
      if (bottom) {
        setPerPage(prevPerPage => prevPerPage + 10);
      }
    };
  
    const handleSort = (key) => {
      if (key === 'ranking') {
        setSortConfig({
          key,
          direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
        });
      } else {
        if (sortConfig.key === key) {
          setSortConfig({
            ...sortConfig,
            direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending'
          });
        } else {
          setSortConfig({ key, direction: 'ascending' });
        }
      }
    };
  
    return (
      <div className="container">
        <input
          type="text"
          placeholder="Search by college name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <table onScroll={handleScroll}>
          <thead>
            <tr>
              <th onClick={() => handleSort('ranking')}>Ranking</th>
              <th onClick={() => handleSort('name')}>College Name</th>
              <th onClick={() => handleSort('rating')}>Rating</th>
              <th onClick={() => handleSort('fees')}>Fees</th>
              <th onClick={() => handleSort('userRating')}>User Rating</th>
              <th>Featured</th>
            </tr>
          </thead>
          <tbody>
            {displayedColleges.map(college => (
              <tr key={college.id} className={college.featured ? 'featured' : ''}>
                <td>
                    #{college.ranking}</td>
                <td className={college.featured ? 'featured-name' : ''}>
                {college.featured && (
                  <div className="featured-label">Featured</div>
                )}
                {college.name}</td>
                <td>{college.rating}</td>
                <td>{college.fees}<br />
                <p className='fees'>BE/B.Tech<br />
                -1st Year Fees</p></td>
                <td>{college.userRating}/5<br />
                <p className='fees'>Based on reviews<br />
                by students</p>
                </td>
                <td>{college.featured ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Table;