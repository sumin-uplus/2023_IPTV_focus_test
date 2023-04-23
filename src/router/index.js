// routes.js
import ThumbnailContainer from '../components/ThumbnailContainer.vue';

const routes = [
      {
            path: '/moving',
            name: 'moving',
            component: ThumbnailContainer,
            props: { start: 1, type: 'moving'}
      },
      {
            path: '/fixed',
            name: 'fixed',
            component: ThumbnailContainer,
            props: { start: 101, type: 'fixed' }
      },
]

export default routes