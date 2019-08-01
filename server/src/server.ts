import express from 'express';
import fs from 'fs';
import {
    exec
} from 'child_process';
import {
    join
} from 'path';
import bodyParser from 'body-parser';
import next from 'next';
import CommandRunner from './runCommand';
import Registry from './languageRegistry';
import AudioProcessor from './processing/AudioProcessor';

const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()


app.prepare()
    .then(() => {
        const server = express();
        Registry.findLanguages();

        console.log();

        server.use('/static', express.static(join(__dirname + "/static")));
        server.use(bodyParser.json());

        server.get('/voiceCommand', (req, res) => {
            res.send(AudioProcessor.processAudio(req.body.audio));
        });

        server.get('/runCommand', (req, res) => {
            res.send(CommandRunner.runCommand(req.body.command));
        });


        server.get('*', (req, res) => {
            return handle(req, res)
        });

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })