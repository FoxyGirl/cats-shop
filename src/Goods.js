import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { dispatch } from './store'
import { readGoods } from './ducks/goods'
import { List, Button } from 'antd'
import Good from './Good'

const ListItem = List.Item

class Goods extends Component {
  config = { column: 3 }

  handleClick = () => {
    const { selectedCategoryIds } = this.props
    dispatch(readGoods({ selectedCategoryIds, isLoadMore: true }))
  }

  render() {
    const { items, isGameOver } = this.props
    return (
      <Fragment>
        {items && items.length > 0 && (
          <List
            grid={this.config}
            dataSource={items}
            renderItem={({ id, title, description }) => (
              <ListItem key={id}>
                <Good {...{ id, title, description }} />
              </ListItem>
            )}
          />
        )}
        <Button disabled={isGameOver} onClick={this.handleClick}>
          Load More
        </Button>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.goods.items,
    isGameOver: state.goods.isGameOver,
  }
}

export default connect(mapStateToProps)(Goods)
