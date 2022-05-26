const sinon = require('sinon');
const { expect } = require('chai');
const salesServices = require('../../../services/salesServices');
const salesControllers = require('../../../controllers/salesControllers');

describe('Todos os dados de produtos', async () => {
  const response = {};
  const request = {};

  beforeEach(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesServices, 'getAll')
      .resolves([
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:29.000Z",
          "productId": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2021-09-09T04:54:54.000Z",
          "productId": 2,
          "quantity": 2
        }
      ]);
  })

  afterEach(() => {
    salesServices.getAll.restore();
  });

  it('é chamado o método "status" passando o código 200', async () => {
    await salesControllers.getAll(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

  it('é chamado o método "json" passando um array', async () => {
    await salesControllers.getAll(request, response);

    expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
  });
});