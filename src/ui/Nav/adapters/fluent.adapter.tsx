import React from 'react';
import { NavAdapterProps } from '../nav.types';
import { FluentNav } from '../fluent';

const FluentNavAdapter: React.FC<NavAdapterProps> = ({ props }) => {
  return <FluentNav {...props} />;
};

export default FluentNavAdapter;
