<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
        <base-button v-if="!isLoading && !isCoach" link to="/register">
          Register as Coach
        </base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :firstname="coach.firstName"
          :lastname="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>No coaches found.</h3>
    </base-card>
  </section>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue';
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: { CoachFilter, CoachItem },
  created() {
    this.loadCoaches();
  },
  data() {
    return {
      isLoading: false,
      activeFilters: { frontend: true, backend: true, career: true },
    };
  },
  methods: {
    async loadCoaches() {
      this.isLoading = true;
      await this.$store.dispatch('coaches/loadCoaches');
      this.isLoading = false;
    },
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
  },
  computed: {
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      const filteredCoaches = coaches.filter(coach => {
        if (
          (this.activeFilters.frontend && coach.areas.includes('frontend')) ||
          (this.activeFilters.backend && coach.areas.includes('backend')) ||
          (this.activeFilters.career && coach.areas.includes('career'))
        ) {
          return true;
        } else {
          return false;
        }
      });

      return filteredCoaches;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
