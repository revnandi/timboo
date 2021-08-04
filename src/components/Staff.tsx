import React from 'react';
import classes from '../scss/Staff.module.scss';
import StaffGroup from './StaffGroup';
import SeoTitle from './SeoTitle';
import Loader from './Loader';

import { useQuery, gql } from "@apollo/client";

const GET_STAFF = gql`
  query GetStaff {
    staffTypes(where: {order: ASC, orderby: COUNT}) {
      nodes {
        name
        slug
        staff(where: {orderby: {field: DATE, order: ASC}}) {
          nodes {
            title
            content(format: RENDERED)
            featuredImage {
              lqip: node {
                src: sourceUrl(size: LQIP)
              }
                medium: node {
                  src: sourceUrl(size: MEDIUM)
                }
            }
          }
        }
      }
    }
  }
`;

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
  if (error) return <p>Error :(</p>;

  // console.log(data.staffTypes.nodes);

  const staffGroupsData = data.staffTypes.nodes.map((item : any) => {
    return {
      title: item.name,
      staff: item.staff.nodes
    }
  });

  // console.log(staffGroupsData);

  const staffGroups = staffGroupsData.map( (item : StaffGroupData , index : number ) => {
    return <StaffGroup title={ item.title } staff={ item.staff } key={ index }></StaffGroup>
  });

  return <div className={ classes.Staff } id='timboo_staff'>
    <SeoTitle>
      <h1>The Team</h1>
    </SeoTitle>
    { staffGroups }
  </div>
}

export default Staff;