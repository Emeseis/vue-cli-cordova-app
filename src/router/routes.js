export const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/code-reader',
    name: 'CodeReader',
    component: () => import('../views/CodeReader.vue')
  },
  {
    path: '/char-recognizer',
    name: 'CharRecognizer',
    component: () => import('../views/CharRecognizer.vue')
  }
]
