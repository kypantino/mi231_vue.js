<template>
    <div>
      <h1>JSONPlaceholder API Calls</h1>
  
      <button @click="fetchPosts">Fetch Posts</button>
      <button @click="createPost">Create Post</button>
  
      <div v-if="loading">Loading...</div>
      <div v-if="error">Error: {{ error }}</div>
  
      <ul>
        <li v-for="post in posts" :key="post.id">
          <span @click="selectPost(post)">{{ post.title }}</span>
          <button @click="deletePost(post.id)">Delete</button>
        </li>
      </ul>
  
      <div v-if="selectedPost">
        <h2>Edit Post</h2>
        <input v-model="selectedPost.title" placeholder="Edit title" />
        <textarea v-model="selectedPost.body" placeholder="Edit content"></textarea>
        <button @click="updatePost">Update Post</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Reactive state variables
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const selectedPost = ref(null);
  const apiUrl = "https://jsonplaceholder.typicode.com/posts";
  
  // Function to fetch posts
  const fetchPosts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch posts");
      posts.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  // Function to create a new post
  const createPost = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Post",
          body: "This is a new post",
          userId: 1,
        }),
      });
  
      if (!response.ok) throw new Error("Failed to create post");
  
      const newPost = await response.json();
      posts.value.push(newPost);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  // Function to select a post for editing
  const selectPost = (post) => {
    selectedPost.value = { ...post };
  };
  
  // Function to update a selected post
  const updatePost = async () => {
    if (!selectedPost.value) return;
  
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${apiUrl}/${selectedPost.value.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost.value),
      });
  
      if (!response.ok) throw new Error("Failed to update post");
  
      const updatedPost = await response.json();
  
      // Update the local posts array
      posts.value = posts.value.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
  
      selectedPost.value = null;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  
  // Function to delete a post
  const deletePost = async (postId) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch(`${apiUrl}/${postId}`, { method: "DELETE" });
  
      if (!response.ok) throw new Error("Failed to delete post");
  
      posts.value = posts.value.filter((post) => post.id !== postId);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };
  </script>
  