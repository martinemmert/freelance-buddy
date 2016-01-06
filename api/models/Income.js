/**
 * Income.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    subprojectId: {
      type: 'integer',
      required: true
    },
    comment: {
      type: 'text'
    },
    invoiceNumber: {
      type: 'string'
    },
    payedOn: {
      type: 'date'
    },
    netTotal: {
      type: 'float',
      required: true,
      defaultsTo: 0
    },
    taxValue: {
      type: 'float',
      required: true,
      defaultsTo: 0
    },
    taxFree: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};

