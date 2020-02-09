import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import './blog-page.scss'

export default ({ data }) => {
  const page = data.allWordpressPage.edges[0].node
  return (
    <Layout>
      <div className="blog__page">
        <div className="page__wrapper">
          <h1 className="page__heading">{page.title}</h1>
          <div className="page__content" dangerouslySetInnerHTML={{ __html: page.content }} />
        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query($slug: String!) {
    allWordpressPage(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          title
          content
        }
      }
    }
  }
`