import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UsersModel';
import JwtUtils from '../utils/jwtUtils';

import {
    user,
    withoutEmailLogin,
    withouPasswordlogin,
    successfulLogin,
    invalidEmail,
    invalidPassword,
    userRegistered,
} from './mocks/login.mocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Login test', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('Successful Login', async function () {
        sinon.stub(bcrypt, 'compareSync').returns(true);
        sinon.stub(User, 'findOne').resolves(user as any);

        const { status, body } = await chai
            .request(app)
            .post('/login')
            .send(successfulLogin);

        expect(status).to.equal(200);
        expect(body).to.haveOwnProperty('token');
    });

    it('Login without email', async function () {
        sinon.stub(User, 'findOne').resolves(user as any);

        const { status, body } = await chai
            .request(app)
            .post('/login')
            .send(withoutEmailLogin);

        expect(status).to.equal(400);
        expect(body).to.deep.equal({
            message: 'All fields must be filled'
        });
    });

    it('Login without password', async function () {
        sinon.stub(User, 'findOne').resolves(user as any);

        const { status, body } = await chai
            .request(app)
            .post('/login')
            .send(withouPasswordlogin);

        expect(status).to.equal(400);
        expect(body).to.deep.equal({
            message: 'All fields must be filled'
        });
    });

     it('Login invalid email', async function () {
        sinon.stub(User, 'findOne').resolves(null);

        const { status, body } = await chai
            .request(app)
            .post('/login')
            .send(invalidEmail);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({
            message: 'Invalid email or password'
        });
    });

     it('Login invalid password', async function () {
        sinon.stub(User, 'findOne').resolves(null);

        const { status, body } = await chai
            .request(app)
            .post('/login')
            .send(invalidPassword);

        expect(status).to.equal(401);
        expect(body).to.deep.equal({
            message: 'Invalid email or password'
        });
    });

    it('Login token valid', async function () {
        sinon.stub(User, 'findOne').resolves(user as any);
        sinon.stub(JwtUtils.prototype, 'verify').returns(user)

        const { status, body } = await chai
            .request(app)
            .get('/login/role')
            .set('Authorization', 'token');

        expect(status).to.equal(200);
        expect(body).to.haveOwnProperty('role', 'admin')
    });
});