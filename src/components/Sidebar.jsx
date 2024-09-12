import React from 'react';
import { Nav } from 'react-bootstrap';
import { HomeIcon, UsersIcon, CalendarIcon } from '@heroicons/react/24/outline';


const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-light" >
      <Nav className="flex-column" style={{ fontSize: '1.2em'}}>
        <Nav.Link href="/"><HomeIcon color="orange"className="icon" /> Home</Nav.Link>
        <Nav.Link href="/users"><UsersIcon className="icon" /> Users</Nav.Link>
        <Nav.Link href="/calendar"><CalendarIcon className="icon" /> Calendar</Nav.Link>
        {/* Add more links as needed */}
      </Nav>
    </div>
  );
};

export default Sidebar;
