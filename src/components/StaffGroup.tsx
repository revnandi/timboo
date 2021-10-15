import React from 'react';
import classes from '../scss/StaffGroup.module.scss';
import StaffGroupItem from './StaffGroupItem';

interface StaffMember {
  title: string,
  content: string,
  featuredImage: {
    lqip: {
      src: string
    },
    medium: {
      src: string
    }
  }
}

type StaffGroupData = {
  title: string,
  staff: StaffMember[]
}

function StaffGroup({ title, staff }: StaffGroupData) {

  const staffMembersData = staff.map( (item, index ) => {
    return <StaffGroupItem title={ item.title } content={ item.content } featuredImage={ item.featuredImage } key={index}></StaffGroupItem>
  });

  return <div className={ classes.Body }>
    <ul className={ classes.List }>
      { staffMembersData }
    </ul>
  </div>
}

export default StaffGroup;