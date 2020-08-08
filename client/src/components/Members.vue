<template>
  <div class="members">
    <div
      v-for="member in members"
      :key="member.id"
      class="member"
      @click="$emit('changePreview', member)"
    >
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

<style lang="scss" scoped>
.members {
  display: flex;
  justify-content: flex-start;
  height: 100px;
  .member {
    width: 100px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 2px solid red;
    margin: 0px 5px;
  }
}
</style>