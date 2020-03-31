import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';

const Footer = ({ muscles, category, onSelect }) => {
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
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='All' />
        {musclesList}
      </Tabs>
    </Paper>
  );
};

export default Footer;
