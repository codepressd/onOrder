import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);


describe('Test API Calls To Database', () => {


	it('Signup', (done) => {
		mock
			.onPost('api/signup')
			.reply(200, {
				userId: 5445,
				role: 'Supplier'
			})

		const expectedReply ={
				userId: 5445,
				role: 'Supplier'
			};

		axios.post('api/signup', {email: 'fake@fake.com', password: 'fakepass'})
		.then((res)=>{
			expect(res.data).toEqual(expectedReply);
			done();
		});
		   

	});

});