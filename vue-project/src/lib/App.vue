<template>
    <ul>
      <li v-for="country in countries" :key="country.id">{{ country.name }}</li>
    </ul>
  <h1>Food</h1>
  <food-item/>
  <food-item2/>
  <food-item/>
  <food-item2/>
  <Personal-Profile/>
</template>

 <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from './supabaseClient'

  const countries = ref([])

  async function getCountries() {
    const { data } = await supabase.from('countries').select()
    countries.value = data
  }

  onMounted(() => {
    getCountries()
  })
  </script>

<style></style>