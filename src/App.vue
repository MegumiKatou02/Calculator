<template>
<div class="calculator">
    <!-- Sử dụng v-html để áp dụng màu sắc cho các ký tự -->
    <input 
      class="input-display" 
      
      type="text"
      v-model="input"
    >
    <div class="buttons">
      <button
        v-for="button in buttons" 
        :key="button" 
        @click="handleClick(button)"
        class="calc-button"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref, computed } from "vue";
import * as calculator from "./calc/calc.ts";

const input = ref<string>("");

const buttons = ref([
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
  "del", "cle"
]);

const handleClick = (button: string) => {
  if (button === "=") {
    try {
      if (calculator.CheckHandleError(input.value)) {
          input.value = eval(input.value).toString();
      }
      input.value = eval(input.value).toString();
    } catch (error) {
      input.value = "Error";
    }
  } 
  else if (button === "cle") {
    input.value = "";
  } 
  else if(button == "del") {
    input.value = calculator.Delete(eval(input.value).toString());
  }
  else {
    input.value += button; // string
  }

  const formattedInput = computed(() => {
  return input.value.split('').map((char) => {
    const isInvalid = /[^0-9+\-*/.]/.test(char);
    return `<span style="color: ${isInvalid ? 'red' : 'black'}">${char}</span>`;
  }).join('');
});
};

const handleKeyDown = (event: KeyboardEvent) => {
  if(event.key === "Enter") {
    input.value = "Hello";
  }
}



</script>

<style scoped>

.no-select {
  user-select: none;
  -webkit-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
}

.input-display {
  width: 100%;
  height: 40px;
  font-size: 20px;
  margin-bottom: 10px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.calculator {
  max-width: 250px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
}

input {
  width: 100%;
  height: 40px;
  font-size: 20px;
  margin-bottom: 10px;
}

button {
  width: 40px;
  height: 40px;
  font-size: 20px;
  margin: 5px;
  cursor: pointer;
}
</style>
