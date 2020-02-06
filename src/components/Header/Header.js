import { Link, graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import './Header.scss'

const Header = ({ siteTitle }) => {
  const data = useStaticQuery(graphql`
  query {  
  allWordpressPage {
    edges {
      node {
        title
        slug
      }
    }
  }
}
`)
  return (
    <header className="site-header">
      <div>
        <h1>
          <Link to="/">
            {siteTitle}
          </Link>
        </h1>
      </div>
      <nav className="page-navigation">
        <ul>
          {data.allWordpressPage.edges.map(({ node }) => {
            return (
              <li>
                <Link to={node.slug}>{node.title}</Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

