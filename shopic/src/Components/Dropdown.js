import React from 'react'
import "./Dropdown.css"

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


function Choices({ dropDownItems, onDropDownSelect, ...props }) {

  const items = (
    <Menu>
      {dropDownItems.map(category => {
        return (
          <Menu.Item key={category[0]} onClick={() => onDropDownSelect(category[0], category[1])}>
            {category[1]}
          </Menu.Item>
        )
      })}
    </Menu>
  );
  return (
    <Dropdown overlay={items} id="menu">
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        Select Here<DownOutlined />
      </a>
    </Dropdown>
  )
}
export default Choices 
