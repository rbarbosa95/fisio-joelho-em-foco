<template>
  <v-card>
    <v-card-title class="title">
      <v-tabs :grow="true" v-model="tab">
        <v-tab>{{ customer ? 'Ficha de Avaliação' : 'Perfil' }}</v-tab>
        <v-tab v-show="customer">AV. Fisio. DE JOELHO</v-tab>
      </v-tabs>
    </v-card-title>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card-text>
          <v-form ref="form" v-model="valid" @submit.prevent="submit()">
            <v-container>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.firstName"
                    label="Nome"
                    outlined
                    required
                    flat
                    :disabled="disable"
                    :rules="notEmpty"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.lastName"
                    label="Sobrenome"
                    outlined
                    required
                    flat
                    :disabled="disable"
                    :rules="notEmpty"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="form.age"
                    label="Idade"
                    outlined
                    required
                    flat
                    type="number"
                    :disabled="disable"
                    :rules="notEmpty"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-select
                    v-model="form.sexo"
                    :items="items"
                    label="Sexo"
                    outlined
                    :disabled="disable"
                    :rules="notEmpty"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.profession"
                    label="Profissão"
                    outlined
                    required
                    flat
                    :disabled="disable"
                    :rules="notEmpty"
                  ></v-text-field>
                </v-col>
                <v-col cols="4" offset-md="8">
                  <v-btn
                    block
                    x-large
                    depressed
                    color="success"
                    :disabled="disable"
                    type="submit"
                  >
                    Salvar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-tab-item>
      <v-tab-item>
        <v-card-text>
          <v-form
            ref="formfisio"
            v-model="validfisio"
            @submit.prevent="submitFisio()"
          >
            <v-container>
              <v-row>
                <v-col cols="12">
                  <p>
                    1) Qual é o motivo que o trouxe a buscar tratamento
                    fisioterapêutico?
                  </p>
                  <v-text-field
                    v-model="formFisio.question1"
                    outlined
                    required
                    flat
                    :rules="notEmpty"
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    2) Quando começou? como? Estava realizando alguma atividade
                    diferente das de costume? O início foi lento ou súbito?
                  </p>
                  <v-text-field
                    v-model="formFisio.question2"
                    outlined
                    required
                    flat
                    :rules="notEmpty"
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    3) Sente dor com muita frequência? Como é essa dor?
                    Irradiada, queimação, dormência? Piora durante o dia ou a
                    noite?
                  </p>
                  <v-text-field
                    v-model="formFisio.question3"
                    outlined
                    required
                    flat
                    :rules="notEmpty"
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    4) Certas posições ou atividade tem efeito aumentado ou
                    diminuído sobre a sua dor?
                  </p>
                  <app-radio-boolean
                    :question="formFisio.question4"
                    value="question4"
                    @changeRadio="changeRadio"
                    :rules="notEmpty"
                    :disabled="disableFrom"
                  />
                  <v-text-field
                    v-model="formFisio.subQuestion4"
                    label="Quais?"
                    flat
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    5) Apresenta alguma doença sistêmica crônica ou grave?
                  </p>
                  <app-radio-boolean
                    :question="formFisio.question5"
                    value="question5"
                    @changeRadio="changeRadio"
                    :disabled="disableFrom"
                  />
                  <v-text-field
                    v-model="formFisio.subQuestion5"
                    label="Quais?"
                    flat
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    6) Apresenta algo em sua história familiar que possa ser
                    relacionado?
                  </p>
                  <app-radio-boolean
                    :question="formFisio.question6"
                    value="question6"
                    @changeRadio="changeRadio"
                    :disabled="disableFrom"
                  />
                  <v-text-field
                    v-model="formFisio.subQuestion6"
                    label="Quais?"
                    flat
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    7) Faz uso de medicamentos?
                  </p>
                  <app-radio-boolean
                    :question="formFisio.question7"
                    value="question7"
                    @changeRadio="changeRadio"
                    :disabled="disableFrom"
                  />
                  <v-text-field
                    v-model="formFisio.subQuestion7"
                    label="Quais?"
                    flat
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    8) Já realizou algum procedimento cirúrgico? Se sim, Qual?
                  </p>
                  <v-text-field
                    v-model="formFisio.question8"
                    outlined
                    required
                    flat
                    :rules="notEmpty"
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    9) A dor ou lesão impede que realize atividades cotidianas?
                    Cite.
                  </p>
                  <v-text-field
                    v-model="formFisio.question9"
                    outlined
                    required
                    flat
                    :rules="notEmpty"
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <p>
                    10) Costuma sentir algum “rangido” ou estalido no joelho?
                    Sente instabilidade para movimentar-se?
                  </p>
                  <v-text-field
                    v-model="formFisio.question10"
                    outlined
                    required
                    flat
                    :rules="notEmpty"
                    :disabled="disableFrom"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" offset-md="8">
                  <v-btn
                    block
                    x-large
                    depressed
                    color="success"
                    type="submit"
                    :disabled="disableFrom"
                  >
                    Salvar
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-card-text>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import AppRadioBoolean from '@/components/common/AppRadioBoolean'
export default {
  name: 'Account',
  components: {
    AppRadioBoolean
  },
  data: () => ({
    tab: null,
    valid: false,
    validfisio: false,
    form: {
      id: '',
      firstName: '',
      lastName: '',
      age: '',
      sexo: '',
      profession: '',
      role: {
        type: ''
      }
    },
    items: ['Feminino', 'Masculino', 'Outro'],
    notEmpty: [v => !!v || 'Esse campo  é necessário'],
    answered: false,
    answered_id: '',
    answeredFisio: false,
    formFisio: {
      question1: '',
      question2: '',
      question3: '',
      question4: false,
      subQuestion4: '',
      question5: false,
      subQuestion5: '',
      question6: false,
      subQuestion6: '',
      question7: false,
      subQuestion7: '',
      question8: '',
      question9: '',
      question10: '',
      user: ''
    }
  }),
  beforeCreate() {
    this.$store.dispatch('auth/profile').then(() => {
      this.user(this.$store.getters['auth/getuser'])
      if (this.form?.role?.type === 'customer') {
        this.$store
          .dispatch('answered/getAnswered', {
            'user.id_eq': this.form.id
          })
          .then(res => {
            this.answered_id = res?.data[0].id
            this.answered = res?.data[0].infosBasic
            this.answeredFisio = res?.data[0].evaluationForm
          })
          .then(() => {
            this.$store
              .dispatch('evaluationForm/getEvalationForm', {
                'user.id_eq': this.form.id
              })
              .then(res => {
                this.fisio(res?.data[0])
              })
              .catch(err => console.error(err))
          })
      }
    })
  },
  computed: {
    customer() {
      return this.form.role.type === 'customer'
    },
    disable() {
      return this.form.role.type !== 'customer' || this.answered
    },
    disableFrom() {
      return this.form.role.type !== 'customer' || this.answeredFisio
    }
  },
  methods: {
    user(value) {
      this.form = {
        id: value.id,
        firstName: value.firstName,
        lastName: value.lastName,
        age: value.age,
        sexo: value.sexo,
        profession: value.profession,
        role: {
          type: value.role.type
        }
      }
    },
    fisio(value) {
      this.formFisio = {
        question1: value.question1,
        question2: value.question2,
        question3: value.question3,
        question4: value.question4,
        subQuestion4: value.subQuestion4,
        question5: value.question5,
        subQuestion5: value.subQuestion5,
        question6: value.question6,
        subQuestion6: value.subQuestion6,
        question7: value.question7,
        subQuestion7: value.subQuestion7,
        question8: value.question8,
        question9: value.question9,
        question10: value.question10,
        user: this.form.id
      }
    },
    submit() {
      if (this.valid) {
        this.$store.commit('app/inProgress')
        this.$store
          .dispatch('users/updateUsers', this.form)
          .then(res => {
            this.$store.commit('app/inProgress')
            if (res?.status !== 200) {
              this.$store.commit('app/seProgressStatus', 'error')
              this.$store.commit('app/setAlert')
              this.$store.commit(
                'app/setMessage',
                'No momento não foi possivél realizar sua alteração!'
              )
            } else {
              this.answered = true
              this.$store.dispatch('answered/sendAnswereds', {
                id: this.answered_id,
                infosBasic: this.answered
              })
              this.$store.commit('app/seProgressStatus', 'info')
              this.$store.commit('app/setAlert')
              this.$store.commit(
                'app/setMessage',
                'Informação atualizada com sucesso'
              )
            }
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        this.$refs.form.validate()
      }
    },
    submitFisio() {
      if (this.validfisio) {
        this.$store.commit('app/inProgress')
        this.formFisio.user = this.form.id
        this.$store
          .dispatch('evaluationForm/createEvalationForm', this.formFisio)
          .then(res => {
            this.$store.commit('app/inProgress')
            if (res?.status !== 200) {
              this.$store.commit('app/seProgressStatus', 'error')
              this.$store.commit('app/setAlert')
              this.$store.commit(
                'app/setMessage',
                'No momento não foi possivél realizar sua alteração!'
              )
            } else {
              this.answeredFisio = true
              this.$store.dispatch('answered/sendAnswereds', {
                id: this.answered_id,
                evaluationForm: this.answeredFisio
              })
              this.$store.commit('app/seProgressStatus', 'info')
              this.$store.commit('app/setAlert')
              this.$store.commit(
                'app/setMessage',
                'Informação atualizada com sucesso'
              )
            }
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        this.$refs.formfisio.validate()
      }
    },
    changeRadio(payload, question) {
      this.formFisio[question] = payload
    }
  }
}
</script>

<style lang="scss" scoped></style>
