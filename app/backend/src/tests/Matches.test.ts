import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/MatchesModel'

import { createMatch, matches, matchesEnd, matchesInProgress, mockNewMatch } from './mocks/matches.mock';
import JwtUtils from '../utils/jwtUtils';

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

    it('GET/matches matches in progress - successfull', async function() {
        sinon.stub(Match, 'findAll').resolves(matchesInProgress as any)

    const { status, body } = await chai
    .request(app)
    .get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesInProgress);
    })

    it('GET/matches finished matches  - successfull', async function() {
        sinon.stub(Match, 'findAll').resolves(matchesEnd as any)

    const { status, body } = await chai
    .request(app)
    .get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchesEnd);
    })

    it('POST /matches creates a new match - successful', async function() {
    sinon.stub(Match, 'findAll').resolves(createMatch as any);
     sinon.stub(JwtUtils.prototype, 'verify').returns(createMatch);

     const { status, body } = await chai
    .request(app)
    .post('/matches')
    .set('Authorization', 'Bearer token')
    .send(mockNewMatch);

     expect(status).to.equal(201);
     expect(body).to.deep.equal(createMatch);
    });

    it('PATCH/matches finis a match - successful', async function() {
    sinon.stub(Match, 'findAll').resolves(createMatch as any);
    sinon.stub(JwtUtils.prototype, 'verify').returns(createMatch);

     const { status, body } = await chai
    .request(app)
    .patch('/matches/41/finish')
    .set('Authorization', 'Bearer token')

     expect(status).to.equal(201);
     expect(body).to.deep.equal({ message: 'Finished' });
    });

})