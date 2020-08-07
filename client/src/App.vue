<template>
  <div id="app">
    <Setup @complete="showPreview" v-if="!setup" />
    <p v-if="setup">RoomId: {{ roomId }}</p>
    <Preview v-if="setup" :stream="localStream" :name="name" />
  </div>
</template>

<script>
import Setup from "./components/Setup";
import Preview from "./components/Preview";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Setup,
    Preview
  },
  data() {
    return {
      setup: false,
      name: null,
      roomId: null
    };
  },
  computed: {
    ...mapState(["localStream"])
  },
  methods: {
    showPreview({ name, roomId }) {
      this.setup = true;
      this.name = name;
      this.roomId = roomId;
    }
  }
};
</script>
