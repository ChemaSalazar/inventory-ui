<template>
  <h1>Add New Item</h1>
  <section>
    <form @submit.prevent="addItem">
      <div class="form-set">
        <label for="name">Name</label>
        <input v-model="name" placeholder="Name" required/>
      </div>
      <div class="form-set">
        <label for="cost">Cost</label>
        <input v-model="cost" type="number" step="0.01" placeholder="Cost" required />
      </div>
      <div class="form-set">
        <label for="cost">Quantity</label>
        <input v-model="quantity" type="number" placeholder="Quantity" required />
      </div>
      <div class="form-set">
        <label for="cost">Date Bought</label>
        <input v-model="date_bought" type="date" placeholder="Date Bought" required />
      </div>
      <div class="form-set">
        <label for="cost">Notes</label>
        <textarea v-model="description" placeholder="Description" rows="4" cols="35"></textarea>
      </div>
      <div class="form-set">
        <label for="item-image">Image</label>
        <input name="item-image" type="file" @change="handleFile" />
      </div>
      <div class="form-set-submit">
      <button type="submit">Submit</button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';

const name = ref('');
const quantity = ref(1);
const cost = ref(1.00);
const date_bought = ref(Date.now());
const description = ref('');
const file = ref(null);

const handleFile = (event) => {
  file.value = event.target.files[0];
};

const addItem = async () => {
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('quantity', quantity.value);
  formData.append('cost', cost.value);
  formData.append('date_bought', date_bought.value);
  formData.append('description', description.value);
  if (file.value) formData.append('image', file.value);

  try {
    await api.post('/inventory', formData);
    alert('Item added successfully!');
  } catch (error) {
    console.error('Error adding item:', error);
  }
};
</script>

<style scoped>
section {
  padding: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

button {
  background-color: #007bff;
  color: #fff;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

label{
  width: 100px;
  text-align: left;
}
input,textarea{
  width: auto;
  border-radius: 0.3rem;
  height: 2rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
}
.form-set{
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.form-set-submit{
  margin-top: 0.5rem;
}

h1 {
  font-size: 1.5rem;
}

textarea {
  height: auto; /* Allow textarea to adjust height based on content */
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
</style>
