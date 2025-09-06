import React, { useState } from 'react';
import { Badge, Button, Drawer } from 'antd';
import { ShoppingFilled } from '@ant-design/icons';

const MyBag: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showBagDrawer = () => setOpen(true);
  const closeBagDrawer = () => setOpen(false);

  return (
    <>
      <Badge count={5}>
        <Button
          type="link"
          icon={<ShoppingFilled style={{ fontSize: '30px', color: '#1F2E36' }} />}
          onClick={showBagDrawer}
        />
      </Badge>

      <Drawer
        title="Your Cart"
        placement="right"
        onClose={closeBagDrawer}
        open={open}
        width="33.3%"
        style={{ zIndex: 1000 }}
      >
        {/* Example cart contents */}
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
      </Drawer>
    </>
  );
};

export default MyBag;