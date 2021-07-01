<template>
  <div>
    <hero-bar :has-right-visible="false">
      Панель управления
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="user_count"
          label="Подписчики"
        />
      </tiles>
      <card-component title="Список подписчиков" class="has-table has-mobile-sort-spaced">
        <clients-table-sample
          :data-url="'http://0.0.0.0:8000/admin/users'"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardWidget from '@/components/CardWidget'
import CardComponent from '@/components/CardComponent'
import ClientsTableSample from '@/components/ClientsTableSample'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'admin',
  components: {
    ClientsTableSample,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar
  },
  data () {
    return {
      user_count: 0
    }
  },
  computed: {
    ...mapGetters([
      'USERS'
    ])
  },
  mounted () {
    this.GET_USERS_FROM_API()
      .then((response) => {
        if (response.data) {
          this.user_count = response.data.length
        }
      })
    this.$buefy.snackbar.open({
      message: 'С возвращением!',
      queue: false
    })
  },
  methods: {
    ...mapActions([
      'GET_USERS_FROM_API'
    ])
  }
}
</script>
