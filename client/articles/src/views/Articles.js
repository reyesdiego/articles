import React, {Component} from 'react';
import {Table, Tag} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';

const columns = [
    {
        title: 'Título',
        dataIndex: 'title',
        sorter: true,
        render: (title, row) => <Link to={`/article/${row._id}`}>{title}</Link>,
        width: '20%'
    },
    {
        title: 'Descripción',
        dataIndex: 'short_description',
        // filters: [{text: 'Male', value: 'male'}, {text: 'Female', value: 'female'}],
        width: '60%'
    },
    {
        title: 'Authors',
        key: 'authors',
        dataIndex: 'authors',
        render: tags => (
            <span>
                {tags ||
                    ''.split(',').map(tag => {
                        console.log(tag);
                        let color = tag.length > 5 ? 'blue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag}
                            </Tag>
                        );
                    })}
            </span>
        )
    },
    {
        title: 'Creado',
        dataIndex: 'created_at'
    }
];

class Articles extends Component {
    state = {
        data: [],
        pagination: {defaultPageSize: 5},
        loading: false
    };

    componentDidMount() {
        this.fetch();
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters
        });
    };
    fetch = (params = {}) => {
        // console.log('params:', params);
        this.setState({loading: true});
        axios({
            url: 'http://localhost:8080/article/list',
            method: 'post',
            data: {
                results: 5,
                ...params
            }
            // type: 'json'
        })
            .then(data => {
                const pagination = {...this.state.pagination};
                // Read total count from server
                console.log(pagination);
                pagination.total = data.data.totalCount;
                this.setState({
                    loading: false,
                    data: data.data.data,
                    pagination
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <Table
                columns={columns}
                rowKey={record => record._id.uuid}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
            />
        );
    }
}
export default Articles;
