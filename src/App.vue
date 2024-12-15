<template>
  <ErrorCatch :isError="isError"/>
  <div class="calculator">
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
  <div class="controllInput">
    <button
      v-for="button in buttonSpecial" 
      :key="button" 
      @click="handleClick(button)"
      class="calc-button special"
    >
      {{ button }}
    </button>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, onUnmounted } from "vue";
import * as calculator from "./calc/calc.ts";
import ErrorCatch from "./components/ErrorCatch.vue";

const input = ref<string>("");
const isError = ref<boolean>(false);

const buttons = ref([
  "7", "8", "9", "/",
  "4", "5", "6", "*",
  "1", "2", "3", "-",
  "0", ".", "=", "+",
  // "del", "cle"
]);

const buttonSpecial = ref([
  "Delete", "Clear"
])

const handleClick = (button: string) => {
  if (button === "=") {
    try {
      if (calculator.CheckHandleError(input.value)) {
          input.value = eval(input.value).toString();
          isError.value = false;
      }
      else {
        // input.value = eval(input.value).toString();
        isError.value = true;
        console.log("here1");
        
      }
    } catch (error) {
        isError.value = true;
        console.log("here2");
    }
  } 
  else if (button === "Clear") {
    input.value = "";
  } 
  else if(button == "Delete") {
    try {
      input.value = calculator.Delete(eval(input.value).toString());
    }
    catch(error) {
      console.log("loi");
    }
  }
  else {
    input.value += button; // string
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if(event.key === "Enter") {
    try {
      if (calculator.CheckHandleError(input.value)) {
          input.value = eval(input.value).toString();
          isError.value = false;
      }
      else {
        isError.value = true;
        // input.value = eval(input.value).toString();
        
      }
    } catch (error) {
        isError.value = true;
    }
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
})

</script>

<style scoped>
.no-select {
  user-select: none;
  -webkit-user-select: none; 
  -moz-user-select: none; 
  -ms-user-select: none; 
}

.controllInput button {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 300px;
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
  background-color: rgb(206, 202, 240);
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
  transition: all 0.3s ease-in-out;
}

button:hover {
  background-color: #8d7bf3;
  color: #fff; 
  transform: scale(1.1); 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}

button:active {
  transform: scale(1.05); 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}

button:focus {
  outline: none; 
}

button.special {
  border: 1px solid;
}

button.special:hover {
  background-color: #d9534f;
  color: white;
  transform: scale(1.1);
}
</style>
