<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Отзывы" class="has-table has-mobile-sort-spaced">
        <reports-table
          :data-url="'http://0.0.0.0:8000/admin/reports'"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import ReportsTable from '../components/ReportsTable'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
export default {
  name: 'Reports',
  components: {
    TitleBar,
    CardComponent,
    ReportsTable
  },
  computed: {
    titleStack () {
      return ['Панель управления', 'Отзывы']
    }
  }
}
</script>
