import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import withWidth from '@material-ui/core/withWidth';
import { withContext } from '../../context';

const Footer = ({ muscles, category, onCategorySelect, width }) => {
  const index = category
    ? muscles.findIndex(muscle => muscle === category) + 1
    : 0;

  const onIndexSelect = (e, index) => {
    onCategorySelect(index === 0 ? '' : muscles[index - 1]);
  };

  const musclesList = muscles.map(muscle => (
    <Tab label={muscle} key={muscle} />
  ));

  return (
    <Paper>
      <Tabs
        value={index}
        onChange={onIndexSelect}
        indicatorColor='primary'
        textColor='primary'
        centered={!['xs', 'sm'].includes(width)}
        variant={['xs', 'sm'].includes(width) ? 'scrollable' : 'standard'}
      >
        <Tab label='All' />
        {musclesList}
      </Tabs>
    </Paper>
  );
};

export default withContext(withWidth()(Footer));
