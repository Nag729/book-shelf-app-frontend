<template>
  <div>
    <section>
      <div class="columns">
        <div class="column">
          <b-field label="DATE">
            <b-datepicker
              placeholder="Click to select..."
              icon="calendar-today"
              trap-focus
              v-model="date"
            ></b-datepicker>
          </b-field>
        </div>
        <div class="column">
          <b-field label="PAGE">
            <b-numberinput v-model="number" step="5" :min="min" :max="max"></b-numberinput>
          </b-field>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <div class="is-pulled-right">
            <b-button type="is-info" icon-left="book-open" @click="regist">I Read it !</b-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",

  props: {},

  data() {
    return {
      date: new Date(),
      number: 0, // TODO: 初期値はサーバから取得した値
      min: 0, // TODO: サーバから取得した値
      max: 500 //TODO: サーバから取得した値
    };
  },

  methods: {
    regist() {
      console.log("REGIST!");
    }
  }
};
</script>
