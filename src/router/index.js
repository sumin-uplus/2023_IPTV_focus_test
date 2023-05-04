// routes.js
import ThumbnailContainer from '../components/ThumbnailContainer.vue';

const routes = [
      {
            path: '/mf',
            name: 'MF',
            component: ThumbnailContainer,
            props: { group: 'imgset01', type: 'MF'}
      },
      {
            path: '/ff',
            name: 'FF',
            component: ThumbnailContainer,
            props: { group: 'imgset02', type: 'FF' }
      },

      //MF : 이미지 그룹별 맵핑
      {
            path: '/mf/1',
            name: 'MF-1',
            component: ThumbnailContainer,
            props: { group: 'imgset01', type: 'MF'}
      },
      {
            path: '/mf/2',
            name: 'MF-2',
            component: ThumbnailContainer,
            props: { group: 'imgset02', type: 'MF'}
      },
      {
            path: '/mf/3',
            name: 'MF-3',
            component: ThumbnailContainer,
            props: { group: 'imgset03', type: 'MF'}
      },
      {
            path: '/mf/4',
            name: 'MF-4',
            component: ThumbnailContainer,
            props: { group: 'imgset04', type: 'MF'}
      },
      //FF : 이미지 그룹별 맵핑
      {
            path: '/ff/1',
            name: 'FF-1',
            component: ThumbnailContainer,
            props: { group: 'imgset01', type: 'FF' }
      },
      {
            path: '/ff/2',
            name: 'FF-2',
            component: ThumbnailContainer,
            props: { group: 'imgset02', type: 'FF' }
      },
      {
            path: '/ff/3',
            name: 'FF-3',
            component: ThumbnailContainer,
            props: { group: 'imgset03', type: 'FF' }
      },
      {
            path: '/ff/4',
            name: 'FF-4',
            component: ThumbnailContainer,
            props: { group: 'imgset04', type: 'FF' }
      },
]

export default routes