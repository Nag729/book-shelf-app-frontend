<template>
  <div class="modal-card">
    <form ref="inputForm" @submit.prevent>
      <!-- Header -->
      <header class="modal-card-head">
        <p class="modal-card-title">Add A Book!</p>
        <div class="field">
          <b-switch v-model="isLocalSwitchOn">Manual</b-switch>
        </div>
      </header>

      <!-- Body -->
      <section class="modal-card-body">
        <!-- Title -->
        <b-field label="Title">
          <b-input v-model="title" icon="book-open" required></b-input>
        </b-field>
        <!-- Image URL -->
        <b-field label="Image URL">
          <b-input v-model="imageUrl" type="url" icon="link" required></b-input>
        </b-field>
        <!-- All Pages -->
        <b-field label="All Pages">
          <b-numberinput v-model="allPages" step="1"></b-numberinput>
        </b-field>
        <!-- Status -->
        <b-field label="Status">
          <b-select placeholder="Status" icon="check" required expanded>
            <template v-for="o in statusOption">
              <option :key="o" :value="o">{{ o }}</option>
            </template>
          </b-select>
        </b-field>
      </section>

      <!-- Footer -->
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="emitClose">
          Close
        </button>
        <button class="button is-primary" @click="registNewBook">
          Add
        </button>
      </footer>
    </form>
  </div>
</template>

<script>
import { BOOK_REGIST_MUTATION } from '@/graphql/mutation/bookRegist';

export default {
  name: 'ManualInputForm',

  props: {
    isSwitchOn: Boolean
  },

  data() {
    return {
      title: '',
      imageUrl: '',
      allPages: 300,
      status: 'WISH',
      statusOption: ['WISH', 'HAVE', 'DOING', 'DONE']
    };
  },

  computed: {
    // define computed to pass sync props.
    isLocalSwitchOn: {
      get() {
        return this.isSwitchOn;
      },
      set(value) {
        if (!value) this.resetForm();
        this.$emit('update:isSwitchOn', value);
      }
    }
  },

  methods: {
    /**
     * Regist new book.
     */
    async registNewBook() {
      // check validation
      const isValid = this.$refs.inputForm.reportValidity();
      if (!isValid) return;

      const variables = {
        title: this.title,
        imageUrl: this.imageUrl,
        allPages: this.allPages,
        status: this.status
      };

      await this.$apollo.mutate({
        mutation: BOOK_REGIST_MUTATION,
        variables: variables
      });

      this.resetForm();

      // emit for re-search
      this.$emit('regist-complete');
    },

    /**
     * emit to close modal.
     */
    emitClose() {
      this.resetForm();
      this.$emit('close-modal');
    },

    /**
     * reset local data.
     */
    resetForm() {
      this.title = '';
      this.imageUrl = '';
      this.allPages = 300;
      this.status = 'WISH';
    }
  }
};
</script>

<style lang="scss" scoped></style>
