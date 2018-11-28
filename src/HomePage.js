import React, { Component } from 'react'
import { connect } from 'react-redux'
import { dispatch } from './store'
import { readCategories } from './ducks/categories'
import { readGoods } from './ducks/goods'
import { Select } from 'antd'
import Goods from './Goods'

const Option = Select.Option

class HomePage extends Component {
  state = { selectedCategoryIds: [], isInitializedCategories: false }

  selectStyle = { width: '100%' }

  handleChange = (selectedCategoryIds) => {
    this.setState({ selectedCategoryIds })
    dispatch(readGoods({ selectedCategoryIds, isLoadMore: false }))
  }

  componentDidMount() {
    dispatch(readCategories()).then(() => {
      this.setState({ isInitializedCategories: true })
      dispatch(readGoods())
    })
  }

  render() {
    const { categories } = this.props
    const { selectedCategoryIds, isInitializedCategories } = this.state
    return (
      <div>
        <h1>Home Page</h1>
        {isInitializedCategories && (
          <Select
            {...{
              mode: 'multiple',
              style: this.selectStyle,
              placeholder: 'Categories',
              defaultValue: selectedCategoryIds,
              onChange: this.handleChange,
            }}
          >
            {categories.map(({ id, title }) => (
              <Option key={id}>{title}</Option>
            ))}
          </Select>
        )}
        <br />
        <Goods selectedCategoryIds={selectedCategoryIds} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories.items }
}

export default connect(mapStateToProps)(HomePage)
