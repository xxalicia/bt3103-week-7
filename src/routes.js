import Orders from './components/Orders.vue'
import PageContent from './components/PageContent.vue'
import Dashboard from './components/Dashboard.vue'
import Modify from './components/Modify.vue'

export default [
    { path: '/', component: PageContent },
    { path: '/orders', component: Orders },
    { path: '/dashboard', component: Dashboard },
    { path: '/modify', name: 'modify', component: Modify, props: true }
]