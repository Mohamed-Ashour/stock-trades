export enum TradeType {
  SELL = 'sell',
  buy = 'buy',
}

export const MIN_SHARES = 10;
export const MAX_SHARES = 30;

export const MIN_PRICE = 130.42;
export const MAX_PRICE = 195.65;

export const NO_TRADES_RESPONSE = { message: 'There are no trades in the given date range' };

export const TRADE_EXPOSED_FIELDS = '-_id id type user symbol timestamp shares price';