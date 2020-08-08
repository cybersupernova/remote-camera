<template>
  <div id="app">
    <Setup @complete="showPreview" v-if="!setup" />
    <h1 v-if="setup">RoomId: {{ roomId }}</h1>
    <div class="main-preview">
      <Preview v-if="setup" :stream="previewStream" :name="name" controls />
    </div>
    <Members @changePreview="changePreview" />
  </div>
</template>

<script>
import Setup from "./components/Setup";
import Preview from "./components/Preview";
import Members from "./components/Members";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Setup,
    Preview,
    Members
  },
  data() {
    return {
      setup: false,
      name: null,
      roomId: null,
      previewStream: null
    };
  },
  watch: {
    localStream(value) {
      this.previewStream = value;
    }
  },
  computed: {
    ...mapState(["localStream"])
  },
  methods: {
    showPreview({ name, roomId }) {
      this.setup = true;
      this.name = name;
      this.roomId = roomId;
    },
    changePreview(member) {
      if (member.stream) this.previewStream = member.stream;
      else this.previewStream = this.localStream;
    }
  }
};
</script>

<style lang="scss" scoped>
.main-preview {
  background: #000;
  height: 300px;
  display: flex;
  justify-content: center;
}
</style>