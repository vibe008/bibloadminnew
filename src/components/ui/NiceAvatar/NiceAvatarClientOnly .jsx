'use client';
import React, { useMemo } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';

const NiceAvatarClientOnly = () => {
  const config = useMemo(() => genConfig({ sex: "woman", hairStyle: "mohawk" }), []);

  return <Avatar className="w-[80px] h-[80px]" {...config} />;
};

export default NiceAvatarClientOnly;
