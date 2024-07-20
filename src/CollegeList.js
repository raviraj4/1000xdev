import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/colleges');
        setColleges(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const filterClg = colleges.filter(college => college.college_name.toLowerCase().includes(searchTerm.toLowerCase()))
  return (
    <div className='main-container'>
      <h1>Top Rated Colleges Globally</h1>
      <input
        type="text"
        placeholder="Search Colleges"
        value={searchTerm}
        className='search-bar'
        onChange={e => setSearchTerm(e.target.value)}
      />

      <ul className='ulist'>
          <div className='college'>
        {filterClg.map(college => (
          <li className='item' key={college.id}>
            <h2>{college.college_name}</h2>
            <p>Employees: {college.employees}</p>
            <h3>Courses:</h3>
            <ul className='ulist-2'>
              {college.courses.map(course => (
                <li className='item-2' key={course.course_name}>
                  {course.course_name} - {course.price} - {course.enrollment}
                </li>
              ))}
            </ul>
          </li>
        ))}
            </div>
      </ul>
      </div>
 
  );
};

export default CollegeList;
