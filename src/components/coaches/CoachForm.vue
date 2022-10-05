<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstname.isValid }">
      <label for="firstname">Firstname</label>
      <input
        id="firstname"
        type="text"
        v-model.trim="firstname.value"
        @blur="clearValidity('firstname')"
      />
      <p v-if="!firstname.isValid">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastname.isValid }">
      <label for="lastname">Lastname</label>
      <input
        id="lastname"
        type="text"
        v-model.trim="lastname.value"
        @blur="clearValidity('lastname')"
      />
      <p v-if="!lastname.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model="description.value"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        id="rate"
        type="number"
        v-model.number="rate.value"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          id="frontend"
          type="checkbox"
          value="frontend"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          id="backend"
          type="checkbox"
          value="backend"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          id="career"
          type="checkbox"
          value="career"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],
  data() {
    return {
      firstname: { value: '', isValid: true },
      lastname: { value: '', isValid: true },
      description: { value: '', isValid: true },
      rate: { value: null, isValid: true },
      areas: { value: [], isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      if (this.firstname.value === '') {
        this.firstname.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastname.value === '') {
        this.lastname.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.value === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      const formData = {
        firstname: this.firstname.value,
        lastname: this.lastname.value,
        description: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };

      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
