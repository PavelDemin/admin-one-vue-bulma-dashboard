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
            <b-field label="Русский" horizontal>
              <b-input
                v-model="form.name_ru"
                required
              />
            </b-field>
            <b-field label="Чешский" horizontal>
              <b-input
                v-model="form.name_cs"
                required
              />
            </b-field>
            <b-field label="Английский" horizontal>
              <b-input
                v-model="form.name_en"
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
  name: 'InterestNew',
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
      const lastCrumb = 'Добавить интерес'
      return ['Панель управления', 'Интересы', lastCrumb]
    },
    heroTitle () {
      return 'Добавить интерес'
    },
    heroRouterLinkTo () {
      return '/admin'
    },
    heroRouterLinkLabel () {
      return 'Панель управления'
    },
    formCardTitle () {
      return 'Добавить интерес'
    }
  },
  methods: {
    getClearFormObject () {
      return {
        name_ru: null,
        name_cs: null,
        name_en: null
      }
    },
    submit () {
      this.isLoading = true

      axios.post('http://0.0.0.0:8000/admin/interest/add', {
        name_ru: this.form.name_ru,
        name_cs: this.form.name_cs,
        name_en: this.form.name_en
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
