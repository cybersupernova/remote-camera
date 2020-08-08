<template>
  <div>
    <div v-for="member in members" :key="member.id">
      {{member.id}}
      <Preview v-if="member.stream" :stream="member.stream" :name="member.name" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Preview from "./Preview";
export default {
  name: "Members",
  components: {
    Preview
  },
  computed: {
    ...mapGetters({
      members: "allMembers"
    })
  }
};
</script>