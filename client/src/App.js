/* eslint-disable */
import React, {Component} from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { Router,  IndexRoute, Route, browserHistory } from 'react-router';
import { routerActions } from 'react-router-redux';

//Import Frontend Components
import FrontWrap from './Pages/App/App';
import Home from './Pages/Frontend/Home/pages/home';
import Login from './Pages/Frontend/Login/pages/login';
import Logout from './Pages/Frontend/Login/pages/logout';
import Signup from './Pages/Frontend/Signup/pages/signup';

//Import BackendComponents Shared
import BackendDashboard from './Pages/Backend/sharedPages/backendDashboard';
import Profile from './Pages/Backend/sharedPages/profile';
import ChangePassword from './Pages/Backend/sharedPages/changePassword';
import ChangeProfile from './Pages/Backend/sharedPages/changeProfile';
import UpdateSuccess from './Pages/Backend/sharedPages/updateSuccess';
import Team from './Pages/Backend/sharedPages/teamPage';
import AddTeamMember from './Pages/Backend/sharedPages/addTeamMember';
import ChildProfile from './Pages/Backend/sharedPages/childProfile';

//Import Backend Supplier Components
import Products from './Pages/Backend/Supplier/Products';
import ViewProduct from './Pages/Backend/Supplier/viewProduct';
import AddProducts from './Pages/Backend/Supplier/AddProducts';
import UpdateProducts from './Pages/Backend/Supplier/UpdateProducts';
import SupplierOrders from './Pages/Backend/Supplier/SupplierOrders';


//Import User Auth Helpers
import {getUserRole, userLoggedRedirect } from './Helpers/userHelpers';


export default function App (props){
    const userRole = getUserRole(props);

    return (
      <Provider store={props.store}>
          <Router history={props.history}>
            <Route path='/' component={FrontWrap} >
              <IndexRoute component={Home} />
              <Route path='/login' component={Login}  />
              <Route path='/logout' component={Logout}  />
              <Route path='/signup' component={Signup}  />

            {/*Backend Shared Routes*/}
              <Route path='/backend/dashboard' component={BackendDashboard} />
              <Route path='/backend/profile' component={Profile} />
              <Route path='/backend/change-password' component={ChangePassword} />
              <Route path='/backend/change-profile' component={ChangeProfile} />
              <Route path='/backend/update-success' component={UpdateSuccess} />
              <Route path='/backend/your-team' component={Team} />
              <Route path='/backend/add-team-member' component={AddTeamMember} />
              <Route path='/backend/member-profile/:memberId' component={ChildProfile} />


            {/*Backend Supplier Routes*/}
            <Route path='/backend/supplier/products' component={Products} />
            <Route path='/backend/supplier/products/:productId' component={ViewProduct} />
            <Route path='/backend/supplier/add-products' component={AddProducts} />
            <Route path='/backend/supplier/update-products/:productId' component={UpdateProducts} />
            <Route path='/backend/supplier/your-orders' component={SupplierOrders} />

          {/*Backend Restaurant Routes*/}
            </Route>
         </Router>
      </Provider>
      
    )
  
}

