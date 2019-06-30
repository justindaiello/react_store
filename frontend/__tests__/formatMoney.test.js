import formatMoney from '../lib/formatMoney';

describe('formatMoney Function', () => {
  it('works with fractional dollars', () => {
    expect(formatMoney(1)).toEqual('$0.01');
    expect(formatMoney(10)).toEqual('$0.10');
    expect(formatMoney(43)).toEqual('$0.43');
  });

  it('Leaves cents off for whole dollars', () => {
    expect(formatMoney(5000)).toEqual('$50');
    expect(formatMoney(1000)).toEqual('$10');
    expect(formatMoney(500000)).toEqual('$5,000');
  });

  it('Works with whole and factional dollars', () => {
    expect(formatMoney(5032)).toEqual('$50.32');
    expect(formatMoney(101)).toEqual('$1.01');
    expect(formatMoney(333333)).toEqual('$3,333.33');
  })
})