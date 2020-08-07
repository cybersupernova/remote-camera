<template>
  <div>
    <ValidationObserver slim v-slot="o">
      <form @submit.prevent="o.handleSubmit(handleForm)">
        <Input
          v-model="roomId"
          placeholder="Enter RoomID"
          name="room ID"
          rules="required|min:6"
          id="roomId"
        />
        <Input
          v-model="name"
          placeholder="Enter Name"
          name="name"
          rules="required|min:3"
          id="name"
        />
        <button type="submit" :disabled="o.invalid">Enter</button>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Input from "./base/Input";
import { mapActions } from "vuex";
export default {
  name: "Setup",
  components: { Input },
  data() {
    return {
      roomId: null,
      name: null
    };
  },
  methods: {
    ...mapActions({
      saveStream: "saveLocalStream"
    }),
    handleForm() {
      console.log(this.name, this.roomId);
      window.navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            facingMode: "environment"
          }
        })
        .then(stream => {
          console.log("got stream", stream);
          this.saveStream(stream);
          this.$emit("complete", {
            name: this.name,
            roomId: this.roomId
          });
        })
        .catch(error => {
          console.log("camera access failed");
          console.log(error);
          this.$emit("complete", {
            name: this.name,
            roomId: this.roomId
          });
        });
      this.$socket.client.emit("REGISTER", {
        name: this.name,
        roomId: this.roomId
      });
    }
  }
};
</script>