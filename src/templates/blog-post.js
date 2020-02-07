import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import './blog-post.scss';
import Img from 'gatsby-image';

export default ({ data }) => {
  const post = data.allWordpressPost.edges[0].node
  let fixed = {}
  if (post.featured_media !== null) {
    fixed = post.featured_media.localFile.childImageSharp.fixed
  }
  return (
    <Layout>
      <div>
        <section className="post__headings">
          <div className="post__headings-image">
            <div className="post__headings-image-overlay"></div>
          </div>
          <div className="post__wrap">
            <h1>{post.title}</h1>
            <p>
              {post.categories.map(({ name }) => {
                return (
                  <span>{name}</span>
                )
              })}
            </p>
          </div>
        </section>
        <section className="post__single">
          <div className="single__wrapper">
            <article className="single">
              <h2>Description</h2>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
              <Img fixed={fixed}></Img>
              <div className="single__post__publish">
                <p className="single__post__date">{post.date}</p>
                <p className="single__post__author">
                  <span className="single__author__name">{post.author.name}</span>
                  <img src={post.author.avatar_urls.wordpress_24} className="single__author__image"></img>
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          excerpt
          slug
          content
          featured_media{
            localFile{
              childImageSharp{
                fixed(width:940, height:500){
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
          date(formatString: "DD-MM-YYYY")
          author {
            name
            avatar_urls {
              wordpress_24
            }
          }
        }
      }
    }
  }
`