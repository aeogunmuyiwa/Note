import Vue from 'vue'
import Router from 'vue-router'

import NoteList from '@/components/NoteList'
import Element from 'element-ui'
import Note from '@/components/Note'
import VueLocalStorage from 'vue-localstorage'
import CreateNote from '@/components/CreateNote'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(Element)

Vue.use(Router)
Vue.use(VueLocalStorage)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'All Notes',
      component: NoteList
    },
    {
      path: '/view/:id',
      name: 'View Note',
      component: Note,
      props: true
    },
    {
      path: '/new',
      name: 'Create Note',
      component: CreateNote,
      props: true
    },
    {
      path: '/new',
      name: 'Editing Note',
      component: CreateNote,
      props: true
    }

  ]
})
