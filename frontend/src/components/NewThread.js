import React, { Component } from 'react';
import { Form, Input, TextArea, Button, Header, Label } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addThread } from '../actions/addThread';


class NewThread extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            initialValidation: true,
            label: [],
            tags: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, label } = this.state;
        if (!title || !description || !label) {
            this.setState({ initialValidation: false });
        }
        else {
            const threadInputData = {
                title: title,
                description: description,
                tags: label,
                username: this.props.auth.user.name,
                userId: this.props.auth.user.id
            }
            this.props.addThread(threadInputData, this.props.history);
        }

    }
    deleteTag = (item) => {
      var { label } = this.state;
      var index = label.indexOf(item)
      if (index !== -1) {
        var arr = label.splice(index, 1)
        this.setState({ label, arr})
      }
    }
    handleKeyPress = (e) => {

        if (e.key === "Enter") {
            if(e.target.value !== '') {
              var { label } = this.state;
              label.push(e.target.value);
              this.setState({ label, [e.target.name]: '' });
            }
        }
        else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }

    }
    render() {
        const { title, description, initialValidation, tags, label } = this.state;
        return (
            <div>
                <div style={{ paddingTop: 10 }}><Header>New Thread</Header></div>
                <div style={{ paddingTop: 20 }}>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Field
                                id='form-input-control-first-name'
                                control={Input}
                                name="title"
                                label='Title'
                                onChange={this.handleInputChange}
                                value={this.state.title}
                                error={!title && !initialValidation}
                                placeholder='Enter Title'
                            />
                        </Form.Group>
                        <Form.Field
                            id='form-textarea-control-opinion'
                            control={TextArea}
                            name="description"
                            onChange={this.handleInputChange}
                            value={this.state.description}
                            error={!description && !initialValidation}
                            label='Description'
                            placeholder='Enter Description'
                        />
                        <Form.Field
                            id='form-input-control-last-name'
                            control={Input}
                            name="tags"
                            onChange={this.handleInputChange}
                            onKeyPress={this.handleKeyPress}
                            value={this.state.tags}
                            error={!label && !initialValidation}
                            label='Tags'
                            placeholder='Enter Tags'
                        />
                        {label.map((item) => <Label key={item}>{item}<h5 onClick={() => this.deleteTag(item)}>&#9986;</h5></Label>)}

                        {/* <div style = {{paddingTop : 30}}>
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        content='Confirm'
                    />
                    </div> */}
                    </Form>
                </div>
                <div style={{ paddingTop: 30 }}>
                    <Button onClick={this.handleSubmit}>Confirm</Button>
                </div>
            </div>


        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// export default connect(mapStateToProps,{ addThread })(NewThread)
export default connect(mapStateToProps, { addThread })(withRouter(NewThread))
