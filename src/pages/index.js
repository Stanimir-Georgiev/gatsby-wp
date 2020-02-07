import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from 'gatsby-image'
import './index.scss'

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="home" />
      <div>
        <section className="headings">
          <div className="headings-image">
            <div className="headings-image-overlay"></div>
          </div>
          <div className="wrap">
            <h1>My wordpress blog</h1>
            <p>Here are my blog posts</p>
          </div>
        </section>
        <section className="listing">
          <div className="wrapper">
            {data.allWordpressPost.edges.map(({ node }) => {
              let fixed = {}
              if (node.featured_media !== null) {
                fixed = node.featured_media.localFile.childImageSharp.fixed
              }
              return (
                <article className="post" key={node.slug}>
                  <Link to={node.slug}>
                    <div className="post__image-wrapper">
                      <div className="post__image">
                        {fixed && <Img fixed={fixed} />}
                      </div>
                    </div>
                    <div className="post__content-wrapper">
                      <div className="post__content">
                        <h2 className="post__title">{node.title}</h2>
                        <div className="post__category">
                          {node.categories.map(({ name }) => {
                            return (
                              <span>{name}</span>
                            )
                          })}
                        </div>
                        <p className="post__description" dangerouslySetInnerHTML={{ __html: node.excerpt }} ></p>
                        <div className="post__publish">
                          <p className="post__date">{node.date}</p>
                          <p className="post__author">
                            <span className="author__name">{node.author.name}</span>
                            <img src={node.author.avatar_urls.wordpress_24} className="author__image"></img>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allWordpressPost(sort: {fields: [date], order: DESC}) {
      edges {
        node {
          title
          excerpt
          slug
          featured_media{
            localFile{
              childImageSharp{
                fixed(width:550, height:460){
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