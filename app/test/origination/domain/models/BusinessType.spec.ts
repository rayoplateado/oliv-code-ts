import { describe, it, expect } from 'mocha';
import validate from 'class-validator';

import { newBusinessType } from '../../../fixtures.js';
import { ModelError } from '../../../../src/base/domain/errors.js';

describe('businessType', () => {
  describe('Validation', () => {
    it('throws an error if the name is not provided', () => {
      expect(() => {
        validate(newBusinessType({ name: undefined }));
      }).to.throw(ModelError, /Invalid field name: undefined/);
    });
  });
});
