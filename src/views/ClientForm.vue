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
            <b-field label="ID" horizontal>
              <b-input v-model="form.id" custom-class="is-static" readonly />
            </b-field>
            <hr />
            <b-field label="Имя" message="Имя пользователя" horizontal>
              <b-input
                v-model="form.name"
                placeholder="Иван Петров"
                required
              />
            </b-field>
            <b-field label="TelegramID" message="Telegram ID" horizontal>
              <b-input
                v-model="form.chat_id"
                placeholder="21365466548"
                required
              />
            </b-field>
            <b-field label="Username" message="Telegram username" horizontal>
              <b-input
                v-model="form.username"
                placeholder="@ivanpetrov"
                required
              />
            </b-field>
            <b-field label="Телефон" message="Номер телефона" horizontal>
              <b-input
                v-model="form.phone"
                placeholder="+79998887654"
                required
              />
            </b-field>
            <b-field label="Интересы" class="has-check" horizontal>
              <checkbox-picker
                v-model="customElementsForm.checkbox"
                :options="{ lorem: 'Спорт', ipsum: 'Бизнес', dolore: 'IT', Genr: 'Путешествия' }"
                type="is-primary"
              />
            </b-field>
            <hr />
            <b-field label="Создан" horizontal>
              <b-datepicker
                v-model="form.created_date"
                placeholder="Выбрать"
                icon="calendar-today"
                @input="input"
              >
              </b-datepicker>
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
        <card-component
          v-if="isProfileExists"
          title="Профиль пользователя"
          icon="account"
          class="tile is-child"
        >
          <user-avatar
            :avatar="form.avatar"
            class="image has-max-width is-aligned-center"
          />
          <hr />
          <b-field label="Имя">
            <b-input :value="form.name" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Telegram ID">
            <b-input :value="form.chat_id" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Username">
            <b-input :value="form.username" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Телефон">
            <b-input :value="form.phone" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Создан">
            <b-input
              :value="createdReadable"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import find from 'lodash/find'
import TitleBar from '@/components/TitleBar'
import HeroBar from '@/components/HeroBar'
import Tiles from '@/components/Tiles'
import CardComponent from '@/components/CardComponent'
import UserAvatar from '@/components/UserAvatar'
import CheckboxPicker from '@/components/CheckboxPicker'

export default {
  name: 'ClientForm',
  components: {
    UserAvatar,
    CardComponent,
    Tiles,
    HeroBar,
    TitleBar,
    CheckboxPicker
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      isLoading: false,
      form: this.getClearFormObject(),
      createdReadable: null,
      isProfileExists: false,
      customElementsForm: {
        checkbox: []
      }
    }
  },
  computed: {
    titleStack () {
      let lastCrumb

      if (this.isProfileExists) {
        lastCrumb = this.form.name
      } else {
        lastCrumb = 'Создать пользователя'
      }

      return ['Панель управления', 'Пользователи', lastCrumb]
    },
    heroTitle () {
      if (this.isProfileExists) {
        return this.form.name
      } else {
        return 'Создать пользователя'
      }
    },
    heroRouterLinkTo () {
      if (this.isProfileExists) {
        return { name: 'client.new' }
      } else {
        return '/admin'
      }
    },
    heroRouterLinkLabel () {
      if (this.isProfileExists) {
        return 'Создать пользователя'
      } else {
        return 'Панель управления'
      }
    },
    formCardTitle () {
      if (this.isProfileExists) {
        return 'Редактировать пользователя'
      } else {
        return 'Создать пользователя'
      }
    }
  },
  watch: {
    id (newValue) {
      this.isProfileExists = false

      if (!newValue) {
        this.form = this.getClearFormObject()
      } else {
        this.getData()
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        id: null,
        name: null,
        company: null,
        city: null,
        created_date: new Date(),
        created_mm_dd_yyyy: null
      }
    },
    getData () {
      if (this.$route.params.id) {
        axios
          .get('http://0.0.0.0:8000/admin')
          .then((r) => {
            const item = find(
              r,
              (item) => item.id === parseInt(this.$route.params.id)
            )

            if (item) {
              this.isProfileExists = true
              this.form = item
              // this.form.created_date = new Date(item.created_mm_dd_yyyy)
              // this.createdReadable = dayjs(
              //   new Date(item.created_mm_dd_yyyy)
              // ).format('D.MM.YYYY')
            } else {
              this.$router.push({ name: 'client.new' })
            }
          })
          .catch((e) => {
            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    input (v) {
      this.createdReadable = dayjs(v).format('D.MM.YYYY')
    },
    submit () {
      this.isLoading = true

      setTimeout(() => {
        this.isLoading = false

        this.$buefy.snackbar.open({
          message: 'Demo only',
          queue: false
        })
      }, 500)
    }
  }
}
</script>
