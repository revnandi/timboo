import { useQuery, gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query GetProjects {
    projects(where: {orderby: {field: DATE, order: ASC}}) {
      edges {
        text: node {
          title
          content
        }
        media: node {
          featuredImage {
            lqip: node {
              src: sourceUrl(size: LQIP)
            }
            medium: node {
              src: sourceUrl(size: MEDIUM_LARGE)
            }
          }
          gallery: acf {
            items: gallery {
              lqip: sourceUrl(size: LQIP)
              srcSet(size: MEDIUM)
            }
          }
        }
      }
    }
  }
`;