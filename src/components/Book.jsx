import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { SideBar } from './SideBar';
import axios from 'axios';
import { Nav } from './Nav';
import Loader from 'react-loader-spinner';

export const Book = () => {
  const [data, setData] = useState([]);

  const [loader,setLoader]=useState(true)

  useEffect(() => {
    axios.get('https://formic.onrender.com/books')
      .then((res) => {
        setData(res.data);
        setLoader(false)
      })
      .catch((err) => console.error(err));
      
  }, []); 

  const [currentPage,setCurrentPage]=useState(1)
  const itemsPerPage=15;
  const lastIndex=currentPage * itemsPerPage;
  const firstIndex=lastIndex - itemsPerPage

  const currentData=data.slice(firstIndex,lastIndex)

  const paginate=(id)=>{
    setCurrentPage(id)
  }
  return (
    <Container fluid className='p-0'>
      <Row>
        <Col xs={2} md={2} lg={2} className='p-0'>
          <SideBar />
        </Col>
        <Col className='p-0'>
          <Nav title="Books details" />
          {loader ?(
            <div className='vh-100 w-100 justify-content-center align-items-center d-flex'>
              <Loader type="BallTriangle" color='black' width={50} height={50}/>
            </div>
          ):(
            <div className='home'>
              <Table striped bordered hover className='container mt-5'>
            <thead>
              <tr>
                <th className='p-4'>S.No</th>
                <th className='p-4'>Title</th>
                <th className='p-4'>Genere</th>
                <th className='p-4'>Author name</th>
                <th className='p-4'>Publication Year</th>
                <th className='p-4'>ISBN</th>
               
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, i) => (
                <tr key={i}>
                  <td className='p-3'>{i + firstIndex +1}</td>
                  <td className='p-3'>{item.title}</td>
                  <td className='p-3'>{item.genre}</td>
                  <td className='p-3'>{item.author.name}</td>
                  <td className='p-3'>{item.publicationYear}</td>
                  <td className='p-3'>{item.isbn}</td>
                </tr>
              ))}
            </tbody>
            
          </Table>
          
            </div>
          )}
            <div className='container d-flex justify-content-center'>
                    {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                      <div key={i}>
                        <button className='btn btn-dark mx-2' onClick={() => paginate(i+1)}>
                          {i + 1}
                        </button>
                      </div>
                    ))}
             </div>
        </Col>
      </Row>
    </Container>
  );
};