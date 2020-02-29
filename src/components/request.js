export default function request(zipCode){
  return fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=fdd7fc11f91d2b0cd7b1ad083fd43d77`)
          .then(response =>  response.json())
          .then(data => data)
}
