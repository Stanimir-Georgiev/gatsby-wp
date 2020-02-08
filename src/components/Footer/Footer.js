import React from "react"
import './Footer.scss'
import { Link, graphql, useStaticQuery } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
  query {  
    filter: allWordpressPost(sort: {order: DESC, fields: date}, limit: 3) {
      edges {
        node {
          slug
          title
        }
      }
    }
    allWordpressWpComments(sort: {fields: date, order: DESC}, limit: 3) {
      edges {
        node {
          author_name
          post
          id
        }
      }
    }
    allWordpressPost {
      edges {
        node {
          wordpress_id
          title
          slug
        }
      }
    }
  }
`)
  let post;
  return (
    <footer className="site-footer">
      <div className="footer__wrapper">
        <section className="posts__recent">
          <h2>Recent Posts</h2>
          <ul className="posts__recent__ul">
            {data.filter.edges.map(({ node }) => {
              return (
                <li key={node.slug} className="posts__recent__li">
                  <Link to={node.slug}>{node.title}</Link>
                </li>
              )
            })}
          </ul>
        </section>
        <section className="comments__recent">
          <h2>Recent Comments</h2>
          <ul className="comments__recent__ul">
            {data.allWordpressWpComments.edges.map(({ node }) => {
              post = data.allWordpressPost.edges.filter((filter) => {
                return filter.node.wordpress_id === node.post
              })
              return (
                <li key={node.id} className="comments__recent__li">
                  <p className="comments__recent__author">{node.author_name} on <Link to={post[0].node.slug}>{post[0].node.title}</Link></p>
                </li>
              )
            })}
          </ul>
        </section>
      </div>
    </footer>
  )

}
export default Footer
