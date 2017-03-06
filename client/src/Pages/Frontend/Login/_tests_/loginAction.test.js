import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);


describe('Test API Calls To Database', () => {


	it('Restaurant Add To Cart', (done) => {
		mock
			.onPost('api/login')
			.reply(200, {
				userId: 5445,
				role: 'Supplier'
			})

		const expectedReply ={
				userId: 5445,
				role: 'Supplier'
			};

		axios.post('api/login', {email: 'fake@fake.com', password: 'fakepass'})
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

});