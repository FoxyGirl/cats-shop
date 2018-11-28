import App from './App'
import HomePage from './HomePage'
import BasketPage from './BasketPage'

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: HomePage,
      },
      {
        path: '/basket',
        component: BasketPage,
      },
    ],
  },
]

export default routes
