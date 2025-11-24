import express from 'express';
import cors from 'cors';
import { VM } from 'vm2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/node-runner/run", (req, res) => {
    const { code } = req.body;
    console.log("Received:", code);

    try {
        const logs = [];
        const vm = new VM({
            timeout: 2000,
            sandbox: {
                console: {
                    log: (...args) => logs.push(args.join(" "))
                }
            }
        });

        const wrapped = `
      (function () {
        ${code}
      })()
    `;

        const result = vm.run(wrapped);

        res.json({
            output: [...logs, result !== undefined ? String(result) : ""].join("\n")
        });

    } catch (err) {
        res.json({ output: String(err) });
    }
});

app.listen(PORT, () => console.log(`Node runner on :${PORT}`));
