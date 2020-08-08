<template>
  <div>
    <p>{{name}}</p>
    <video ref="video" :controls="controls" muted></video>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: {
    stream: {
      required: true
    },
    name: {
      type: String,
      required: true
    },
    controls: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    stream(value) {
      console.log("new stream", value);
      this.$refs.video.srcObject = value;
      this.$refs.video.play();
    }
  },
  mounted() {
    this.$refs.video.srcObject = this.stream;
    this.$refs.video.play();
  }
};
</script>

<style lang="scss" scoped>
div {
  display: flex;
  position: relative;
  //   width: 100%;
  //   max-height: 300px;
  // flex-grow:
  p {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 5px;
    background: #cecece;
    border-radius: 10px;
    padding: 5px 10px;
  }
  //   video {
  //     height: 300px;
  //   }
}
</style>