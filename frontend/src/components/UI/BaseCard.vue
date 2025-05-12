<template>
    <div class="base-card" :class="{ 'hover-effect': hoverEffect }">
      <div class="card-header" v-if="$slots.header || title">
        <slot name="header">
          <h3>{{ title }}</h3>
        </slot>
      </div>
      
      <div class="card-body">
        <slot></slot>
      </div>
      
      <div class="card-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    title: {
      type: String,
      default: ''
    },
    hoverEffect: {
      type: Boolean,
      default: false
    }
  })
  </script>
  
  <style scoped>
  .base-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .hover-effect:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .card-header {
    border-bottom: 1px solid #eee;
    padding-bottom: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .card-header h3 {
    margin: 0;
    color: #2c3e50;
  }
  
  .card-body {
    margin: 1rem 0;
  }
  
  .card-footer {
    border-top: 1px solid #eee;
    padding-top: 1rem;
    margin-top: 1rem;
  }
  </style>