import React, {Component} from 'react';
import {Table, Tag, Icon, Button, Input} from 'antd';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

class Articles extends Component {
    state = {
        data: [],
        pagination: {defaultPageSize: 5},
        loading: false,
        searchText: ''
    };

    componentDidMount() {
        this.fetch();
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{width: 90}}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}} />
        ),
        onFilter: (value, record) => {
            console.log(value);
            // this.fetch({title: value});
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase());
        },
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        }
        // render: text => (
        //     <Highlighter
        //         highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
        //         searchWords={[this.state.searchText]}
        //         autoEscape
        //         textToHighlight={text.toString()}
        //     />
        // )
    });

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
    fetch = (filters = {}) => {
        // console.log('params:', params);
        filters = {filters: {...filters}};
        this.setState({loading: true});
        axios({
            url: 'http://localhost:8080/article/list',
            method: 'post',
            data: {
                results: 5,
                ...filters
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
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({searchText: selectedKeys[0]});
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    render() {
        const columns = [
            {
                title: 'Título',
                dataIndex: 'title',
                sorter: true,
                render: (title, row) => <Link to={`/article/${row._id}`}>{title}</Link>,
                width: '20%',
                ...this.getColumnSearchProps('title')
            },
            {
                title: 'Descripción',
                dataIndex: 'short_description',
                // filters: [{text: 'Male', value: 'male'}, {text: 'Female', value: 'female'}],
                width: '40%'
            },
            {
                title: 'Authors',
                key: 'authors',
                dataIndex: 'authors',
                render: tags => (
                    <span>
                        {tags.map(tag => {
                            let color = tag.name.length > 5 ? 'blue' : 'green';
                            if (tag === 'loser') {
                                color = 'volcano';
                            }
                            return (
                                <Tag color={color} key={tag._id}>
                                    {tag.name}
                                </Tag>
                            );
                        })}
                    </span>
                )
            },
            {
                title: 'Creado',
                dataIndex: 'created_at',
                width: '20%',
                render: date =>
                    moment(date, 'YYYY-MM-DDTHH:mm:ss-03:00').format('DD-MM-YYYY HH:mm:ss')
            }
        ];
        return (
            <Table
                columns={columns}
                rowKey={record => record._id.uuid}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                expandedRowRender={record => <p style={{margin: 0}}>{record.long_description}</p>}
            />
        );
    }
}
export default Articles;
