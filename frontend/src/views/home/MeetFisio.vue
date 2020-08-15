<template>
  <div>
    <v-card>
      <v-card-text>
        <v-autocomplete
          label="Buscar por paciente"
          :items="users"
          item-value="id"
          item-text="completeName"
          v-model="search"
        >
        </v-autocomplete>
      </v-card-text>
    </v-card>
    <v-card class="mt-5" v-show="search">
      <v-tabs v-model="value" color="primary" slider-color="primary" grow>
        <v-tab ripple> Fazer Avalição do Paciente </v-tab>
        <v-tab ripple>
          Ver Avalições anteriores
        </v-tab>
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="submit()">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="form.dataReply"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="formatDate"
                            label="Data de Publicação"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
                            :rules="notEmpty"
                            required
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="form.dataReply"
                          no-title
                          scrollable
                          locale="pt-br"
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(form.dataReply)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-menu>
                      <v-textarea
                        outlined
                        label="Evolução"
                        v-model="form.record"
                        :rules="notEmpty"
                        required
                      ></v-textarea>
                      <v-btn
                        color="success"
                        class="text-capitalize"
                        block
                        type="submit"
                      >
                        Salvar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-container>
            <v-row>
              <v-col cols="12" v-for="item in record" :key="item.id">
                <p>Dia da Consulta: {{ item.dataReply | moment('LL') }}</p>
                <p>Avaliação: {{ item.record }}</p>
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-card>
    <v-card class="mt-5" v-show="search">
      <v-card-title primary-title>
        Cadastrar Link do Google Meet para o paciente
      </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-form ref="meet" v-model="validMeet" @event.prevent>
              <v-text-field
                outlined
                required
                flat
                solo
                label="Link do Google Meet"
                v-model="meet.link"
                append-icon="mdi-send"
                @click:append="submitMeet"
                :rules="notEmpty"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
      <v-divider></v-divider>
      <v-card-text v-show="meetShow">
        <v-btn
          block
          color="info"
          :href="meet.link"
          target="_blank"
          :disabled="!meetShow"
        >
          Ir para Consulta
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MeetFisio',
  data: () => ({
    search: '',
    menu: false,
    form: {
      dataReply: '',
      record: '',
      user: ''
    },
    valid: false,
    value: 0,
    notEmpty: [v => !!v || 'Esse campo  é necessário'],
    record: [],
    meet: {
      id: '',
      link: '',
      user: ''
    },
    meetShow: false,
    user: {},
    validMeet: false
  }),
  created() {
    this.$store.dispatch('users/getUsers', {
      'role.type_eq': 'customer'
    })
  },
  computed: {
    users() {
      return this.$store.getters['users/getUsers']
    },
    isUser() {
      return this.search !== undefined && this.search !== '' ? true : false
    },
    formatDate: {
      get() {
        return this.form.dataReply
          ? moment(this.form.dataReply).format('LL')
          : ''
      },
      set(newValue) {
        this.form.dataReply = newValue
        return newValue
      }
    }
  },
  watch: {
    search(val) {
      console.info(val)
      this.getCustomerRecord().then(() => {
        this.getOneMeet()
      })
    }
  },
  methods: {
    async getCustomerRecord() {
      await this.$store
        .dispatch('customerRecords/getCustomeRecord', {
          'user.id_eq': this.search
        })
        .then(res => {
          this.record = []
          res?.data.map(item => {
            this.record.push({
              id: item.id,
              dataReply: item.dataReply,
              record: item.record
            })
            this.meet = {
              id: item.user.google_meet
            }
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    async getOneMeet() {
      await this.$store
        .dispatch('meet/getOneMeet', this.meet.id)
        .then(res => {
          this.meetShow = false
          if (res?.status === 200) {
            this.meet = {
              id: res?.data?.id,
              link: res?.data?.link
            }
          }
        })
        .catch(error => {
          console.error('error', error)
        })
    },
    submit() {
      this.$store.commit('app/inProgress')
      if (this.valid) {
        this.form.user = this.search
        this.$store
          .dispatch('customerRecords/sendCustomeRecord', this.form)
          .then(res => {
            if (res?.status !== 200) {
              this.$store.commit('app/seProgressStatus', 'error')
              this.$store.commit('app/setAlert')
              this.$store.commit(
                'app/setMessage',
                'No momento não foi possivél realizar sua alteração!'
              )
            } else {
              this.$store.commit('app/seProgressStatus', 'info')
              this.$store.commit('app/setAlert')
              this.$store.commit('app/setMessage', 'Criado com Sucesso')
            }
            this.$refs.form.reset()
          })
          .catch(error => {
            console.error(error)
          })
          .finally(() => {
            this.value = 1
            this.getCustomerRecord()
          })
      } else {
        this.$refs.form.validate()
      }
    },
    submitMeet() {
      if (this.validMeet) {
        this.$store.commit('app/inProgress')
        if (this.meet.id) {
          this.meet.user = this.search
          this.$store
            .dispatch('meet/updateMeet', this.meet)
            .then(res => {
              if (res?.status === 200) {
                this.$store.commit('app/seProgressStatus', 'info')
                this.$store.commit('app/setAlert')
                this.$store.commit(
                  'app/setMessage',
                  'Pronto só começar a consulta!'
                )
                this.meetShow = true
              } else {
                this.$store.commit('app/seProgressStatus', 'error')
                this.$store.commit('app/setAlert')
                this.$store.commit(
                  'app/setMessage',
                  'No momento não foi possivél realizar sua alteração!'
                )
              }
            })
            .catch(error => {
              console.error(error)
            })
        } else {
          delete this.meet.id
          this.meet.user = this.search
          this.$store
            .dispatch('meet/sendMeet', this.meet)
            .then(res => {
              if (res?.status === 200) {
                this.$store.commit('app/seProgressStatus', 'info')
                this.$store.commit('app/setAlert')
                this.$store.commit(
                  'app/setMessage',
                  'Pronto só começar a consulta!'
                )
                this.meet.id = res?.data?.id
              } else {
                this.$store.commit('app/seProgressStatus', 'error')
                this.$store.commit('app/setAlert')
                this.$store.commit(
                  'app/setMessage',
                  'No momento não foi possivél realizar sua alteração!'
                )
              }
            })
            .then(() => {
              this.getOneMeet().then(() => {
                this.meetShow = true
              })
            })
            .catch(error => {
              console.error(error)
            })
        }
      } else {
        this.$refs.meet.validate()
      }
    }
  }
}
</script>

<style></style>
