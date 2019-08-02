import React, {KeyboardEvent} from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCode} from '@fortawesome/free-solid-svg-icons';
import Recorder from '../components/Recorder';

let CommandPrefixStyle = {
    backgroundColor: '#272727',
    borderColor: '#ccc',
    width: '50px'
}

let CommandStyle = {
    fontSize: '24px',
    width: '400px',
    color: 'white',
    backgroundColor: '#131313',
    display: 'block'
}

class Command extends React.Component {
    public state : {
        record: boolean;
    }

    constructor(props) {
        super(props);
        this.state = {
            record: false
        }
    }

    voiceShortcut = (event : any) => {
        // Toggle recording status
        if (event.keyCode === 27) {
            this.state.record
                ? this.stopRecording()
                : this.startRecording();
        }
    }

    commandEntered = (target : KeyboardEvent) => {
        if (target.charCode == 13) {
            // Enter key pressed in command bar
            target.preventDefault();
            console.log("Entered!");
        }
    }

    refCallback = element => {
        if (element) {
            console.log(element.getBoundingClientRect());
            // CommandStyle.width = element.getBoundingClientRect().width;
        }
    }

    componentDidMount = () => {
        document.addEventListener('keydown', this.voiceShortcut, false);
    }

    componentWillUnmount = () => {
        document.removeEventListener('keydown', this.voiceShortcut, false);
    }

    startRecording = () => {
        this.setState({record: true});
    }

    stopRecording = () => {
        this.setState({record: false});
    }

    saveAudio = recordedBlob => {
        console.log('recordedBlob is: ', recordedBlob);
    }

    render() {
        return (
            <Form inline>
                <InputGroup>
                    <InputGroup.Prepend>
                        <InputGroup.Text style={CommandPrefixStyle}>
                            <FontAwesomeIcon
                                style={{margin: 'auto'}}
                                icon={faCode}/>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                        ref={this.refCallback}
                        style={CommandStyle}
                        className='command-bar'
                        onKeyPress={this.commandEntered}
                        placeholder="Enter a command..."
                        type="text"></Form.Control>
                    <Recorder
                        record={this.state.record}
                        className='sound-wave'
                        onStop={this.saveAudio}
                        width={48}
                        height={48}
                        strokeColor="#CCC"
                        backgroundColor="#131313"/>
                </InputGroup>
            </Form>
        )
    }
};

export default Command;