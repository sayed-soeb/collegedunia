import React, { useState, useEffect } from 'react';
import './style.css'; // Stylesheet for the table

const dummyData = [
    { id: 1, name: 'Indian Institute of Technology Bombay',
    logo:"https://www.drupal.org/files/styles/grid-4-2x/public/iitblogo.png?itok=GvvDLvZf",ranking: 1, rating: 4.5, fees: 150000, userRating: 4.2, featured: true },
    { id: 2, name: 'Delhi University',
    logo:"https://seeklogo.com/images/U/university-of-delhi-logo-3DE170CB5E-seeklogo.com.png", ranking: 2, rating: 4.3, fees: 50000, userRating: 4.0, featured: false },
    { id: 3, name: 'Indian Institute of Management Ahmedabad',logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8DMZrWw2JZosNOuj4d6SLBIuyzewL9oMGEg&s", ranking: 3, rating: 4.7, fees: 200000, userRating: 4.6, featured: true },
    { id: 4, name: 'Jawaharlal Nehru University',logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVI4XJYGhTfXRl2G49O9AGAHV9E7Yu3lLzywNKQFE8OQ&s", ranking: 4, rating: 4.0, fees: 30000, userRating: 3.8, featured: false },
    { id: 5, name: 'Banaras Hindu University',logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU_dyOPcZq5ve-UoglgXRbg-4QGzII3Djkry9K5dPumg&s", ranking: 5, rating: 4.2, fees: 40000, userRating: 4.1, featured: false },
    { id: 6, name: 'University of Mumbai',logo:"https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/University_of_Mumbai_coat_of_arms.svg/1200px-University_of_Mumbai_coat_of_arms.svg.png", ranking: 6, rating: 4.1, fees: 60000, userRating: 3.9, featured: false },
    { id: 7, name: 'Indian Institute of Technology Delhi',logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqzf9SyT0oZEYAT2LZo-nGm8b9fiT_n-ICnsWQuXdv2A&s", ranking: 7, rating: 4.6, fees: 180000, userRating: 4.4, featured: true },
    { id: 8, name: 'University of Calcutta',logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScP5cSa1jMlyHwPWcwGvM34WNyZTJrFC82SRKy-y7hXw&s", ranking: 8, rating: 4.0, fees: 45000, userRating: 3.7, featured: false },
    { id: 9, name: 'Anna University',logo:"https://upload.wikimedia.org/wikipedia/en/thumb/4/49/Anna_University_Logo.svg/1200px-Anna_University_Logo.svg.png", ranking: 9, rating: 4.4, fees: 120000, userRating: 4.3, featured: true },
    { id: 10, name: 'Indian Institute of Science Bangalore',logo:"https://i2.wp.com/cst.iisc.ac.in/sudesi/wp-content/uploads/2017/12/cropped-Indian_Institute_of_Science_logo.svg_.png?fit=512%2C512&ssl=1", ranking: 10, rating: 4.8, fees: 250000, userRating: 4.7, featured: true },
    { id: 11, name: 'University of Delhi',logo:"https://upload.wikimedia.org/wikipedia/commons/6/62/Delhi_University%27s_official_logo.png", ranking: 11, rating: 4.2, fees: 55000, userRating: 4.0, featured: false },
    { id: 12, name: 'Indian Institute of Technology Madras',logo:"https://w7.pngwing.com/pngs/54/748/png-transparent-indian-institute-of-technology-madras-department-of-management-studies-iit-madras-doctor-of-philosophy-student-indian-institutes-of-technology-student-people-logo-india.png", ranking: 12, rating: 4.6, fees: 160000, userRating: 4.5, featured: true },
    { id: 13, name: 'University of Pune',logo:"https://w7.pngwing.com/pngs/251/546/png-transparent-department-of-physics-nashik-centre-for-modeling-and-simulation-university-college-schedule-miscellaneous-orange-logo.png", ranking: 13, rating: 4.1, fees: 50000, userRating: 3.8, featured: false },
    { id: 14, name: 'Indian Institute of Management Bangalore',logo:"https://upload.wikimedia.org/wikipedia/en/a/a2/IIM_Bangalore_Logo.svg", ranking: 14, rating: 4.7, fees: 220000, userRating: 4.6, featured: true },
    { id: 15, name: 'University of Hyderabad',logo:"https://upload.wikimedia.org/wikipedia/en/9/9e/University_of_Hyderabad_Logo.png", ranking: 15, rating: 4.3, fees: 70000, userRating: 4.2, featured: false },
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
                <>
                <div className='feature-banner'>
                <div className='outer'></div>
                <div className="featured-label">Featured</div>
                </div>
                </>
                )}
                <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <img style={{width:'40px',height:'40px'}} src={college.logo} alt='logo' />
                {college.name}
                </div></td>
                <td>{college.rating}</td>
                <td>₹ {college.fees}<br />
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