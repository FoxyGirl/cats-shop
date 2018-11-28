import React from 'react'
import { connect } from 'react-redux'
import { dispatch } from './store'
import { sendOrder } from './ducks/basket'
import { Table, Button } from 'antd'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    width: 80,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
]

const handleClick = () => {
  dispatch(sendOrder()).then((items) => console.log({ items }))
}

const BasketPage = ({ items }) => (
  <div>
    <h1>Basket</h1>
    <Table
      {...{
        pagination: false,
        dataSource: items,
        columns,
      }}
    />
    <br />
    <div>
      <Button onClick={handleClick}>Send Order</Button>
    </div>
  </div>
)

const mapStateToProps = (state) => {
  return {
    items: state.basket.items,
  }
}

export default connect(mapStateToProps)(BasketPage)
