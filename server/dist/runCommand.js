import nlp from './processing/nlp';
class CommandRunner {
    setLanguage(l) {
        this.language = l;
    }
    runCommand(input, tabs, line) {
        // Process Language
        const processedCommands = nlp.processLine(input);
        console.log(processedCommands);
        let outputs = [];
        // Pipe command output
        for (const processedCommand of processedCommands) {
            switch (processedCommand.type) {
                case 'write':
                    outputs.push({
                        type: 'write',
                        contents: this
                            .language
                            .writer
                            .default
                            .write(processedCommand.contents, tabs, line)
                    });
                    break;
                case 'read':
                    outputs.push({
                        type: 'read',
                        contents: {
                            cmd: this
                                .language
                                .reader
                                .default
                                .readLine(processedCommand.contents),
                            audio: this
                                .language
                                .reader
                                .default
                                .readLine(processedCommand.contents)
                        }
                    });
                    break;
                case 'nav':
                    outputs.push({
                        type: 'nav',
                        contents: {
                            cmd: this
                                .language
                                .navigator
                                .default
                                .nav(processedCommand.contents),
                            audio: `went to line ${this
                                .language
                                .navigator
                                .default
                                .nav(processedCommand.contents)}`
                        }
                    });
                    break;
                default:
                    outputs.push({
                        type: 'err',
                        contents: {
                            audio: 'command not recognized',
                            cmd: processedCommand.contents
                        }
                    });
                    break;
            }
        }
        // Write -> send code block Read -> Send audio Nav -> Send nav
        return outputs;
    }
}
export default new CommandRunner();