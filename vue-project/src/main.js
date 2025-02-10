import { createApp } from 'vue'

import App from './App.vue';
import FoodItem from './components/FoodItem.vue'
import FoodItem2 from './components/FoodItem2.vue'
import PersonalProfile from './components/PersonalProfile.vue'
import RestApi from './components/RestApi.vue'

const app = createApp(App)
app.component('food-item', FoodItem)
app.component('food-item2', FoodItem2)
app.component('PersonalProfile', PersonalProfile)
app.component('Rest-Api', RestApi)
app.mount('#app')
