<template>
  <div>
    <div v-for="member in members" :key="member.id">{{member.id}}, {{member.name}}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Members",
  computed: {
    ...mapGetters({
      members: "allMembers"
    })
  }
};
</script>