import Koa from 'koa';
import Router from 'koa-router';
import slow from 'koa-slow';

const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3000;

app.use(slow({
  delay: 1500,
  paths: ['/api/news']
}));

const mockNews = [
  {
    id: 1,
    title: 'Новый фильм Marvel бьет рекорды',
    description: 'Кассовые сборы превысили ожидания аналитиков в первый же уикенд',
    date: '2023-10-27'
  },
  {
    id: 2,
    title: 'Режиссер "Дюны" анонсирует новый проект',
    description: 'Съемки начнутся в следующем году в пустыне Невада',
    date: '2023-10-26'
  },
  {
    id: 3,
    title: 'Оскар 2024: список номинантов',
    description: 'Объявлены претенденты на главную кинопремию года',
    date: '2023-10-25'
  }
]

router.get('/api/news', (ctx) => {
  ctx.body = mockNews;
});

router.get('/health', (ctx) => {
  ctx.body = 'OK';
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, '0.0.0.0', () => {
  console.log(`сервер запустился на ${port}`);
});