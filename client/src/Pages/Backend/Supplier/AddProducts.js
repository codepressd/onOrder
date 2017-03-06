/* eslint-disable */
import React, { PropTypes } from 'react';
import { Container, Grid, Image, Form, Input, Divider, Checkbox, Select, Radio, Button, Header, Label, Loader, Sidebar, Segment } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { connect } from 'react-redux';
import{bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import classnames from 'classnames';

//import posting products
import {addProduct, resetFetch} from '../../../Actions/productActions';

//import user Actions
import {checkUserToken, userResetFetch} from '../../../Actions/userActions';//Check user is verified

//Import Mobile Menu
import MobileMenu from '../../../Sidebar/mobileMenu';

//topbar
import TopBar from '../components/TopBar';



// import SideMenu from '../../../Sidebar/SupplierMenu';
import '../backend.css';

const categoryType = [
    { text: '', value: '' },
    { text: 'Produce', value: 'produce' },
    { text: 'Meat', value: 'meat' },
    { text: 'Dry Goods', value: 'dry-goods' },
    { text: 'Packaged Goods', value: 'package-goods' },
    { text: 'Wine', value: 'wine' },
    { text: 'Liqour', value: 'liquor' },
    { text: 'Beer', value: 'beer' }
]

const CLOUDINARY_UPLOAD_PRESET = 'rsli2gdp';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/drzvy00ww/image/upload';

class SupplierAddProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: null,
            uploadedFileCloudinaryUrl: '',
            errors: {}
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    componentWillMount(){
            const{token} = this.props.activeUser;
            const userId = this.props.activeUser.user.id;
            const userInfo = {
              token,
              userId
            }
            this.props.checkUserToken(userInfo);
  }

  componentWillUnmount(){
            this.props.userResetFetch();
            this.props.resetFetch();
  }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
        });

        this.handleImageUpload(files[0]);
    }

    validateInput(data) {
    let errors = {};
    
 
    Object.keys(data).map(function(objectKey, index) {
        let value = data[objectKey];

        if (typeof value == 'string' && value.length < 1) {

            errors[objectKey] = 'This Field Is Required';

        }
      
    });
 
    return {
        errors
    }
}

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
            .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
            }
        });
    }

    handleSubmit(e, data){
        e.preventDefault();

        let formData = data.formData;
        let user = this.props.activeUser.user;
        //add Supplier
        formData.supplierId = user.userId;
        formData.supplier = user.companyName;
        const {uploadedFile, uploadedFileCloudinaryUrl} = this.state;
        const{errors} = this.validateInput(formData);

        //If errors return errors to state and display
        if (Object.keys(errors).length !== 0) {
            this.setState({ errors });
        }
        
        //if no errors, add image if  one was uploaded, send product to DB
        if (Object.keys(errors).length === 0) {
             this.setState({
                 errors: {},
             });


             if (uploadedFile) {

                formData.image = uploadedFileCloudinaryUrl;

             }else{

                formData.image='';
             }
            
             this.props.addProduct(formData);
           
     }

}



    render() {
      const {user} = this.props;

      const {errors} = this.state;

      const {success, userIsFetching} = this.props.activeUser;
    

    if(userIsFetching || !success){
              return(
              <Loader active inline='centered' />
              )
    }else if(success){
                  return (
                    <div>
                    <TopBar {...this.props} />
                    <Sidebar.Pushable as={Segment}>
                            <MobileMenu  {...this.props}/>
                            <Sidebar.Pusher>
                                      <Segment basic>
                                        <div className='pageWrap'>
                                      
                                            <Container className='formDash'>
                                              <Header as='h1' >
                                               ADD PRODUCTS
                                              </Header> 
                                              <Grid columns={2} divided>
                                                <h4>Upload an Image - 200px by 200px works best!</h4>
                                                <Grid.Row>
                                                  <Grid.Column>
                                                    <Dropzone 
                                                      className='image-drop'
                                                      onDrop={this.onImageDrop.bind(this)}
                                                      multiple={false}
                                                      accept="image/*">
                                                      <div className='drop-text'>Drop an image or click to select a file to upload.</div>
                                                    </Dropzone>
                                                  </Grid.Column>
                                                  <Grid.Column>
                                                    {this.state.uploadedFileCloudinaryUrl === '' ? null :
                                                      <div>
                                                        <p>{this.state.uploadedFile.name}</p>
                                                        <img className='imageSize' src={this.state.uploadedFileCloudinaryUrl} />
                                                      </div>}
                                                  </Grid.Column>
                                                </Grid.Row>
                                              </Grid>
                                              <Divider hidden />
                                              <Form onSubmit={this.handleSubmit}>

                                                <Form.Group widths='2'>
                                                      <Form.Field>
                                                            <h2>Pick One  General Category</h2>
                                                            <Form.Select label='Product Category' className={classnames({'error': errors.productType})} name='productType' options={categoryType} placeholder={errors.productType && errors.productType ||'Product Category'} required/>
                                                      </Form.Field>
                                                </Form.Group>

                                                <Divider section />

                                                <Form.Input label='Name Of Product' className={classnames({'error': errors.productName})} name='productName' placeholder={errors.productName && errors.productName ||'Product Name'}required/>
                                                <h4>Individual Price</h4>
                                                <Form.Group>
                                                      <Input label='$' type='text' className={classnames({'error': errors.unitPrice})} name='unitPrice' placeholder={errors.unitPrice && errors.unitPrice ||'Amount'} required/>
                                                </Form.Group>

                                                <h4>Case Price</h4>
                                                <Form.Group>
                                                      <Input label='$' type='text' className={classnames({'error': errors.casePrice})} name='casePrice' placeholder={errors.casePrice && errors.casePrice ||'Amount'} required/>
                                                </Form.Group>

                                                <h4>Products per Case</h4>
                                                <Form.Group>
                                                      <Input label='#' type='text' className={classnames({'error': errors.numInCases})} name='numInCases' placeholder={errors.numInCases && errors.numInCases ||'Amount'} required/>
                                                </Form.Group>

                                                <h4>Quantity - (In cases)</h4>
                                                <Form.Group>
                                                      <Input label='#' type='text' className={classnames({'error': errors.quantity})} name='quantity' placeholder={errors.quantity && errors.quantity ||'Amount'} required/>
                                                </Form.Group>

                                                <Form.TextArea name='productDescription' className={classnames({'error': errors.productDescription})} label='Product Description' placeholder={errors.productDescription && errors.productDescription ||'Describe what you are selling...'} rows='3' required/>

                                                <Button type='submit' floated='right'>Add Product</Button>
                                              </Form>
                                            </Container>
                                      
                                        </div>
                                        </Segment>
                            </Sidebar.Pusher>
                  </Sidebar.Pushable>
                  </div>
                  )}else{
                        browserHistory.push('/login');
                      }
    }
}

function mapStateToProps(state){
  return {
    user: state.ActiveUser.user
  }

}

function mapDispatchToProps(dispatch){
  return{
    checkUserToken: bindActionCreators(checkUserToken, dispatch),
    userResetFetch: bindActionCreators(userResetFetch, dispatch),
    resetFetch: bindActionCreators(resetFetch, dispatch),
    addProduct: bindActionCreators(addProduct, dispatch)
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(SupplierAddProducts);