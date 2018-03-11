var expect = require('expect');
var request = require('supertest');

var app = require('./../server');
var {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find()
                    .then((todos) => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    })
                    .catch((err) => done(err));
            });
    });

    it("It should not create to do with invalid body data", (done) => {
        request(app) //Request Server
            .post('/todos') //Make HTTP test request, in this case GET
            .send({}) //Use send to send the data to the server, in this case server expects JSON
            .expect(400) //Indicate your expected result, in this case 400 since passed data with send() was empty
            .end((err, res) => { //Define ending result, captures errors and result
                if (err)
                    return done(err); //We call done when finished provided there was an error

                Todo.find().then((todos) => { //Here we are checking the status of the database
                    expect( todos.length).toBe(0); //We expected the database to be empty at this point
                    done(); //We call done when finished
                }).catch( (e) => { //We catch any errors
                    done(e)
                })
            });
    });
});