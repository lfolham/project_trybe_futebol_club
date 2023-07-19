import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/TeamsModel';

import { allTeams, singleTeam } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams test', () => {
  it('GET/teams find all - successfull', async function() {
    sinon.stub(Team, 'findAll').resolves(allTeams as any);

    const { status, body } = await chai
    .request(app)
    .get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('GET/teams/1 find bu id - successfull', async function() {
    sinon.stub(Team, 'findByPk').resolves(singleTeam as any);

    const { status, body } = await chai
    .request(app)
    .get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(singleTeam);
  });

  it('failure - wrong return', async function() {
    sinon.stub(Team, 'findOne').resolves(null);

    const { status, body } = await chai
    .request(app)
    .get('/teams/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 1 not found');
  });


  afterEach(sinon.restore);
});