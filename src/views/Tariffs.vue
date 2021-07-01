<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      <router-link slot="right" to="/tariff/new" class="button">
        Добавить
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component title="Тарифы" class="has-table has-mobile-sort-spaced">
        <tariffs-table
          :data-url="'http://0.0.0.0:8000/admin/tariffs'"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import TariffsTable from '../components/TariffsTable'
import CardComponent from '@/components/CardComponent'
import HeroBar from '@/components/HeroBar'
import TitleBar from '@/components/TitleBar'
export default {
  name: 'Tariffs',
  components: {
    TitleBar,
    CardComponent,
    TariffsTable,
    HeroBar
  },
  computed: {
    titleStack () {
      return ['Панель управления', 'Тарифы']
    }
  }
}
</script>
