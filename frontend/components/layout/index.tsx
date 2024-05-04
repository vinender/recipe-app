// components/Layout.js

import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="bg-black min-h-screen">
      {children}
    </div>
  );
};

export default Layout;
