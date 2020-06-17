import { useStaticQuery, graphql } from 'gatsby';

export const FetchSlots = () => {
  const data = useStaticQuery(graphql`
    query data {
      allAirtable(filter: { data: { userIds: { ne: "Dummy" } } }) {
        edges {
          node {
            data {
              title
              userIds
              email
              description
              type
              start
              end
              date
              duration
              room
              meet_link
              speaker_bio
              speaker_favourites
              speaker_recreation
              speaker_image {
                localFiles {
                  publicURL
                }
              }
            }
          }
        }
      }
    }
  `);
  const slots =
    data && data.allAirtable && data.allAirtable.edges
      ? data.allAirtable.edges.flatMap(edge => edge.node.data)
      : [];
  return slots;
};
