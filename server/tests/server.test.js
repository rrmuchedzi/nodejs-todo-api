var expect = require('expect');
var request = require('supertest');
const {ObjectID} = require('mongodb');

var app = require('./../server');
var {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
  text: 'First test todo'
}, {
    _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
    return done();
  });
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

                Todo.find({text})
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
                    expect( todos.length).toBe(2); //We expected the database to be empty at this point
                    done(); //We call done when finished
                }).catch( (e) => { //We catch any errors
                    done(e)
                })
            });
    });
});

describe('GET /todos', () => {
    it('Get all todos in the database', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todo/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`) //toHexString converts an ObjectID to String as a 24 byte hex string representation
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('Should return 404 if todo not found', (done)=> {
        request(app)
        .get(`/todos/5aa51c9541f948410c4e8f80`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 for none-object ID', (done)=> {
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todo/:id', () => {
    let hexId = todos[1]._id.toHexString();

    it('Should remove a todo', (done) => {
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect( (res) => {
            expect( res.body.deleted._id ).toBe(hexId);
        })
        .end((err, res) => {
            if(err)
            return done(err);

            Todo.findById(hexId)
            .then((todo) => {
                expect(todo).toNotExist;
                done();
            }).catch((err) => done(err));
        });
    });

    it('Should return 404 if todo not found', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 if object id is invalid', (done) => {
        let hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId+"232"}`)
        .expect(404)
        .end(done);
    });
});