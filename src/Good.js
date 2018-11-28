import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { dispatch } from './store'
import { addToBasket } from './ducks/basket'
import _ from 'lodash'
import { Card, Button, Modal } from 'antd'

const Meta = Card.Meta

class Good extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }

  coverStyle = { width: 240 }

  imgStyle = { maxHeight: 150, height: 150, width: '100%', objectFit: 'cover' }

  addToBasket = () => {
    const { id, title, description } = this.props
    dispatch(addToBasket({ id, title, description }))
  }

  showMoreInfo = () => {
    const { title, description } = this.props
    Modal.info({
      title: 'More Info',
      content: (
        <div>
          <h2>{title}</h2>
          <div>{description}</div>
        </div>
      ),
    })
  }

  render() {
    const { id, title, description } = this.props
    return (
      <Card
        {...{
          style: this.coverStyle,
          cover: (
            <img
              alt={title}
              {...{
                style: this.imgStyle,
                src: `/images/${id}.jpg`,
              }}
            />
          ),
          actions: [
            <Button type="primary" onClick={this.addToBasket}>
              To Basket
            </Button>,
            <Button onClick={this.showMoreInfo}>More Info</Button>,
          ],
        }}
      >
        <Meta
          {...{
            title,
            description: _.truncate(description, { length: 30 }),
          }}
        />
      </Card>
    )
  }
}

export default Good
