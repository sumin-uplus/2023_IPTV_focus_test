// routes.js
import ThumbnailContainer from '../components/ThumbnailContainer.vue';

const routes = [
      {
            path: process.env.BASE_URL + '/mf',
            name: 'MF',
            component: ThumbnailContainer,
            props: { group: 'imgset01', type: 'MF'}
      },
      {
            path: process.env.BASE_URL + '/ff',
            name: 'FF',
            component: ThumbnailContainer,
            props: { group: 'imgset02', type: 'FF' }
      },

      //MF : 이미지 그룹별 맵핑
      {
            path: process.env.BASE_URL + '/mf/1',
            name: 'MF-1',
            component: ThumbnailContainer,
            props: { group: 'imgset01', type: 'MF'}
      },
      {
            path: process.env.BASE_URL + '/mf/2',
            name: 'MF-2',
            component: ThumbnailContainer,
            props: { group: 'imgset02', type: 'MF'}
      },
      {
            path: process.env.BASE_URL + '/mf/3',
            name: 'MF-3',
            component: ThumbnailContainer,
            props: { group: 'imgset03', type: 'MF'}
      },
      {
            path: process.env.BASE_URL + '/mf/4',
            name: 'MF-4',
            component: ThumbnailContainer,
            props: { group: 'imgset04', type: 'MF'}
      },
      //FF : 이미지 그룹별 맵핑
      {
            path: process.env.BASE_URL + '/ff/1',
            name: 'FF-1',
            component: ThumbnailContainer,
            props: { group: 'imgset01', type: 'FF' }
      },
      {
            path: process.env.BASE_URL + '/ff/2',
            name: 'FF-2',
            component: ThumbnailContainer,
            props: { group: 'imgset02', type: 'FF' }
      },
      {
            path: process.env.BASE_URL + '/ff/3',
            name: 'FF-3',
            component: ThumbnailContainer,
            props: { group: 'imgset03', type: 'FF' }
      },
      {
            path: process.env.BASE_URL + '/ff/4',
            name: 'FF-4',
            component: ThumbnailContainer,
            props: { group: 'imgset04', type: 'FF' }
      },
]

export default routes