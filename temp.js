import axios from 'axios'

axios.get('http://localhost:3005/topics/1/cards/4')
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err))
