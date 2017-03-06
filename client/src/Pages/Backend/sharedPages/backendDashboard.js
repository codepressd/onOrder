/* eslint-disable */
import React, { PropTypes } from 'react';
import axios from 'axios';
import { Container, Grid, Image, Header, Icon, Divider, Form, Button, Loader, Sidebar, Segment } from 'semantic-ui-react';
import {connect} from 'react-redux';
import{bindActionCreators} from 'redux';
import{browserHistory} from 'react-router';
import classnames from 'classnames';

import '../backend.css';

//Charts
import {Chart} from 'react-google-charts';


//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

//Import Top Bar
import TopBar from '../components/TopBar';


//import Actions
import {checkUserToken, userResetFetch} from '../../../Actions/userActions';//send to database


class Dashboard extends React.Component{

	constructor (props){
		super(props);

	}

	componentWillMount(){
		const{token} = this.props.activeUser;
        const userId = this.props.activeUser.user.userId;
        const userInfo = {
          token,
          userId
        }
        this.props.checkUserToken(userInfo);
	}

	componentWillUnmount(){
            this.props.userResetFetch();
  	}



	render(){
		const options = {
		               chartArea: {width: '90%', height: '80%'},
		               legend:'none'
		
		};
		const data = [
			         	['Day', 'Amt Ordered'],
			         	[ '1',      12],
			         	[ '2',      5.5],
			         	[ '3',     14],
			         	[ '4',      5],
			         	[ '5',      3.5],
			         	[ '6',    7],
			         	[ '7',    7]
			      ];
		return(
			<div >
				<TopBar {...this.props} />
				<Sidebar.Pushable as={Segment}>
				        <MobileMenu  {...this.props}/>
				        <Sidebar.Pusher>
	                  			<Segment basic>
					<div className='mainChartContain'>
						<h1>Orders This Month</h1>
						<Chart
						        chartType="AreaChart" 
						        data={data}
						        options={options}
						        graph_id="AreaChart"
						        width="100%"
						        height="500px"
						        legend_toggle
						       />
						
					</div>
					<Grid relaxed columns={3} centered>
					    <Grid.Column >
					      <div className="info-chart-contain">
					      	<h3>Items Ordered:</h3>
					      	<p className='dashValue'>14</p>
					      </div>

					    </Grid.Column>
					    <Grid.Column>
					      <div className="info-chart-contain">
					      	<h3>Amount Spent This Month:</h3>
					      	<p className='dashValue'>$3000.98</p>

					      </div>
					    </Grid.Column>
					    <Grid.Column>
					      <div className="info-chart-contain">
					      	<h3>Most Recent Order:</h3>
					      	<p className='dashValue'>12/24/16</p>
					      </div>
					    </Grid.Column>
					  </Grid>
					</Segment>
	        			        </Sidebar.Pusher>
				</Sidebar.Pushable>
			</div>
			)
	}

}

function mapDispatchToProps(dispatch){
	return{
		checkUserToken: bindActionCreators(checkUserToken, dispatch),
		userResetFetch: bindActionCreators(userResetFetch, dispatch)
	}
}

export default connect(null, mapDispatchToProps) (Dashboard);