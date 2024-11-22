<template>
  <section>
    <h1>Inventory List</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="inventory.length === 0">No items found.</div>
    <div v-else>
      <ul class="inventory-list">
        <li class="inventory-item" v-for="item in inventory" :key="item._id">
          <div class="inventory-image"><img :src="`http://localhost:3000${item.image}`" alt="Item Image" v-if="item.image" /></div>
          <div class="inventory-content">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <p><strong>Paid:</strong> ${{ item.cost.toFixed(2) }}</p>
            <p><strong>Date Bought:</strong> {{ moment(item.date_bought).format('MMMM D, YYYY')}}</p>
            <p><strong>Quantity:</strong> {{ item.quantity }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../api';
import moment from 'moment';

const inventory = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get('/inventory');
    inventory.value = response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
h1 {
  font-size: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 5px;
}

img {
  max-width: 250px;
  display: block;
}

.inventory-item{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
}


</style>
