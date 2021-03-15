const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`${port}번 port에 http server를 띄웠습니다.`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/fetch_test.html");
});

const temp = [
    { id: 1, name: 'test1'},
    { id: 2, name: 'test2'},
    { id: 3, name: 'test3'},
];

app.get('/crud/test', (req, res) => {
    res.send(temp)
})

app.post('/crud/test', (req, res) => {
    // 데이터 유효성 검사
    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send({ error : '이름 규칙이 어긋남' });
        return;
    }


    let temp_case = {
        id : Number(req.body.id),
        name : req.body.name
    };
    temp.push(temp_case);
    res.send(temp_case);
})

app.put('/crud/test/:id', (req, res) => {
    let temp_case = temp.find(t => t.id === parseInt(req.params.id))
    if(!temp){
        res.status(404).send({ error : "해당 id가 없음" })
    }

    if(!req.body.name || req.body.name.length < 3){
        res.status(400).send({ error : '이름 규칙이 어긋남' });
        return;
    }

    temp_case.name = req.body.name;
    res.send(temp_case);
})

app.delete('/crud/test/:id', (req, res) => {
    let temp_case = temp.find(c => c.id === parseInt(req.params.id));
    if(!temp_case){
        res.status(404).send({ error : '해당 id가 없음' });
        return;
    }

    temp.splice(temp.indexOf(temp_case), 1);

    res.send(temp_case);
})

app.get('/crud/test/:id', (req, res) => {
    let temp_case = temp.find(t => t.id === parseInt(req.params.id))
    if(!temp_case){
        res.status(404).send({ error : 'The temp with the given ID was not found' });
    }

    res.send(temp_case);
})

// // 다중 param 가능
// app.get('/crud/test/:id/:name', (req, res) => {
//     res.send(req.params);
// })