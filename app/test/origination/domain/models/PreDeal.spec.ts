import { describe, expect, it } from 'mocha';
import validate from 'class-validator';

import { MONEY } from '../../../../src/base/domain/Money.js';
import { ModelError } from '../../../../src/base/domain/errors.js';

import { newPreDeal } from '../../../fixtures.js';

describe('PreDeal', () => {
  describe('Validation', () => {
    it('throws an error if the title is not provided', () => {
      expect(() => {
        validate(newPreDeal({ title: undefined }));
      }).to.throw(ModelError, /Invalid field title: undefined/);
    });

    it('throws an error if the status is not provided', () => {
      expect(() => {
        validate(newPreDeal({ status: undefined }));
      }).to.throw(ModelError, /Invalid field status: undefined/);
    });

    it('throws an error if the asking price is not provided', () => {
      expect(() => {
        validate(newPreDeal({ askingPrice: undefined }));
      }).to.throw(ModelError, /Invalid field askingPrice: undefined/);
    });

    it('throws an error if the business type is not provided', () => {
      expect(() => {
        validate(newPreDeal({ businessType: undefined }));
      }).to.throw(ModelError, /Invalid field businessType: undefined/);
    });

    it('throws an error if the asking price is not a positive number', () => {
      expect(() => {
        validate(newPreDeal({ askingPrice: MONEY(-1) }));
      }).to.throw(ModelError, /Invalid field askingPrice/);
    });

    it('throws an error if the ttmRevenue is not a positive number', () => {
      expect(() => {
        validate(newPreDeal({ ttmRevenue: MONEY(-1) }));
      }).to.throw(ModelError, /Invalid field ttmRevenue/);
    });

    it('throws an error if the ttmProfit is not a positive number', () => {
      expect(() => {
        validate(newPreDeal({ ttmProfit: MONEY(-1) }));
      }).to.throw(ModelError, /Invalid field ttmProfit/);
    });

    it('throws an error if the lastMonthRevenue is not a positive number', () => {
      expect(() => {
        validate(newPreDeal({ lastMonthRevenue: MONEY(-1) }));
      }).to.throw(ModelError, /Invalid field lastMonthRevenue/);
    });

    it('throws an error if the lastMonthProfit is not a positive number', () => {
      expect(() => {
        validate(newPreDeal({ lastMonthProfit: MONEY(-1) }));
      }).to.throw(ModelError, /Invalid field lastMonthProfit/);
    });
  });
});
