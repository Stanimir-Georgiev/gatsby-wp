const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
  {
    allWordpressPost(sort: {fields: [date]}) {
      edges {
        node {
          title
          excerpt
          slug
          featured_media {
            localFile {
              childImageSharp {
                fixed(width: 550, height: 460) {
                  src
                  width
                  height
                }
              }
            }
          }
          categories {
            name
          }
        }
      }
    }
    allWordpressPage {
      edges {
        node {
          slug
          title
          excerpt
          comment_status
        }
      }
    }
  }
  `).then(result => {

    result.data.allWordpressPost.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.slug,
        },
      })
    })
    result.data.allWordpressPage.edges.forEach(({ node }) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/blog-page.js`),
        context: {
          slug: node.slug
        }
      })
    })
  })
}