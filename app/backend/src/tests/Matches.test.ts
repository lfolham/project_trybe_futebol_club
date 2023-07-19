import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/MatchesModel'

import { matches } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches test', async function() {
     afterEach(() => {
        sinon.restore();
    });
    
    it('GET/matches find all - successfull', async function() {
        sinon.stub(Match, 'findAll').resolves(matches as any);

    const { status, body } = await chai
    .request(app)
    .get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
    })

})