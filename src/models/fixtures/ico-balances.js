import fixture from 'can-fixture'
import IcoBalance from '../ico-balance'

const store = fixture.store([{
  _id: 0,
  userId: '5a5d6333874a44e39b3625cb',
  // enum: ['ICO', 'SAFT', 'AIRDROP']
  type: 'ICO',
  amountEqb: 100,
  amountBtc: 0.23,
  address: 'abc123',
  addressIndex: 0,
  fromAddress: 'efg456',
  paidAt: '2018-05-01',
  createdAt: '2018-05-01'
}, {
  _id: 1,
  userId: '5a5d6333874a44e39b3625cb',
  type: 'SAFT',
  amountEqb: 200,
  amountBtc: 0.33,
  address: 'abc123',
  addressIndex: 1,
  fromAddress: 'efg456',
  paidAt: '2018-05-02',
  createdAt: '2018-05-02'
}], IcoBalance.connection.algebra)

fixture('/ico-balance/{_id}', store)

export default store
