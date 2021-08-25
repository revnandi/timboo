import { useQuery, gql } from "@apollo/client";

export const GET_CAROUSEL = gql`
  query GetCarousel {
    themeGeneralSettings {
      hero {
        fieldGroupName
        carousel {
          fieldGroupName
          item {
            gallery {
              id
              mimeType
              mediaItemUrl
              lqip: sourceUrl(size: LQIP)
              src: sourceUrl(size: LARGE)
            }
            title
            content
          }
        }
      }
    }
  }`