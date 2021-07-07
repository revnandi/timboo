import React from 'react';
import classes from '../scss/StaffGroupItem.module.scss';
import Image from './Image';

type StaffGroupItemProps = {
  member: {
    name: String,
    content: String
  }
}

function StaffGroupItem({ member }: StaffGroupItemProps) {

  return <li className={ classes.Body }>
    <Image src='https://via.placeholder.com/320' data-src='https://via.placeholder.com/16' alt='test' width='320' height='320'/>
    <div className={ classes.InnerContainer }>
      <h2 className={ classes.Name }>{ member.name }</h2>
      <div className={ classes.Content }>
        { member.content }
      </div>
    </div>
  </li>
}

export default StaffGroupItem;