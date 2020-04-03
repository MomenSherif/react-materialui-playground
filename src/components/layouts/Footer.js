import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';

const Footer = ({ muscles, category, onSelect, width }) => {
  console.log(['xs', 'sm'].includes(width) ? 'scrollable' : 'standard');
  const index = category
    ? muscles.findIndex(muscle => muscle === category) + 1
    : 0;

  const onIndexSelect = (e, index) => {
    onSelect(index === 0 ? '' : muscles[index - 1]);
  };

  const musclesList = muscles.map(muscle => (
    <Tab label={muscle} key={muscle} />
  ));

  return (
    <Paper>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        indicatorColor='secondary'
        textColor='secondary'
        centered={!['xs', 'sm'].includes(width)}
        variant={['xs', 'sm'].includes(width) ? 'scrollable' : 'standard'}
      >
        <Tab label='All' />
        {musclesList}
      </Tabs>
    </Paper>
  );
};

export default withWidth()(Footer);
