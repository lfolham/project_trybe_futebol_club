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
  it('GET/teams funcionando corretamente', async function() {
    sinon.stub(Team, 'findAll').resolves(allTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('GET/teams/1 funcionando corretamente', async function() {
    sinon.stub(Team, 'findByPk').resolves(singleTeam as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(singleTeam);
  });

  it('Quando não encontrar os valores esperados', async function() {
    sinon.stub(Team, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team not found');
  });


  afterEach(sinon.restore);
});