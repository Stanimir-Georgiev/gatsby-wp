import React from "react"
import './Footer.scss'
import { Link, graphql, useStaticQuery } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
  query {  
    allWordpressPost(sort: {order: DESC, fields: date}, limit: 3) {
      edges {
        node {
          slug
          title
        }
      }
    }
}
`)
  return (
    <footer className="site-footer">
      <div className="footer__wrapper">
        <section className="posts__recent">
          <h2>Recent Posts</h2>
          <ul className="recent__ul">
            {data.allWordpressPost.edges.map(({ node }) => {
              return (
                <li key={node.slug} className="recent__li">
                  <Link to={node.slug}>{node.title}</Link>
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
