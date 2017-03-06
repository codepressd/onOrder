import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './App.css';

// Import Components
import DevTools from './components/DevTools';
import BackendSidebar from './components/Sidebar/BackendSidebar';
import BackEndHeader from './components/Header/BackendHeader';
import FrontEndHeader from './components/Header/FrontEndHeader';
import Footer from './components/Footer/Footer';


export class App extends Component {
    constructor(props) {
        super(props);
        this.state = { isMounted: false };
    }

    componentDidMount() {
        this.setState({ isMounted: true }); // eslint-disable-line
    }
    
    
    render() {
        const {user} = this.props.activeUser;
        //Backend Layout

       if(user){
        return(
            <div className='backend-app-wrap'>
                {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
                <BackendSidebar  {...this.props}/>
                <div className='content-wrap' >
                                {React.cloneElement(this.props.children, this.props)}
                </div>
            </div>
            )
    }else{
        //Frontend Layout

        return(
                    <div className='app-wrap'>
                        {this.state.isMounted && !window.devToolsExtension && process.env.NODE_ENV === 'development' && <DevTools />}
                           <FrontEndHeader activeUser={this.props.activeUser} {...this.props} />
                           
                            <div className='components-wrap' >
                                    {React.cloneElement(this.props.children, this.props)}
                          </div>
                          <Footer />
                   </div>
       )
       }   
   }
             
}


// Retrieve data from store as props
function mapStateToProps(store) {
    return {
        activeUser: store.ActiveUser
    };
}

export default connect(mapStateToProps)(App);
