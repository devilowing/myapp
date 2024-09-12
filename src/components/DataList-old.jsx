// // src/components/DataList.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Table } from 'react-bootstrap';

// const DataList = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         // Fetch data from the backend
//         axios.get('/api/data')
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     return (
//         <Container>
//             <h2 className="my-4">Data List</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ชื่อบัตร</th>
//                         <th>สถานที่ทำ</th>
//                         <th>วันที่ทำบัตร</th>
//                         <th>วันหมดอายุ</th>
//                         <th>รายละเอียดเพิ่มเติม</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.name}</td>
//                             <td>{item.state}</td>
//                             <td>{new Date(item.startDate).toLocaleDateString()}</td>
//                             <td>{new Date(item.expireDate).toLocaleDateString()}</td>
//                             <td>{item.detail}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//         </Container>
//     );
// };

// export default DataList;
