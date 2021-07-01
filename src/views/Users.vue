<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <section class="section is-main-section">
      <card-component title="Список подписчиков" class="has-table has-mobile-sort-spaced">
        <clients-table-sample
          :data-url="'http://0.0.0.0:8000/admin/users'"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import ClientsTableSample from '@/components/ClientsTableSample'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
export default {
  name: 'Tables',
  components: {
    TitleBar,
    CardComponent,
    ClientsTableSample
  },
  computed: {
    titleStack () {
      return ['Панель управления', 'Пользователи']
    }
  }
}
</script>
