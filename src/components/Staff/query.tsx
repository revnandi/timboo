import { useQuery,   gql } from "@apollo/client";

export const GET_STAFF = gql`
  query GetStaff {
      categories(where: {parent: 9, orderby: TERM_ORDER}) {
      items: nodes {
        type: name
        staff: staff(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
          members: nodes {
            id
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