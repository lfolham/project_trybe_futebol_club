import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UsersModel';
import JwtUtils from '../utils/jwtUtils';

import { user, 
    withoutEmailLogin, 
    withouPasswordlogin, 
    successfulLogin, 
    invalidEmail, 
    invalidPassword, 
    userRegistered, } from './mocks/login.mocks';

chai.use(chaiHttp);

const { expect } = chai;


describe('Login test', () => {
    it('Succesfull Login', async function() {
        sinon.stub(bcrypt, 'compareSync').returns(true);
        sinon.stub(User, 'findOne').resolves(user as any);

        const { status, body } = await chai
        .request(app)
        .post('/login')
        .send(successfulLogin)

        expect(status).to.have.status(200);
        expect(body).to.haveOwnProperty('token');
    })
});

    it('login without email', async function() {
        sinon.stub(User, 'findOne').resolves(user as any);

        const { status, body } = await chai
        .request(app).post('/login')
        .send(withoutEmailLogin)

        expect(status).to.have.status(400);
        expect(body).to.deep.equal({
            message: 'Invalid email or password'
    })
});

    it('login without password', async function() {
        sinon.stub(User, 'findOne').resolves(user as any);

        const { status, body } = await chai
        .request(app).post('/login')
        .send(withouPasswordlogin)

        expect(status).to.have.status(400);
        expect(body).to.deep.equal({
            message: 'Invalid email or password'
        })
        afterEach(sinon.restore);
    });

