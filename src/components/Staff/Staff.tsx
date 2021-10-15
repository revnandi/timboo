import React from 'react';
import classes from '../../scss/Staff.module.scss';
import StaffGroup from '../StaffGroup';
import Loader from '../Loader';
import { useQuery } from "@apollo/client";
import { GET_STAFF } from './query';


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

function Staff() {

  const { loading, error, data } = useQuery(GET_STAFF);

  if (loading) return <Loader/>;
  if (error) return <p>Error while loading data</p>;

  // console.log(data.categories.items);

  const staffGroupsData = data.categories.items.map((item : any) => {
    return {
      title: item.type,
      staff: item.staff.members
    }
  });

  // console.log(staffGroupsData);

  const staffGroups = staffGroupsData.map( (item : StaffGroupData , index : number ) => {
    return <StaffGroup title={ item.title } staff={ item.staff } key={ index }></StaffGroup>
  });

  return <div className={ classes.Staff } id='timboo_staff'>
    { staffGroups }
  </div>
}

export default Staff;