<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      {{ heroTitle }}
      <router-link slot="right" :to="heroRouterLinkTo" class="button">
        {{ heroRouterLinkLabel }}
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          :title="formCardTitle"
          icon="account-edit"
          class="tile is-child"
        >
          <form @submit.prevent="submit">
            <b-field label="Количество встреч" horizontal>
              <b-input
                v-model="form.talk_count"
                required
              />
            </b-field>
            <b-field label="Цена CZK" horizontal>
              <b-input
                v-model="form.amount"
                required
              />
            </b-field>
            <hr />
            <b-field horizontal>
              <b-button
                type="is-primary"
                :loading="isLoading"
                native-type="submit"
              >Отправить</b-button
              >
            </b-field>
          </form>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'

export default {
  name: 'TariffNew',
  components: {
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar
  },
  data () {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false
    }
  },
  computed: {
    titleStack () {
      const lastCrumb = 'Добавить тариф'
      return ['Панель управления', 'Тарифы', lastCrumb]
    },
    heroTitle () {
      return 'Добавить тариф'
    },
    heroRouterLinkTo () {
      return '/admin'
    },
    heroRouterLinkLabel () {
      return 'Панель управления'
    },
    formCardTitle () {
      return 'Добавить тариф'
    }
  },
  methods: {
    getClearFormObject () {
      return {
        talk_count: null,
        amount: null
      }
    },
    submit () {
      this.isLoading = true

      axios.post('http://0.0.0.0:8000/admin/tariff/add', {
        talk_count: this.form.talk_count,
        amount: this.form.amount
      })
        .then(function (response) {
        })
        .catch(function (error) {
          console.log(error)
        })
      setTimeout(() => {
        this.isLoading = false
        this.form = this.getClearFormObject()
        this.$buefy.snackbar.open({
          message: 'Успешно!',
          queue: false
        })
      }, 500)
    }
  }
}
</script>
