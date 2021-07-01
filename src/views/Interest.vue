<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      <router-link slot="right" to="/interest/new" class="button">
        Добавить
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Список Интересов" class="has-table has-mobile-sort-spaced">
        <interests-table
          :data-url="'http://0.0.0.0:8000/admin/interests'"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import InterestsTable from '../components/InterestsTable'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import TitleBar from '@/components/TitleBar'
export default {
  name: 'Tables',
  components: {
    TitleBar,
    CardComponent,
    HeroBar,
    InterestsTable
  },
  computed: {
    titleStack () {
      return ['Панель управления', 'Интересы']
    }
  }
}
</script>
