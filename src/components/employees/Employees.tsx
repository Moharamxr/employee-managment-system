import React from 'react';

const Employees = () => {
  // Sample data array
  const data = [
    { id: 1, first: 'Mark', last: 'Otto', handle: '012121124242' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry the Bird', last: 'fghr', handle: '@twitter' },
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry the Bird', last: 'fghr', handle: '@twitter' },
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry the Bird', last: 'fghr', handle: '@twitter' },
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry the Bird', last: 'fghr', handle: '@twitter' },
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry the Bird', last: 'fghr', handle: '@twitter' },
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry the Bird', last: 'fghr', handle: '@twitter' },
  ];

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#ID</th>
          <th scope="col">Name</th>
          <th scope="col">Job</th>
          <th scope="col">Place</th>
          <th scope="col">National ID</th>
          <th scope="col">Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.id}>
            <th scope="row">{item.id}</th>
            <td>{item.first}</td>
            <td>{item.last}</td>
            <td>{item.handle}</td>
            <td>{item.handle}</td>
            <td>{item.handle}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Employees;
