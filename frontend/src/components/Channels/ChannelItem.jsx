import React, { useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

const ChannelItem = ({
  channel,
  channelId,
  handleSetChannel,
  handleModalSwitch,
}) => {
  const { t } = useTranslation();
  const isActive = channel.id === channelId;
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = (nextShow) => setIsMenuOpen(nextShow);

  const channelItemStyle = {
    backgroundColor: isActive ? '#e9ecef' : 'transparent',
  };

  const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: isActive ? '#343a40' : 'inherit',
  };

  const dropdownToggleStyle = {
    backgroundColor: isHovered ? '#f8f9fa' : 'transparent',
    border: 'none',
    width: '36px',
    color: isActive ? '#343a40' : 'inherit',
  };

  return (
    <li
      className={classnames('nav-item w-100', { active: isActive })}
      style={channelItemStyle}
    >
      <div
        role="group"
        className="d-flex dropdown btn-group"
        style={{ backgroundColor: 'transparent', border: 'none' }}
      >
        <button
          type="button"
          className="w-100 rounded-0 text-start text-truncate btn btn-secondary"
          onClick={() => handleSetChannel(channel.id)}
          style={buttonStyle}
        >
          <span className="me-1">#</span>
          {' '}
          {channel.name}
        </button>

        {channel.removable && (
          <Dropdown as={ButtonGroup} onToggle={handleToggle} show={isMenuOpen}>
            <Dropdown.Toggle
              split
              variant="link"
              id={`dropdown-${channel.id}`}
              className="dropdown-toggle-split"
              style={dropdownToggleStyle}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <span className="visually-hidden">Управление каналом</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className={classnames({ show: isMenuOpen })}>
              <Dropdown.Item
                onClick={() => handleModalSwitch('remove', channel)}
              >
                {t('chatPage.dropdown.delete')}
                {' '}
                <i className="bi bi-trash" style={{ color: 'red' }} />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleModalSwitch('rename', channel)}
              >
                {t('chatPage.dropdown.rename')}
                {' '}
                <i className="bi bi-pen" style={{ color: 'black' }} />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
    </li>
  );
};

export default ChannelItem;
