<template>
  <div class="form-input">
    <ValidationProvider :name="name" :vid="id" :rules="rules" v-slot="v">
      <input
        :type="type"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)"
        @change="$emit('change', $event)"
      />
      <span>{{ v.errors[0] }}</span>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    rules: String
  }
};
</script>