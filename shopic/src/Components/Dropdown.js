import React from 'react'
import "./Dropdown.css"

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


function Choices() {

    const items = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
              testing1
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
              testing2
            </a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
              testing3
            </a>
          </Menu.Item>
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
