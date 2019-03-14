'use strict';

const blueprintHelpers = require('ember-cli-blueprint-test-helpers/helpers');
const setupTestHooks = blueprintHelpers.setupTestHooks;
const emberNew = blueprintHelpers.emberNew;
const emberGenerateDestroy = blueprintHelpers.emberGenerateDestroy;
const modifyPackages = blueprintHelpers.modifyPackages;

const chai = require('ember-cli-blueprint-test-helpers/chai');
const expect = chai.expect;

const generateFakePackageManifest = require('../helpers/generate-fake-package-manifest');
const fixture = require('../helpers/fixture');

describe('Blueprint: route-test', function() {
  setupTestHooks(this);

  describe('in app', function() {
    beforeEach(function() {
      return emberNew();
    });

    describe('with ember-cli-qunit@4.1.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.1.0');
      });

      it('route-test foo', function() {
        return emberGenerateDestroy(['route-test', 'foo'], _file => {
          expect(_file('tests/unit/routes/foo-test.ts')).to.equal(fixture('route-test/default.ts'));
        });
      });
    });

    describe('with ember-cli-qunit@4.2.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-qunit', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-qunit', '4.2.0');
      });

      it('route-test foo', function() {
        return emberGenerateDestroy(['route-test', 'foo'], _file => {
          expect(_file('tests/unit/routes/foo-test.ts')).to.equal(fixture('route-test/rfc232.ts'));
        });
      });
    });

    describe('with ember-cli-mocha@0.11.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.11.0');
      });

      it('route-test foo', function() {
        return emberGenerateDestroy(['route-test', 'foo'], _file => {
          expect(_file('tests/unit/routes/foo-test.ts')).to.equal(fixture('route-test/mocha.ts'));
        });
      });
    });

    describe('with ember-cli-mocha@0.12.0', function() {
      beforeEach(function() {
        modifyPackages([
          { name: 'ember-qunit', delete: true },
          { name: 'ember-cli-mocha', dev: true },
        ]);
        generateFakePackageManifest('ember-cli-mocha', '0.12.0');
      });

      it('route-test foo', function() {
        return emberGenerateDestroy(['route-test', 'foo'], _file => {
          expect(_file('tests/unit/routes/foo-test.ts')).to.equal(
            fixture('route-test/mocha-0.12.ts')
          );
        });
      });
    });

    describe('with ember-mocha@0.14.0', function() {
      beforeEach(function() {
        modifyPackages([{ name: 'ember-qunit', delete: true }, { name: 'ember-mocha', dev: true }]);
        generateFakePackageManifest('ember-mocha', '0.14.0');
      });

      it('route-test foo', function() {
        return emberGenerateDestroy(['route-test', 'foo'], _file => {
          expect(_file('tests/unit/routes/foo-test.ts')).to.equal(
            fixture('route-test/mocha-rfc232.ts')
          );
        });
      });
    });
  });

  describe('in addon', function() {
    beforeEach(function() {
      return emberNew({ target: 'addon' })
        .then(() =>
          modifyPackages([
            { name: 'ember-qunit', delete: true },
            { name: 'ember-cli-qunit', dev: true },
          ])
        )
        .then(() => generateFakePackageManifest('ember-cli-qunit', '4.1.0'));
    });

    it('route-test foo', function() {
      return emberGenerateDestroy(['route-test', 'foo'], _file => {
        expect(_file('tests/unit/routes/foo-test.ts')).to.equal(fixture('route-test/default.ts'));
      });
    });
  });
});
