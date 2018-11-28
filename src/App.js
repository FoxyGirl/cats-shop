import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from './store'
import { readBasket } from './ducks/basket'
import { renderRoutes } from 'react-router-config'
import { Link } from 'react-router-dom'
import { Layout, Menu, Breadcrumb, Badge, Icon } from 'antd'
import './App.css'

const { Header, Content, Footer } = Layout
const MenuItem = Menu.Item
const BreadcrumbItem = Breadcrumb.Item

class App extends Component {
  headerStyle = { margin: '0 auto', width: 800 }

  contentStyle = { margin: '0 auto', width: 800 }

  footerStyle = { textAlign: 'center' }

  componentDidMount() {
    dispatch(readBasket())
  }

  render() {
    const {
      route: { routes },
      basketCount,
    } = this.props
    return (
      <Layout>
        <Header style={this.headerStyle}>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <MenuItem>
              <Link to="/">Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/basket">
                <Badge count={basketCount}>Basket</Badge>
              </Link>
            </MenuItem>
          </Menu>
        </Header>
        <Content style={this.contentStyle}>
          <Breadcrumb>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>List</BreadcrumbItem>
            <BreadcrumbItem>App</BreadcrumbItem>
          </Breadcrumb>
          {renderRoutes(routes)}
        </Content>
        <Footer style={this.footerStyle}>
          Cats Shop &copy; {new Date().getFullYear()} Created by Humansee Labs.
        </Footer>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    basketCount: state.basket.items.length,
  }
}

export default connect(mapStateToProps)(App)
