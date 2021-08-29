import { useQuery, gql } from "@apollo/client";

export const GET_CAROUSEL = gql`
  query GetCarousel {
    themeGeneralSettings {
      hero {
        carousel {
          item {
            gallery {
              id
              mimeType
              mediaItemUrl
              lqip: sourceUrl(size: LQIP)
              src: sourceUrl(size: LARGE)
              customLength
            }
            title
            content
          }
        }
      }
    }
  }`