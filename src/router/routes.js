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
    path: '/take-picture',
    name: 'Take Picture',
    component: () => import('../views/TakePicture.vue')
  },
  {
    path: '/text-recognizer',
    name: 'Text Recognizer',
    component: () => import('../views/TextRecognizer.vue')
  }
]
