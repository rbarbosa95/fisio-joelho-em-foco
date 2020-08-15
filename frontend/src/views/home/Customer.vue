<template>
  <v-card>
    <v-card-title class="title">Pacientes</v-card-title>
    <v-divider></v-divider>
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
    <v-divider></v-divider>
    <v-expansion-panels>
      <v-expansion-panel :disabled="!isUser">
        <v-expansion-panel-header>
          {{ titles[0] }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="6">
              Nome: {{ customer.firstName + ' ' + customer.lastName }}
            </v-col>
            <v-col cols="6">Profissão: {{ customer.profession }}</v-col>
            <v-col cols="6">Sexo: {{ customer.sexo }}</v-col>
            <v-col cols="6">Idade: {{ customer.age }}</v-col>
            <v-col cols="6">E-mail: {{ customer.email }}</v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="!isUser">
        <v-expansion-panel-header>
          {{ titles[1] }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-if="!fisio.error">
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                1) Qual é o motivo que o trouxe a buscar tratamento
                fisioterapêutico?
              </p>
              <p class="tertiary--text font-weight-medium">
                {{ fisio.question1 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                2) Quando começou? como? Estava realizando alguma atividade
                diferente das de costume? O início foi lento ou súbito?
              </p>
              <p class="tertiary--text font-weight-medium">
                {{ fisio.question2 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                3) Sente dor com muita frequência? Como é essa dor? Irradiada,
                queimação, dormência? Piora durante o dia ou a noite?
              </p>
              <p class="tertiary--text font-weight-medium">
                {{ fisio.question3 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                3) Sente dor com muita frequência? Como é essa dor? Irradiada,
                queimação, dormência? Piora durante o dia ou a noite?
              </p>
              <p class="tertiary--text font-weight-medium">
                {{ fisio.question3 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                4) Certas posições ou atividade tem efeito aumentado ou
                diminuído sobre a sua dor?
              </p>
              <p class="tertiary--text font-weight-medium">
                <app-radio-boolean :question="fisio.question4" disabled />
                {{ fisio.subQuestion4 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                5) Apresenta alguma doença sistêmica crônica ou grave?
              </p>
              <p class="tertiary--text font-weight-medium">
                <app-radio-boolean :question="fisio.question5" disabled />
                {{ fisio.subQuestion5 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                6) Apresenta algo em sua história familiar que possa ser
                relacionado?
              </p>
              <p class="tertiary--text font-weight-medium">
                <app-radio-boolean :question="fisio.question6" disabled />
                {{ fisio.subQuestion6 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                7) Faz uso de medicamentos?
              </p>
              <p class="tertiary--text font-weight-medium">
                <app-radio-boolean :question="fisio.question7" disabled />
                {{ fisio.subQuestion7 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                8) Já realizou algum procedimento cirúrgico? Se sim, Qual?
              </p>
              <p class="tertiary--text font-weight-medium">
                {{ fisio.question8 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                9) A dor ou lesão impede que realize atividades cotidianas?
                Cite.
              </p>
              <p class="tertiary--text font-weight-medium">
                {{ fisio.question9 }}
              </p>
              <v-divider></v-divider>
            </v-col>
            <v-col cols="12">
              <p class="secondary--text font-weight-regular">
                10) Costuma sentir algum “rangido” ou estalido no joelho? Sente
                instabilidade para movimentar-se?
              </p>
              <p class="tertiary--text font-weight-medium">
                {{ fisio.question10 }}
              </p>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-alert type="warning" :value="true">
                {{ fisio.error }}
              </v-alert>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="!isUser">
        <v-expansion-panel-header>
          {{ titles[2] }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-if="!form.error">
            <v-col cols="12">
              <p>1) Ao andar você manca?</p>
              <app-radio-multi
                value="question1"
                :question="form.question1"
                :data="question.data[0]"
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
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
                :disabled="true"
              />
            </v-col>
            <v-col cols="12">
              <v-img src="@/assets/img/frame.png" />
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-alert type="warning" :value="true">
                {{ form.error }}
              </v-alert>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="!isUser">
        <v-expansion-panel-header>
          {{ titles[3] }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-if="!painScales.error">
            <v-col cols="6" v-for="item in painScales" :key="item.id">
              <v-card :color="color(item.pain)" dark>
                <v-card-title> Escala da dor: {{ item.pain }} </v-card-title>
                <v-card-subtitle>
                  Data: {{ item.dateReply | moment('LL') }}
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-alert type="warning" :value="true">
                {{ painScales.error }}
              </v-alert>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel :disabled="!isUser">
        <v-expansion-panel-header>
          {{ titles[4] }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row v-if="!moodScales.error">
            <v-col cols="12" v-for="item in moodScales" :key="item.id">
              <div class="caption">
                Data da resposta: {{ item.dateReply | moment('LL') }}
              </div>
              <div>
                <app-radio-multi
                  value="mood"
                  :data="mood"
                  :question="item.mood"
                  :row="true"
                  :disabled="true"
                />
              </div>
              <div class="mb-4">Outro: {{ item.other }}</div>
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-alert type="warning" :value="true">
                {{ moodScales.error }}
              </v-alert>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import AppRadioBoolean from '@/components/common/AppRadioBoolean'
import AppRadioMulti from '@/components/common/AppRadioMulti'
export default {
  name: 'Customer',
  components: {
    AppRadioBoolean,
    AppRadioMulti
  },
  data: () => ({
    search: '',
    titles: [
      'Ficha de Avaliação',
      'Av. Fisio. de Joelho',
      'Questionário de Funcionalidade',
      'Escala de Dor',
      'Escala de Humor'
    ],
    form: {},
    customer: {},
    fisio: {},
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
    },
    painScales: [],
    mood: [
      'Calmo',
      'Feliz',
      'Cheio de energia',
      'Com variações de humor',
      'Irritado',
      'Triste',
      'Ansioso',
      'Desanimado',
      'Apático'
    ],
    moodScales: []
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
    }
  },
  watch: {
    search(val) {
      console.info(val)
      this.$store
        .dispatch('users/getOneUser', this.search)
        .then(res => {
          this.customer = {
            firstName: res.firstName,
            lastName: res.lastName,
            age: res.age,
            email: res.email,
            sexo: res.sexo,
            profession: res.profession
          }
        })
        .then(() => {
          this.$store
            .dispatch('evaluationForm/getEvalationForm', {
              'user.id_eq': this.search
            })
            .then(res => {
              if (res?.data[0]) {
                this.fisio = {
                  question1: res?.data[0].question1,
                  question2: res?.data[0].question2,
                  question3: res?.data[0].question3,
                  question4: res?.data[0].question4,
                  subQuestion4: res?.data[0].subQuestion4,
                  question5: res?.data[0].question5,
                  subQuestion5: res?.data[0].subQuestion5,
                  question6: res?.data[0].question6,
                  subQuestion6: res?.data[0].subQuestion6,
                  question7: res?.data[0].question7,
                  subQuestion7: res?.data[0].subQuestion7,
                  question8: res?.data[0].question8,
                  question9: res?.data[0].question9,
                  question10: res?.data[0].question10
                }
              } else {
                this.fisio = {
                  error: 'Não há reposta'
                }
              }
            })
            .catch(err => console.error(err))
        })
        .then(() => {
          this.$store
            .dispatch('questions/getQuestions', {
              'user.id_eq': this.search
            })
            .then(res => {
              if (res?.data[0]) {
                this.form = {
                  question1: res?.data[0].question1,
                  question2: res?.data[0].question2,
                  question3: res?.data[0].question3,
                  question4: res?.data[0].question4,
                  question5: res?.data[0].question5,
                  question6: res?.data[0].question6,
                  question7: res?.data[0].question7,
                  question8: res?.data[0].question8,
                  question9: res?.data[0].question9,
                  question10: res?.data[0].question10,
                  question11: res?.data[0].question11
                }
              } else {
                this.form = {
                  error: 'Não há reposta'
                }
              }
            })
            .catch(err => console.error(err))
        })
        .then(() => {
          this.$store
            .dispatch('painScale/getPainScale', {
              'user.id_eq': this.search
            })
            .then(res => {
              if (res?.data.length > 0) {
                this.painScales = []
                res?.data.map(item => {
                  this.painScales.push({
                    id: item.id,
                    pain: item.pain,
                    dateReply: item.dateReply
                  })
                })
              } else {
                this.painScales = {
                  error: 'Não há reposta'
                }
              }
            })
        })
        .then(() => {
          this.$store
            .dispatch('moodScale/getMoodScale', {
              'user.id_eq': this.search
            })
            .then(res => {
              if (res?.data.length > 0) {
                this.moodScales = []
                res?.data.map(item => {
                  this.moodScales.push({
                    id: item.id,
                    mood: item.mood,
                    dateReply: item.dateReply,
                    other: item.other
                  })
                })
              } else {
                this.moodScales = {
                  error: 'Não há reposta'
                }
              }
            })
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  methods: {
    color(value) {
      if (value < 2) return 'info'
      if (value < 4) return 'teal'
      if (value < 6) return 'yellow accent-4'
      if (value < 8) return 'orange'
      return 'red'
    }
  }
}
</script>

<style lang="scss" scoped></style>
