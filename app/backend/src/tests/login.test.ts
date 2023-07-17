import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/UsersModel';

import { allTeams, singleTeam } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

const prefix = '/login';

describe('Successful request', function() {
    it('deve fazer login quando credenciais forem válidas', async function name(params:type) {
        const loginData: ILogin = {
            email: 'valida@mail.com',
            password: 'valid-password';
        }
        const response = await chai.request(app)
        .post(prefix)
        .send(loginData);

        expect(response).to.have.status(200);
        expect(response.body).to.haveOwnProperty('token');
    })
})