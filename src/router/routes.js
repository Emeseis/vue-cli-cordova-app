export const routes = [
  {
    path: '/',
    name: 'Homepage',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/code-reader',
    name: 'Code Reader',
    component: () => import('../views/CodeReader.vue')
  },
  {
    path: '/send-picture',
    name: 'Send Picture',
    component: () => import('../views/SendPicture.vue')
  },
  {
    path: '/text-recognizer',
    name: 'Text Recognizer',
    component: () => import('../views/TextRecognizer.vue')
  }
]
