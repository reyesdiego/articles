import React, {Component} from 'react';
import {Form, Input, Select, Button} from 'antd';
import {pathOr} from 'ramda';

import axios from 'axios';

const {Option} = Select;

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 5}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 12}
    }
};
class Article extends Component {
    state = {
        entity: {},
        authors: [],
        loading: false
    };

    componentDidMount() {
        if (this.props.match.params.id) {
            axios.get(`http://localhost:8080/article/${this.props.match.params.id}`).then(data => {
                this.setState({entity: data.data});
            });
        }
        axios.post('http://localhost:8080/author/list', {}).then(data => {
            this.setState({authors: data.data.data});
        });
    }
    onChange = (key, value) => {
        console.log(key, value);
        this.setState({entity: {...this.state.entity, [key]: value}});
    };
    handleSubmit = e => {
        e.preventDefault();
        let method = 'post';
        if (this.props.match.params.id) {
            method = 'put';
        }
        axios({
            url: 'http://localhost:8080/article',
            method: method,
            data: {...this.state.entity}
        }).then(data => {
            console.log(data);
        });
    };
    handleTableChange = (pagination, filters, sorter) => {};

    render() {
        const {entity, authors} = this.state;
        return (
            <Form {...formItemLayout}>
                <Form.Item label="Título" validateStatus="">
                    <Input
                        placeholder="Título"
                        value={pathOr('', ['title'], entity)}
                        onChange={e => this.onChange('title', e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Descripción" validateStatus="">
                    <Input
                        placeholder="Descripción"
                        value={pathOr('', ['short_description'], entity)}
                        onChange={e => this.onChange('short_description', e.target.value)}
                    />
                </Form.Item>

                <Form.Item label="Autores" hasFeedback validateStatus="">
                    <Select
                        mode="tags"
                        value={pathOr('', ['authors'], entity).split(',')}
                        onChange={e => {
                            console.log(e);
                            this.onChange('authors', e.join(','));
                        }}
                    >
                        {authors.map(author => (
                            <Option key={author._id} value={author._id}>
                                {author.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{span: 12, offset: 5}}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                        Guardar
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
export default Article;
