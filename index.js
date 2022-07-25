const express = require('express')
const app = express()
const axios = require('axios')
const cheerio = require('cheerio')  
const port = 3000

app.get('/tracuu/:sbd',async (req, res) => {
    const  {data } = await axios.get(`https://vietnamnet.vn/giao-duc/diem-thi/tra-cuu-diem-thi-tot-nghiep-thpt/2022/${req.params.sbd}.html`)
    let $ = cheerio.load(data)
   let subjects = []
 let marks= []
    $('html body div.wrapper.bg-event div.main div.resultSearch div.resultSearch__right table tbody tr td').each(function (index,element){
        console.log(index)
        if(index % 2 == 0){
             subjects.push($(element).html())       
        }
        else{
            marks.push($(element).html())   
        }
         console.log($(element).html())
        
    } )
   console.log(subjects)
console.log(marks)
let result =  subjects.reduce((obj,key,index) => {
    obj[key] = marks[index]
    return obj;
},{})
console.log(result['Toán'])

  res.send(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})