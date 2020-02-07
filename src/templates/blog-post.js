import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import './blog-post.scss';
import Img from 'gatsby-image';
import Comment from '../components/Comment/Comment'

export default ({ data }) => {
  const post = data.allWordpressPost.edges[0].node
  const comments = data.allWordpressWpComments;
  console.log(comments)
  let fixed = {}
  if (post.featured_media !== null) {
    fixed = post.featured_media.localFile.childImageSharp.fixed
  }
  return (
    <Layout>
      <div>
        <section className="post__headings">
          <div className="post__headings-image">
            <Img fixed={fixed} objectFit="cover"></Img>
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
                <img src={post.author.avatar_urls.wordpress_24} className="single__author__image"></img>
                <div className="single__date__author">
                  <h6 className="single__post__author">{post.author.name}</h6>
                  <p className="single__post__date">{post.date}</p>
                </div>
              </div>
              {comments.edges.length > 0 &&
                <section className="comment__section">
                  <h2>Comment Section</h2>
                  <ul>
                    {comments.edges.map(({ node }) => {
                      return (
                        <Comment authorImage={node.author.avatar_urls.wordpress_24} authorName={node.author.name} commentDate={node.date} commentContent={node.content} />
                      )
                    })}
                  </ul>
                </section>}
            </article>
          </div>
        </section>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!, $postId: Int!) {
    allWordpressPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          excerpt
          slug
          content
          wordpress_id
          featured_media{
            localFile{
              childImageSharp{
                fixed(width:940, height:540){
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
          date(formatString: "DD.MM.YYYY")
          author {
            name
            avatar_urls {
              wordpress_24
            }
          }
        }
      }
    }
    allWordpressWpComments(filter: {post: {eq: $postId}}) {
      edges {
          node {
              id
              wordpress_id
              post
              date(formatString: "DD.MM.YYYY")
              content
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