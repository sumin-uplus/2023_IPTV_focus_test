// routes.js
import ThumbnailContainer from '../components/ThumbnailContainer.vue';
import ThumbnailContainer2 from '../components/test2/ThumbnailContainer2.vue';
import App from '@/App.vue';
import App2 from '@/App2.vue';
const routes = [
      {
            path: process.env.BASE_URL + '/mf',
            name: 'MF',
            component: ThumbnailContainer,
            props: { group: 'imgset00', type: 'MF'}
      },
      {
            path: process.env.BASE_URL + '/ff',
            name: 'FF',
            component: ThumbnailContainer,
            props: { group: 'imgset00', type: 'FF' }
      },
      {
            path: process.env.BASE_URL + '/test1',
            name: 'test1',
            component: App
      },
      {
            path: process.env.BASE_URL,
            name: 'test2',
            component: App2
      },
]

const groups = ['imgset00', 'imgset01', 'imgset02', 'imgset03', 'imgset04', 'imgset05', 'imgset06'];
const types = ['MF', 'FF'];
const updowns = ['A', 'B', 'C'];
const tasks = ['task1', 'task2', 'task3'];

types.forEach((type) => {
      groups.forEach((group, index) => {
        const path = `${process.env.BASE_URL}/${type.toLowerCase()}/${index}`;
        const name = `${type}-${index}`;
    
        routes.push({
          path,
          name,
          component: ThumbnailContainer,
          props: { group, type },
        });
      });
    });

updowns.forEach((updown) => {
  tasks.forEach((task, num) => {
    groups.forEach((group, index) => {
      const path = `${process.env.BASE_URL}/mf/${updown.toLowerCase()}/${index}/${num+1}`;
      const name = `MF-${updown}-${index}-${num+1}`;

      routes.push({
        path,
        name,
        component: ThumbnailContainer2,
        props: { group, type: 'MF', updown, task },
      });
    });
  });
});


export default routes