import axios from 'axios'

function teste(){
    axios({
        method: 'post',
        url: 'http://localhost:3003/oapi/teste',
        headers: {
            'content-type': 'application/JSON',
            'accept':"*/*",
            'token':'Alex Lee'

        },
        body: {
            nome: 'alex'
        }
      })
        .then(function (response) {
          console.log(response)
        })
}

export default teste;