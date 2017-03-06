/* eslint-disable */
import React, { PropTypes } from 'react';
import { Card , Divider, Image, Button} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';


//Import delete Action
import {deleteProduct} from '../../../../Actions/productActions';

class SingleProduct extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
      
        const { product, user } = this.props;
        let imageUrl =  '/walrus-hat-noimage.jpg';

        if (product.image.length !== 0) {
            imageUrl = product.image;
        }

        return (
          <Card centered>
              <Card.Content>
                <Image floated='right' size='tiny' src={imageUrl}/>
                <Card.Header>
               {product.title}
                </Card.Header>
                <Card.Meta>
                  <p><strong>Single: ${product.price.unit}</strong></p>
                  <p><strong>Case: ${product.price.case}</strong></p>
                  <p><strong>Category : {product.category}</strong></p>
                </Card.Meta>
                <Divider />
                <Card.Description>
                  <Button.Group size='large'>
                    <Button onClick={()=>browserHistory.push('/backend/supplier/products/'+product._id)} >Edit</Button>
                    <Button.Or />
                    <Button onClick={this.props.deleteProduct.bind(this, product._id, this.props.index)}>Remove</Button>
                  </Button.Group>
                </Card.Description>
              </Card.Content>
          </Card>
         
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.ActiveUser.user,
    }
}

function mapDispatchToProps (dispatch){
	return{
		deleteProduct: bindActionCreators(deleteProduct, dispatch)
	}
}


export default connect(mapStateToProps,mapDispatchToProps) (SingleProduct);
