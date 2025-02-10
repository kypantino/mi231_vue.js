<template>
    <div>
      <h1>JSONPlaceholder API Calls</h1>
      <button @click="fetchPosts">Fetch Posts</button>
      <button @click="createPost">Create Post</button>
      <button @click="updatePost">Update Post</button>
      <button @click="deletePost">Delete Post</button>
      
      <div v-if="loading">Loading...</div>
      <div v-if="error">Error: {{ error }}</div>
      
      <ul>
        <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  export default {
    setup() {
      const posts = ref([]);
      const loading = ref(false);
      const error = ref(null);
      const apiUrl = "https://jsonplaceholder.typicode.com/posts";
  
      const fetchPosts = async () => {
        loading.value = true;
        error.value = null;
        try {
          const response = await fetch(apiUrl);
          posts.value = await response.json();
        } catch (err) {
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      };
  
      const createPost = async () => {
        loading.value = true;
        error.value = null;
        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "New Post", body: "This is a new post", userId: 1 }),
          });
          const newPost = await response.json();
          posts.value.push(newPost);
        } catch (err) {
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      };
  
      const updatePost = async () => {
        loading.value = true;
        error.value = null;
        try {
          const response = await fetch(`${apiUrl}/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: 1, title: "Updated Post", body: "Updated content", userId: 1 }),
          });
          const updatedPost = await response.json();
          posts.value = posts.value.map(post => (post.id === 1 ? updatedPost : post));
        } catch (err) {
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      };
  
      const deletePost = async () => {
        loading.value = true;
        error.value = null;
        try {
          await fetch(`${apiUrl}/1`, { method: "DELETE" });
          posts.value = posts.value.filter(post => post.id !== 1);
        } catch (err) {
          error.value = err.message;
        } finally {
          loading.value = false;
        }
      };
    // return statements
    /*
      return {
        posts,
        loading,
        error,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
      };
    },
  };
  */
  </script>
  