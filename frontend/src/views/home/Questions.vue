<template>
  <v-card>
    <v-card-title class="title">Questionário de funcionalidade</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-form ref="form" v-model="valid" @submit.prevent="submit()">
        <v-container>
          <v-row>
            <v-col cols="12">
              <p>1) Ao andar você manca?</p>
              <app-radio-multi
                value="question1"
                :question="form.question1"
                :data="question.data[0]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                2) Você sustenta o peso do corpo?
              </p>
              <app-radio-multi
                value="question2"
                :question="form.question2"
                :data="question.data[1]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                3) Para subir e descer escadas você:
              </p>
              <app-radio-multi
                value="question3"
                :question="form.question3"
                :data="question.data[2]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                4) Certas posições ou atividade tem efeito aumentado ou
                diminuído sobre a sua dor?
              </p>
              <app-radio-multi
                value="question4"
                :question="form.question4"
                :data="question.data[3]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                5) Apresenta alguma doença sistêmica crônica ou grave?
              </p>
              <app-radio-multi
                value="question5"
                :question="form.question5"
                :data="question.data[4]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                6) Apresenta algo em sua história familiar que possa ser
                relacionado?
              </p>
              <app-radio-multi
                value="question6"
                :question="form.question6"
                :data="question.data[5]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                7) Faz uso de medicamentos?
              </p>
              <app-radio-multi
                value="question7"
                :question="form.question7"
                :data="question.data[6]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                8) Já realizou algum procedimento cirúrgico? Se sim, Qual?
              </p>
              <app-radio-multi
                value="question8"
                :question="form.question8"
                :data="question.data[7]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                9) A dor ou lesão impede que realize atividades cotidianas?
                Cite.
              </p>
              <app-radio-multi
                value="question9"
                :question="form.question9"
                :data="question.data[8]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                10) Costuma sentir algum “rangido” ou estalido no joelho?
              </p>
              <app-radio-multi
                value="question10"
                :question="form.question10"
                :data="question.data[9]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
            </v-col>
            <v-col cols="12">
              <p>
                11) Pratica atividades físicas?
              </p>
              <app-radio-multi
                value="question11"
                :question="form.question11"
                :data="question.data[10]"
                @changeRadio="changeRadio"
                :disabled="disable"
              />
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
                :disabled="disable"
              >
                Salvar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import AppRadioMulti from '@/components/common/AppRadioMulti'

export default {
  name: 'Question',
  components: {
    AppRadioMulti
  },
  data: () => ({
    valid: false,
    answered_id: '',
    answered: false,
    user: {
      id: ''
    },
    form: {
      question1: 'reply1',
      question2: 'reply1',
      question3: 'reply1',
      question4: 'reply1',
      question5: 'reply1',
      question6: 'reply1',
      question7: 'reply1',
      question8: 'reply1',
      question9: 'reply1',
      question10: 'reply1',
      question11: 'reply1',
      user: ''
    },
    question: {
      data: [
        ['Não', 'as vezes', 'sempre'],
        ['sim, totalmente e sem dor', 'Sim, mas com dor', 'Não, é impossível'],
        [
          'Não tem dificuldade',
          'Tem leve dor ao descer',
          'Tem dor ao subir e ao descer',
          'Não consegue realizar essa atividade'
        ],
        [
          'Não apresenta dificuldade',
          'Sente dor após vários agachamentos',
          'Sente dor após poucos agachamentos',
          'Só é possível descarregando parcialmente o peso do corpo na perna afetada',
          'Não consegue realizar o movimento'
        ],
        [
          'Não tem dificuldade',
          'Sente dor leve rapidamente',
          'Sente dor forte',
          'Não consegue realizar a atividade'
        ],
        [
          'Não tem dificuldade',
          'Tem leve dificuldade',
          'Tem dor constante',
          'Não consegue realizar a atividade'
        ],
        [
          'Não sente dor',
          'Sente dor somente após a realização de exercícios',
          'Sente dor constante',
          'sente dor forte que faz com que estenda os joelhos por um tempo',
          'Não consegue sentar com os joelhos flexionados'
        ],
        [
          'Não apresenta',
          'Apresenta depois de muito esforço',
          'Apresenta após esforço mínimo',
          'Apresenta apenas a noite',
          'apresenta constantemente'
        ],
        [
          'sim',
          'não',
          'Somente para longas distâncias',
          'Somente em caso de muita dor'
        ],
        [
          'Nunca',
          'Tenho a sensação, mas nunca o travamento',
          'Travamento ocasional',
          'Frequentemente'
        ],
        [
          'Sim, todos os dias',
          'Sim, de forma irregular, de 2 a 3 vezes por semana',
          'Somente as vezes',
          'Não, nunca faço, não gosto',
          'Não faço porque a dor me impede'
        ]
      ]
    }
  }),
  computed: {
    disable() {
      return this.answered
    }
  },
  beforeCreate() {
    this.$store.dispatch('auth/profile').then(() => {
      this.getUser(this.$store.getters['auth/getuser'])
      this.$store
        .dispatch('answered/getAnswered', {
          'user.id_eq': this.user.id
        })
        .then(res => {
          this.answered_id = res?.data[0].id
          this.answered = res?.data[0].questions
        })
        .then(() => {
          this.$store
            .dispatch('questions/getQuestions', {
              'user.id_eq': this.user.id
            })
            .then(res => {
              this.questions(res?.data[0])
            })
            .catch(err => console.error(err))
        })
    })
  },
  methods: {
    getUser(value) {
      this.user = {
        id: value.id
      }
    },
    questions(value) {
      this.form = {
        question1: value.question1,
        question2: value.question2,
        question3: value.question3,
        question4: value.question4,
        question5: value.question5,
        question6: value.question6,
        question7: value.question7,
        question8: value.question8,
        question9: value.question9,
        question10: value.question10,
        question11: value.question11,
        user: this.user.id
      }
    },
    changeRadio(payload, question) {
      this.form[question] = payload
    },
    submit() {
      if (this.valid) {
        this.form.user = this.user.id
        this.$store.commit('app/inProgress')
        this.$store
          .dispatch('questions/sendQuestions', this.form)
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
                questions: this.answered
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
    }
  }
}
</script>

<style></style>
