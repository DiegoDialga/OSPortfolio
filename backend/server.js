import express from 'express';
import cors from 'cors';
import {VM} from 'vm2';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/run', (req, res) => {
    const {code} = req.body;
    console.log(code)

    try{
        const logs = [];
        const vm = new VM({
            timeout: 2000,
            sandbox: {
                console: {
                    log: (...args) => logs.push(args.join(' '))
                }
            }
        });

        const result = vm.run(`
            (function() {
            ${code}})()
        `);

        res.json({
            output: [...logs, result !== undefined ? String(result) : ""].join("\n")
        });
    }catch(err){
        res.json({output: String(err)});
    }
})

app.listen(5000, () => console.log("Node running on : 5000"));