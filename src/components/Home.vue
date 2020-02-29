<template>
  <v-container>
    <v-flex xs12>
      <h2>{{title}}</h2>
      <v-flex xs12>
        <br>
        <ZipCodeInput
          v-on:save="processZipCode($event)"
          :hint="hint"
        />
      </v-flex>

      <v-flex mb-4>
        <div v-if="fahrenheitTemperature!==null">
          <DisplayTemperature
            :city="city"
            :fahrenheitTemperature="fahrenheitTemperature"
          />
        </div>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>
  import ZipCodeInput from './ZipCodeInput';
  import DisplayTemperature from './DisplayTemperature';
  import Model from './Model';
  var model = new Model();

  export default {
    components: {
      "ZipCodeInput": ZipCodeInput,
      "DisplayTemperature": DisplayTemperature
    },
    methods: {
      processZipCode(code){
        console.log(`processZipCode: ${code}`)
        var data = model.fetchResponse(window.fetch, code);
        data.then(res=>{
          console.log(`data: ${res.main.temp} k`)
          let kelvinTemp = res.main.temp;
          this.FahrenheitConverter(kelvinTemp);
          this.city = res.name;
          console.log(`city: ${this.city}`)
          console.log(`fahrenheit: ${this.fahrenheitTemperature}`)
        })
      },
      FahrenheitConverter(kelvinTemp){
        this.fahrenheitTemperature = model.convertToFahrenheit(kelvinTemp)
        console.log(`F = ${this.fahrenheitTemperature}`)
      }
    },
    data: () => ({
      title: "Weather App",
      fahrenheitTemperature: null,
      city: "",
      hint: "Enter US zip code (ex: 84102) and click Enter to get started"
    })
  }
</script>

<style>

</style>
