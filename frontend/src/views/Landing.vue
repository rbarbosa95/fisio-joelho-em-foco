<template>
  <v-container id="landing">
    <v-row>
      <v-col cols="12" sm="6">
        <h1 class="title-main display-1 font-weight-light">
          Bem vindo ao seu,
          <span class="primary--text font-weight-regular headline-sm">
            Fisioterapeuta
          </span>
        </h1>
        <p class="my-6">
          Cuide do seu joelho, o site joelho em foco foi criado pensando em
          você! O cenário de pandemia do COVID-19 afetou diretamente o trabalho
          que estava sendo realizado com os pacientes com dor crônica, e isso
          gerou uma série de complicações psicossomáticas. Para isso, diante
          dessa nova realidade imposta pelo Coronavírus, nós, do joelho em foco,
          oferecemos serviços de atendimento online e tele atendimento
          personalizado, para garantir a continuidade dos cuidados com a saúde,
          orientar sobre a prática de exercícios físicos e abordar sobre a
          importância da educação em dor.
        </p>
        <v-btn
          depressed
          color="primary"
          class="text-none mr-2"
          large
          :elevation="10"
          to="/login?type=0"
        >
          Fazer consulta
          <v-icon right>mdi-arrow-right</v-icon>
        </v-btn>
        <v-btn
          depressed
          color="primary lighten-5"
          class="text-none primary--text"
          large
          to="/login?type=1"
          >Fisioterapeuta</v-btn
        >
      </v-col>
      <v-col cols="12" sm="6">
        <v-img src="@/assets/svg/figure-main.svg" width="100%" />
      </v-col>
      <v-divider></v-divider>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Landing'
}
</script>

<style lang="scss" scoped>
@media (min-width: 960px) {
  #landing {
    .title-main {
      font-size: 45px !important;
    }
  }
}
</style>
