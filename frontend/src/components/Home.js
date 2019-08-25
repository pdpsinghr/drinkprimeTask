import React, { Component } from 'react';
import CardView from '../modules/cardComponent/CardView';
import { Card, Icon, Button, Search } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getAllThread } from '../actions/getAllThread';
import _ from 'lodash';

class Home extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: false,
            searchedData: []
        }
    }

    componentDidMount() {
        const user = {
            userId: this.props.auth.user.id
        }
        this.props.getAllThread(user);
    }

    componentWillReceiveProps(nextProps) {

        if(this.props !== nextProps && nextProps.threadList.user){
            this.setState({searchedData : nextProps.threadList.user.data })
        }
    }

    searchResult = (e, { value }) => {
        if(!value){
            this.setState({searchedData : this.props.threadList.user.data })
        }
        else{
            const re = new RegExp(_.escapeRegExp(value), 'i');
            const data = this.props.threadList.user.data;
            const isMatch = result => re.test(result.title);
            this.setState({
                searchedData: _.filter(data, isMatch),
              })
        }

    }

    renderCardView = (data) => {
        return (data.map(item => <CardView title={item.title} description={item.description} tags={item.tags} username = {item.username} />))
    }

    render() {

        const threadList = !!this.props.threadList.user ? this.state.searchedData : [];
        return (
            <div>
                <div className="d-flex border-top-left-right-0 border-bottom" style={{marginTop: '20px', marginBottom: '20px'}}>
                  <h1>Threads</h1>
                  <div style={{ align: 'right' }} className="ml-auto">
                      <Search
                          onSearchChange={this.searchResult}
                          open = {false}
                      />
                  </div>
                </div>
                <div styles={{ overflowY: 'scroll' }} >
                    {this.renderCardView(threadList)}
                    <div style={{ float: 'right', right: '100px', bottom: '100px' }} className="position-fixed">
                        <Icon onClick={() => this.props.history.push('/newthread')} name='add' align='right' size='big'></Icon>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    threadList: state.getAllThread,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { getAllThread })(withRouter(Home))
