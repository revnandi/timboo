import React from 'react';
import classes from '../scss/StaffGroup.module.scss';
import StaffGroupItem from './StaffGroupItem';

type StaffGroupProps = {
  title: String,
  members: {
    name: String,
    content: String
  }[]
}

// type StaffGroupItemProps = {
//   name: String,
//   content: String
// }

function StaffGroup({ title, members }: StaffGroupProps) {
  const membersData = members.map( (item, index ) => {
    return <StaffGroupItem member={ item } key={index}></StaffGroupItem>
  });

  return <div className={ classes.Body }>
    <h2 className={ classes.Title }>{ title }</h2>
    <ul className={ classes.List }>
      { membersData }
    </ul>
  </div>
}

export default StaffGroup;