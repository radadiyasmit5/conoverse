import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiMessageSquare, FiTool, FiLogOut } from 'react-icons/fi';

const SidebarContainer = styled.div`
  width: 250px;
  background: #202123;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  color: #fff;
`;

const NavItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    opacity: 0.8;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:hover {
    opacity: 0.8;
  }
`;

function Sidebar({ user, onLogout }) {
    return (
        <SidebarContainer>
            <h2>My AI App</h2>
            <NavItem to="/">Chat</NavItem>
            <NavItem to="/agent">Agent Builder</NavItem>
            {/* Additional items for Web & Drive integration can be added as needed */}
            {user && (
                <LogoutButton onClick={onLogout}>
                    <FiLogOut />
                    Logout
                </LogoutButton>
            )}
        </SidebarContainer>
    );
}

export default Sidebar;
